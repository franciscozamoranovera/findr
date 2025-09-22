import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";



// 1. CONTEXT (COMUNICATION CHANNEL)
const AuthContext = createContext({
    //default values (its like a template)
    user: null,
    session: null,
    loading: true, //verificación de estado inicial
    signOut: () => { }, //function for logout
    isAuthenticated: false, // valor por defecto
    isLoading: true, // valor por defecto
})

// 2. PROVIDER (Main Intercomunication System)
export const AuthProvider = ({ children }) => {
    console.log('🏗️ AuthProvider component rendering...')

    //Shared state components
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initialized, setInitialized] = useState(false)

    console.log('📊 AuthProvider current state:', {
        user: user?.email || 'no user',
        loading,
        hasSession: !!session,
        initialized
    })

    // Limpiar flag cuando user está autenticado
    useEffect(() => {
        if (user) {
            sessionStorage.removeItem('auth-redirecting');
        }
    }, [user]);

    // Solo usar useEffect - limpiar la inicialización inmediata


    // 3. CHECK IF SESSION IS ACTIVE
    useEffect(() => {
        console.log('🚀 AuthProvider useEffect iniciado')
        console.log('🔧 useEffect dependencies check:', { initialized, loading })

        // Ejecutar inmediatamente sin setTimeout
        const initializeAuth = async () => {
            console.log('📞 Llamando a supabase.auth.getSession()')
            console.log('🔍 localStorage antes de getSession:', Object.keys(localStorage).filter(key => key.includes('sb')))

            try {
                const { data: { session: currentSession }, error } = await supabase.auth.getSession()
                console.log('📦 Respuesta getSession:', { currentSession, error })

                if (error) {
                    console.error('❌ Error obteniendo sesión inicial:', error)
                } else if (currentSession) {
                    console.log('✅ Sesión inicial encontrada:', currentSession.user.email)
                    setUser(currentSession.user)
                    setSession(currentSession)
                } else {
                    console.log('ℹ️ No hay sesión inicial')
                    setUser(null)
                    setSession(null)
                }
            } catch (error) {
                console.log('💥 Error inesperado obteniendo sesión:', error)
                setUser(null)
                setSession(null)
            } finally {
                // Asegurar que setLoading se ejecute siempre
                console.log('🏁 Ejecutando setLoading(false)')
                setLoading(false)
            }
        }

        initializeAuth()
    }, [])


    // 4. AUTH LISTENING IN REAL TIME
    useEffect(() => {
        console.log('👂 AuthProvider: Configurando listener de cambios de auth...')

        //Automatic supabase notification on auth change
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                console.log('🔄 Cambio de auth detectado:', event, newSession?.user?.email || 'sin usuario')

                //Update state according the event
                switch (event) {
                    case 'SIGNED_IN':
                        console.log('✅ Usuario logueado')
                        console.log('💾 Verificando localStorage después de SIGNED_IN:', localStorage.getItem('sb-' + import.meta.env.PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token'))
                        setUser(newSession.user)
                        setSession(newSession)


                        // Verificar si hay una URL de redirección guardada
                        const savedRedirectUrl = localStorage.getItem('findr_redirect_after_login')
                        if (savedRedirectUrl) {
                            console.log('🔄 Redirigiendo a:', savedRedirectUrl)
                            localStorage.removeItem('findr_redirect_after_login') // Limpiar después de usar

                            // Pequeño delay para asegurar que el estado se actualice
                            setTimeout(() => {
                                window.location.href = savedRedirectUrl
                            }, 300)
                        }

                        break

                    case 'SIGNED_OUT':
                        console.log('🚪 Usuario deslogueado')
                        setUser(null)
                        setSession(null)

                        break

                    case 'TOKEN_REFRESHED':
                        console.log('🔄 Token renovado automáticamente')
                        setUser(newSession.user)
                        setSession(newSession)

                        break

                    case 'USER_UPDATED':
                        console.log('👤 Información del usuario actualizada')
                        setUser(newSession.user)
                        setSession(newSession)
                        console.log("session:", session)

                        break

                    case 'INITIAL_SESSION':
                        console.log('🔄 Sesión inicial detectada via listener')
                        if (newSession) {
                            console.log('✅ Actualizando estado con sesión inicial')
                            setUser(newSession.user)
                            setSession(newSession)
                        }
                        break

                    //Eventos no manejados.
                    default:
                        console.log(`ℹ️ Evento de auth: ${event}`)

                }
            }
        )

        //CLEAN UP: UNSUBSCRIBE WHEN COMPONENT IS DISCONECTED.
        return () => {
            console.log('🧹 AuthProvider: Limpiando listener de auth...')
            subscription.unsubscribe()
        }
    }, [])

    // 5. STORAGE EVENTS PARA SINCRONIZACIÓN CROSS-TAB
    useEffect(() => {
        console.log('🔄 AuthProvider: Configurando Storage Events para cross-tab sync...')

        const handleStorageChange = async (event) => {
            // Solo procesar cambios en las claves de Supabase
            if (event.key && (event.key.includes('sb-') || event.key === 'findr-supabase-auth')) {
                console.log('🔄 Storage cambió en otra pestaña:', event.key)

                // Re-verificar la sesión cuando detectemos cambios
                try {
                    const { data: { session: updatedSession }, error } = await supabase.auth.getSession()
                    console.log('🔄 Re-verificando sesión por Storage Event:', updatedSession?.user?.email || 'sin sesión')

                    if (error) {
                        console.error('❌ Error re-verificando sesión:', error)
                    } else if (updatedSession) {
                        console.log('✅ Sesión encontrada en cross-tab sync')
                        setUser(updatedSession.user)
                        setSession(updatedSession)
                        setLoading(false)
                    } else {
                        console.log('❌ No hay sesión en cross-tab sync')
                        setUser(null)
                        setSession(null)
                        setLoading(false)
                    }
                } catch (error) {
                    console.error('💥 Error en cross-tab sync:', error)
                }
            }
        }

        // Agregar el listener
        window.addEventListener('storage', handleStorageChange)

        // Cleanup
        return () => {
            console.log('🧹 AuthProvider: Limpiando Storage Events listener...')
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    // 6. HELPER FOR LOGOUT
    const signOut = async () => {
        console.log('🚪 Logging out...')
        setLoading(true)

        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('❌ Error en logout:', error)
                return { error }
            }

            console.log('✅ Logout exitoso')
            // Los estados se actualizarán automáticamente via onAuthStateChange
            return { error: null }

        } catch (error) {
            console.error('💥 Error inesperado en logout:', error)
            setLoading(false)
            return { error }
        }
    }

    // 5. CREATE SHARED INFO
    const contextValue = {
        user,    // null or {id, email,...}
        session, // null or {id, email,...}
        loading, //initial state validation
        signOut, //logout function

        isAuthenticated: !!(user || session?.user), // boolean: true si hay usuario
        isLoading: loading,      // alias más claro para loading

    }

    // Debug log para ver el estado del contexto
    console.log('AuthProvider Context:', {
        user: user?.email || 'no user',
        loading,
        isAuthenticated: !!(user || session?.user)

    })

    // 6. GIVE INFO TO ALL CHILDREN 
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

// 7.CUSTOM HOOK TO USE THE CONTEXT EASE
export const useAuth = () => {
    const context = useContext(AuthContext)

    //veriry if useAuth is getting used inside an AuthProvider

    if (context === undefined) {
        throw new Error(
            '🚨 useAuth debe ser usado dentro de un AuthProvider. ' +
            'Envuelve tu componente con <AuthProvider>...</AuthProvider>'
        )
    }

    return context
}

// 8. ADDITIONAL HOOK FOR COMPONETS THAT NEEDS AUTH
export const useRequireAuth = () => {
    const auth = useAuth()

    useEffect(() => {
        //si terminó de cargar y no hay user, redireccionar al login
        if (!auth.loading && !auth.user) {
            console.log('🚨 useRequireAuth: Usuario no autenticado, redirigiendo...')
            window.location.href = '/login'
        }

    }, [auth.loading, auth.user])

    return auth
}