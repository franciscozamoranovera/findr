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

            <div className="flex items-center gap-2">
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
                            <span>Escribe una reseña...</span>
                        </>
                    )}
                </button>
                <button
                    className="rounded-full bg-[#2D2D2D] text-white p-5"
                    onClick={() => {
                        const urlParams = new URLSearchParams(window.location.search);
                        const fromPage = urlParams.get('from');

                        if (fromPage && fromPage.includes('/search?')) {
                            window.location.href = fromPage;
                        } else {
                            window.location.href = '/search';
                        }
                    }}
                >
                    <span>
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288" />
                        </svg>

                    </span>
                </button>
            </div>
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
        <div className="flex items-center gap-2">
            <button
                className="rounded-full bg-[#2D2D2D] text-white py-6 px-14"
                onClick={handleStartReview}
                disabled={isProcessing}
                aria-label={`Dejar review a ${doctorName} como ${user.email}`}
            >
                {isProcessing ? (
                    <span>Preparando...</span>
                ) : (
                    <span className="truncate max-w-[50px]">Dejar review
                        como {user.email.substring(0,
                            Math.floor(user.email.length *
                                0.3))}...</span>
                )}

            </button>
            <button
                className="rounded-full bg-[#2D2D2D] text-white p-6"
                onClick={() => {
                    const urlParams = new URLSearchParams(window.location.search);
                    const fromPage = urlParams.get('from');

                    if (fromPage && fromPage.includes('/search?')) {
                        window.location.href = fromPage;
                    } else {
                        window.location.href = '/search';
                    }
                }}
            >
                <span>
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288" />
                    </svg>
                </span>
            </button>
        </div>
    )
}

export default ReviewButton



