import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase";

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Verificar si el usuario ya está logueado al cargar el componente
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('✅ Usuario ya logueado, redirigiendo...');

          // Usar parámetro redirect si existe, sino ir a /search por defecto
          const urlParams = new URLSearchParams(window.location.search);
          const redirectUrl = urlParams.get('redirect') || '/search';

          console.log('🎯 Redirigiendo a:', redirectUrl);
          window.location.href = redirectUrl;
          return;
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
      }
      setIsCheckingAuth(false);
    };

    checkUserAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Leer el parámetro redirect de la URL
      const urlParams = new URLSearchParams(window.location.search)
      const redirectUrl = urlParams.get('redirect')

      console.log('Redirect URL:', redirectUrl)

      // Guardar la URL de redirección en localStorage para usar después del login
      if (redirectUrl) {
        localStorage.setItem('findr_redirect_after_login', redirectUrl)
      }

      // Simplificar redirectTo - siempre redirigir al home
      // y dejar que AuthProvider maneje la redirección final
      // Para desarrollo con --host, detectar si es red local
      const isLocalNetwork = window.location.hostname.startsWith('192.168')
      const baseUrl = import.meta.env.DEV ?
        (isLocalNetwork ? `http://192.168.0.30:4321` : window.location.origin) :
        (import.meta.env.PUBLIC_SITE_URL || window.location.origin)

      const redirectTo = baseUrl // Siempre al home, sin query params
      console.log('🔗 Magic link redirigirá a home:', redirectTo)
      console.log('📄 Página guardada en localStorage:', redirectUrl)

      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          redirectTo: redirectTo
        }
      })

      console.log(result)

    } catch (error) {
      console.error(error)
    }

  }


  // Mostrar loading mientras verifica autenticación
  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center p-3">
        <div>Verificando...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col  items-center p-3">
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <form 
            className="flex flex-col gap-4 p-2"
            onSubmit={handleSubmit}
            >
            <input
              className="bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none focus:border-transparent w-full h-[50px] pl-12 pr-[40px] placeholder:italic focus:bg-[#666666] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="rounded-full bg-[#2D2D2D] text-white py-2 px-2"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>

  )

}

