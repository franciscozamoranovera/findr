import { useState, useEffect } from "react";
import { useAuth } from "@/components/api/supabase/AuthProvider";



const ReviewButton = ({
    drId,
    doctorName,
    onReviewStart = () => { }, //callback para inicio review
    onLoadingRedirect = () => { } //callback antes de redirect al login

}) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const { user, loading, isAuthenticated } = useAuth()


    //Resetear estado en useEffect cuando se detecta que volvió:
    useEffect(() => {
        // Resetear estado si el usuario volvió atrás desde inicio sesión > login > volver a trás > perfil doc
        const resetProcessing = () => setIsProcessing(false);

        window.addEventListener('pageshow', resetProcessing);
        return () => window.removeEventListener('pageshow',
            resetProcessing);
    }, []);

    //STATE 1: VERIFY INITIAL AUTH
    if (loading) {
        return (
            <button
                className="rounded-full bg-[#2D2D2D] text-white py-6 px-14"
                disabled
                aria-label="Verificando estado de autenticación"
            >
                <span>Verificando....</span>
            </button>
        )
    }

    //STATE 2: USER IS NOT AUTH
    if (!isAuthenticated) {
        const handleLoginRedirect = () => {
            setIsProcessing(true)

            //callback para analytics o tracking
            onLoadingRedirect({ drId })

            //Building the URL with redirect
            const currentPath = window.location.pathname
            const searchParams = new URLSearchParams(window.location.search)

            //Add doctor context data
            searchParams.set('doctor', drId)
            searchParams.set('action', 'review')

            const fullCurrentPath = `${currentPath}?${searchParams.toString()}`
            const loginUrl = `/login?redirect=${encodeURIComponent(fullCurrentPath)}`

            // Pequeño delay para UX (mostrar que se está procesando)
            setTimeout(() => {
                window.location.href = loginUrl
            }, 300)
        }

        return (

            <button
                className="rounded-full bg-[#2D2D2D] text-white py-6 px-14"
                onClick={handleLoginRedirect}
                disabled={isProcessing}

            >
                {isProcessing ? (
                    <>
                        <span>Redirigiendo...</span>
                    </>
                ) : (
                    <>
                        <span>Iniciar sesión para evaluar...</span>
                    </>
                )}
            </button>
        )
    } 

    //STATE 3: USER IS AUTHENTICATED
    const handleStartReview = () => {
        setIsProcessing(true)


        //callback for tracking
        onReviewStart({
            drId,
            doctorName,
            userId: user.id,
            userEmail: user.email
        })

        // Capturar la página actual para poder volver después
        const currentPage = window.location.pathname + window.location.search
        const reviewUrl = `/review?id=${drId}&from=${encodeURIComponent(currentPage)}`

        console.log('🎯 Navegando a:', reviewUrl)
        window.location.href = reviewUrl
    }

    return (
        <button
            className="rounded-full bg-[#2D2D2D] text-white py-6 px-14"
            onClick={handleStartReview}
            disabled={isProcessing}
            aria-label={`Dejar review a ${doctorName} como ${user.email}`}
        >
            {isProcessing ? (
                <span>Preparando...</span>
            ) : (
                <span>Dejar Review como {user.email}</span>
            )}

        </button>
    )
}

export default ReviewButton



