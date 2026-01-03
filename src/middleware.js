import { defineMiddleware } from "astro:middleware";
import { checkAuth } from "./components/api/supabase/supabase";

const onRequest = defineMiddleware(async (context, next) => {
    
    if (context.url.pathname.startsWith('/api/')) {
        console.log('⚡ Ruta API detectada, saltando middleware de auth');
        return next();
    }
    console.log('🚀 Middleware ejecutándose para:', context.url.pathname);

    //Routes that needs Auth
    const protectedRoutes = [
        // '/review',      // TEMPORALMENTE DESHABILITADO PARA DEBUGGING
        // '/review/',     // TEMPORALMENTE DESHABILITADO PARA DEBUGGING
        '/userprofile', //user profile access (review history, user data)
        '/drprofile'    //dr profile access
    ]
    const authPages = ['/login', '/register', '/forgot-password'] // ← NUEVO

    //Get current user route
    const currentPath = context.url.pathname;

    //Verify if current route is protected (in the list)
    const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route))

    //Verify if the page is an Auth type of page (avoid to visit /login if is already in)
    const isAuthPage = authPages.some(route => currentPath.startsWith(route));

    //CASE 1: No verification needed.
    if (!isProtectedRoute && !isAuthPage) {
        return next() //continue, is not needed the auth.
    }

    //CASE 2 & 3: Verify Auth
    console.log(`🔍 Verificando auth para: ${currentPath}`)
    try {
        const session = await checkAuth() //Verify credentials
        console.log(`🔍 checkAuth() devolvió:`, session ? 'SESIÓN ENCONTRADA' : 'NO HAY SESIÓN')
        if (session) {
            console.log(`👤 Usuario: ${session.user?.email || 'email no disponible'}`)
        }

        //CASE 2: User is logged try to get in auth needed pages
        if (isAuthPage && session) {
            console.log(`⚡ Usuario ya autenticado redirigido desde ${currentPath}`)
            return context.redirect('/')
        }

        //CASE 3A: Protected page without auth.
        if (isProtectedRoute && !session) {
            console.log(`❌ Usuario no autenticado, redirigiendo desde ${currentPath}`)

            //Save original route WITH query parameters to redirect
            const fullPath = currentPath + context.url.search
            const redirectUrl = new URL('/login', context.url.origin)
            redirectUrl.searchParams.set('redirect', fullPath)

            console.log(`🔄 Guardando URL completa para redirect: ${fullPath}`)
            return context.redirect(redirectUrl.toString())
        }

        console.log(`✅ Acceso permitido a: ${currentPath}`)

        if (session) {
            context.locals.user = session.user
            context.locals.session = session
        }

        return next()

    } catch (error) {
        // Error al verificar auth → Asumir no autenticado (seguridad)
        console.error('❌ Error en middleware de auth:', error)

        return context.redirect(`/login?error=auth_error&redirect=${currentPath}`)

    }


})

export { onRequest };