import { useAuth } from "@/components/api/supabase/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/components/api/supabase/supabase";

//ReviewAuthGuard: Permite que se valide la sesión al abrir una pestaña nueva.
const ReviewAuthGuard = ({ children, fallbackUrl = '/login' }) => {
    const { user, loading } = useAuth()
    const [forceRender, setForceRender] = useState(0)
    const [directAuth, setDirectAuth] = useState({ user: null, loading: true })

    // VERIFICACIÓN DIRECTA como fallback
    useEffect(() => {

        const directCheck = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                console.log('🔍 ReviewAuthGuard - Verificación directa:', session?.user?.email || 'no session')
                console.log('USER_USER', session?.user?.user_metadata?.full_name)
                setDirectAuth({
                    user: session?.user || null,
                    loading: false
                })
            } catch (error) {
                console.error('❌ Error en verificación directa:', error)
                setDirectAuth({ user: null, loading: false })
            }
        }

        // Si el contexto no responde en 1 segundo, usar verificación directa
        const timeout = setTimeout(() => {
            if (loading) {
                console.log('⚡ Contexto no responde, usando verificación directa')
                directCheck()
            }
        }, 1000)

        return () => clearTimeout(timeout)
    }, [loading])

    // Usar verificación directa si el contexto no funciona
    const finalUser = directAuth.loading === false ? directAuth.user : user
    const finalLoading = directAuth.loading === false ? directAuth.loading : loading

    // Log cada render
    console.log('🔄 ReviewAuthGuard RENDER:', {
        contextUser: user?.email || 'no context user',
        contextLoading: loading,
        directUser: directAuth.user?.email || 'no direct user',
        directLoading: directAuth.loading,
        finalUser: finalUser?.email || 'no final user',
        finalLoading,
        timestamp: new Date().toISOString()
    })

    // FORZAR RE-RENDER cuando cambie cualquier estado
    useEffect(() => {
        console.log('🔍 ReviewAuthGuard - Estado actualizado:', {
            contextUser: user?.email || 'no context user',
            directUser: directAuth.user?.email || 'no direct user',
            finalUser: finalUser?.email || 'no final user',
        })
        setForceRender(prev => prev + 1)
    }, [user, loading, directAuth, finalUser, finalLoading])

    // Mientras se verifica estado inicial
    if (finalLoading) {
        console.log('⏳ ReviewAuthGuard: Mostrando loading porque finalLoading =', finalLoading)
        return (
            <div className="flex items-center justify-center min-h-32">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                <span className="ml-2 text-gray-600">
                    <p>Verificando autenticación...</p>
                </span>
            </div>
        )
    }

    // If not authenticated
    if (!finalUser) {
        // Catch the current route to redirect
        const currentPath = window.location.pathname + window.location.search;
        const redirectUrl = `${fallbackUrl}?redirect=${encodeURIComponent(currentPath)}`

        const isAlreadyRedirecting = sessionStorage.getItem('auth-redirecting');

        if (isAlreadyRedirecting) {
            // Go to '/search' when go back from /login to avoid infinite loop
            window.location.replace('/search');
            return;
        }

        sessionStorage.setItem('auth-redirecting', 'true');

        // Set delay for a little bit
        setTimeout(() => {
            window.location.href = redirectUrl
        }, 300)

        return (
            <div className="flex items-center justify-center min-h-32">
                <div className="text-center">
                    <p className="text-gray-600 mb-2">Redirigiendo al login...</p>
                    {/* <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                </div>
            </div>
        )
    }

    console.log('✅ ReviewAuthGuard: Usuario autenticado, mostrando contenido para', finalUser.email)
    return children
}

export default ReviewAuthGuard