import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase";
import { NavBar } from "../navbar/NavBar";

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [emailError, setEmailError] = useState("")
  const [emailSent, setEmailSent] = useState(false);
  const [sendButtonBlocked, setSendButtonBlocked] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

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

    setSendButtonBlocked(true);

    /* try { */
      // Leer el parámetro redirect de la URL
      const urlParams = new URLSearchParams(window.location.search)
      const redirectUrl = urlParams.get('redirect')


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

      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          redirectTo: redirectTo
        }
      })

      const emailValue = e.target.value;

      if (emailValue && !emailValue.includes('@')) {
        setEmailError('El email debe contener un @');
      } else {
        setEmailError('');
      }

      console.log(result)
      //console.log(result.error.code)
      
      if(result.error) {
        console.log(result.error.code)
        console.log(result.error)

        
        if (result.error.code === "email_address_invalid" || result.error.code === "validation_failed" || result.error.code ===  "unexpected_failure")  {
          setEmailError(true);
          setSendButtonBlocked(false);
          return;
        }
      }

      setEmail("") //clear email input

      
   /*  } catch (error) {
      
       if (error.code === 400) {
        alert('Email inválido')
      } 
      
      console.error(error)
      
    } */
    
    setEmailSent(true) // shows up the "email sent" message 

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
    <NavBar/>
      <div className="flex pb-14 justify-center items-center min-h-screen  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/img/findr-background-login.png)" }}>
        {
          emailError ? (

              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm justify-center w-full text-white flex flex-col  items-center">
                <h1 className="text-3xl p-1">¡Email Inválido!</h1>
                <p className="text-white p-3">
                  Por favor, revisa tu email y vuelve a intentarlo
                </p>
                <button
                  className="w-48 rounded-full bg-[#2D2D2D] text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-400 ease-in-out"
                  onClick={() => {
                    setEmailError(false);
                    setEmailSent(false); //return to main view (write again a valid email)
                  }}
                >
                  Volver a intentar
                </button>
              </div>

          ) : (
            ""
          )
        }

        {
          emailSent ? (

            <div className="bg-[#2D2D2D]/90 backdrop-blur-sm  rounded-3xl w-96 text-white flex flex-col  items-center p-6">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl pb-2">¡Revisa tu email!</h1>
                <h3 className="text-center min-w-min ">¡Has recibido un enlace para iniciar sesión!</h3>
              </div>
              <div className="flex flex-col justify-center items-center p-3 gap-2">
                <p className="text-center font-medium">Haz click en el enlace y serás redireccionado para dejar tu reseña.</p>
                <p className="text-center">Si el link no llegó a tu bandeja principal, revisa tu bandeja de spam. Si no está, tal vez el email estaba mal escrito. Intenta nuevamente.</p>
              </div>
              <button
                className="w-full rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-400 ease-in-out"
                onClick={() => {
                  setEmailSent(false);
                  setSendButtonBlocked(false);
                }}
              >
                Repetir el proceso
              </button>
            </div>

          ) : (
            <div className="bg-[#2D2D2D]/90 backdrop-blur-sm  rounded-3xl w-96 text-white flex flex-col  items-center p-6">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl pb-2">Inicia sesión</h1>
                <p className="text-center min-w-min ">Inicia sólo con tu correo electrónico y un <span className="font-extrabold">LINK</span> que te enviaremos a tu bandeja de entrada</p>
              </div>
              <div className="w-96 p-4">
                <form
                  className="flex flex-col gap-3 p-2"
                  onSubmit={handleSubmit}

                >
                  <input
                    className="text-center bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none focus:border-transparent w-full h-[50px] pl-12 pr-[40px] placeholder:italic focus:bg-[#666666] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black"
                    type="email"
                    name="email"
                    placeholder="correo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-300 ease-in-out disabled:text-[#4a4a4b]"
                    disabled={sendButtonBlocked}
                  >
                    Enviar link
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  </button>
                </form>
                <div className="flex justify-center items-center p-3">
                  <p className="text-center">Si el link no llegó a tu bandeja principal, revisa tu bandeja de spam. Si no está, tal vez el email estaba mal escrito. Intenta nuevamente.</p>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </>

  )

}

