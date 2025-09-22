import { AuthProvider, useAuth } from "./AuthProvider";

/*
    TODO:
    1- CREAR DIAGRAMA DE FLUJO EXPLICANDO CADA PIEZA
    DEL CÓDIGO. POR QUÉ TANTAS OPCIONES? VA DE GENERAL A ESPECÍFICO

*/

/* This wrapper wrap multiples components with the AuthProvider */
export const AuthWrapper = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}


/* HOC (high order component): for individual components */
export const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        return (
            <AuthProvider>
                <WrappedComponent {...props} />
            </AuthProvider>
        )
    }

    //keep the component name for debugging
    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`

    return ComponentWithAuth
}

/**
* Componente específico para páginas que requieren autenticación
* Incluye loading state y redirección automática
*/

export const AuthenticatedWrapper = ({ children, fallbackUrl = '/login' }) => {
    return (
        <AuthProvider>
            <AuthGuard fallbackUrl={fallbackUrl}>
                {children}
            </AuthGuard>
        </AuthProvider>
    )
}

/*
   Componente que verifica autenticación y redirige si es necesario
*/

const AuthGuard = ({ children, fallbackUrl }) => {
    const { user, loading } = useAuth()

    //Mientras se verifica estado inicial
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Verificando autenticación...</span>
            </div>
        )
    }

    //If not authenticated
    if (!user) {
        //Catch the curren route to redirect
        const currentPath = window.location.pathname;
        const redirectUrl = `${fallbackUrl}?redirect=${encodeURIComponent(currentPath)}`

        const isAlreadyRedirecting = sessionStorage.getItem('auth-redirecting');

        if(isAlreadyRedirecting) {
            //Go to '/search' when go back from /login to avoid infinite bucle (!user)
            window.location.replace('/search');
            return;
        }

        sessionStorage.setItem('auth-redirecting', 'true');


        //Set delay for a little bit
        setTimeout(() => {
            window.location.href = redirectUrl
        }, 300)

        return (
            <div className="flex items-center justify-center min-h-32">
                <div className="text-center">
                    <p className="text-gray-600 mb-2">Redirigiendo al login...</p>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        )
    } 

    return children
}
//If user is auth, show content