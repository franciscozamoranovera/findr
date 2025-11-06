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

            <div className="flex items-center gap-2  sm:drop-shadow-2xl">
                <button
                    className="sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white py-4 px-4 sm:py-6 sm:px-6 text-sm flex-1 sm:flex-initial"
                    onClick={handleLoginRedirect}
                    disabled={isProcessing}

                >
                    {isProcessing ? (
                        <>
                            <span className="max-w-[200px] sm:max-w-[250px]">Redirigiendo...</span>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff"><g fill="#ffffff"><path fill-rule="evenodd" d="M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /><path d="m11.52 14.929l5.917-5.917a8.232 8.232 0 0 1-2.661-1.787a8.232 8.232 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891Zm7.559-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0 0 18.37 8.08l.71-.71Z" /></g></svg>
                            <span className="max-w-[200px] sm:max-w-[250px]">Escribe una reseña...</span>
                        </div>
                    )}
                </button>
                <button
                    className="sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white p-4 sm:p-6"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"/></svg>
                    {/* <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288" />
                    </svg> */}

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
        //const currentPage = window.location.pathname + window.location.search
        //reviewUrl updated to use React for dr profile instead astro.
        const reviewUrl = `/review?id=${drId}&from=${encodeURIComponent('/doctor/'+drId)}`

        console.log('🎯 Navegando a:', reviewUrl)
        window.location.href = reviewUrl
    }

    return (
        <div className="flex items-center gap-2 sm:drop-shadow-2xl">
            <button
                className="sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white py-4 px-4 sm:py-6 sm:px-6 text-sm flex-1 sm:flex-initial"
                onClick={handleStartReview}
                disabled={isProcessing}
                aria-label={`Dejar reseña a ${doctorName} como ${user.email}`}
            >
                {isProcessing ? (
                    <span className="max-w-[200px] sm:max-w-[250px]">Preparando...</span>
                ) : (
                    <div className="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff"><g fill="#ffffff"><path fill-rule="evenodd" d="M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /><path d="m11.52 14.929l5.917-5.917a8.232 8.232 0 0 1-2.661-1.787a8.232 8.232 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891Zm7.559-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0 0 18.37 8.08l.71-.71Z" /></g></svg>
                        <span className="truncate max-w-[200px] sm:max-w-[250px]">
                            Dejar reseña
                            como {user.email.substring(0,
                                Math.floor(user.email.length *
                                    0.3))}...</span>
                    </div>
                )}

            </button>
            <button
                className="sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white p-4 sm:p-6"
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"/></svg>
                    
                    {/* <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288" /></svg> */}

                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M6.206 2.632a10.938 10.938 0 0 0-2.412 0A1.309 1.309 0 0 0 2.64 3.776a10.538 10.538 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0A1.309 1.309 0 0 0 7.36 6.224a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.937 10.937 0 0 0-2.412 0A1.309 1.309 0 0 0 9.64 3.776a10.538 10.538 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.937 10.937 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm-14 7a10.938 10.938 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.937 10.937 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.937 10.937 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm-14 7a10.932 10.932 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.931 10.931 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Zm7 0a10.931 10.931 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144Z"/></svg> */}
                </span>
            </button>
        </div>
    )
}

export default ReviewButton



