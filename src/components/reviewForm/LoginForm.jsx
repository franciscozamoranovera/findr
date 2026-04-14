import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase";
import { NavBar } from "../navbar/NavBar";

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [codeSent, setCodeSent] = useState(false);
  const [sendButtonBlocked, setSendButtonBlocked] = useState(false);
  const [verifyButtonBlocked, setVerifyButtonBlocked] = useState(false);
  const [error, setError] = useState(null); // null | "email" | "code" | "server"

  // Si ya está logueado, redirigir
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectUrl = urlParams.get('redirect') || '/search';
          window.location.replace(redirectUrl);
          return;
        }
      } catch (err) {
        console.error('Error verificando sesión:', err);
      }
      setIsCheckingAuth(false);
    };
    checkUserAuth();
  }, []);

  // Paso 1: enviar el código OTP
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError(null);
    setSendButtonBlocked(true);

    // Guardar URL de destino para después del login
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');
    if (redirectUrl) {
      localStorage.setItem('findr_redirect_after_login', redirectUrl);
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (otpError) {
      setSendButtonBlocked(false);
      if (otpError.code === "email_address_invalid" || otpError.code === "validation_failed") {
        setError("email");
      } else {
        setError("server");
      }
      return;
    }

    setCodeSent(true);
  };

  // Paso 2: verificar el código ingresado
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError(null);
    setVerifyButtonBlocked(true);

    // Leer ANTES de verifyOtp para evitar race condition con AuthProvider
    const saved = localStorage.getItem('findr_redirect_after_login');

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "email",
    });

    if (verifyError) {
      setVerifyButtonBlocked(false);
      setError("code");
      return;
    }

    localStorage.removeItem('findr_redirect_after_login');
    window.location.replace(saved || '/search');
  };

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2D2D2D]"></div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex pb-14 justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/img/findr-background-login.png)" }}>

        {/* Error overlay */}
        {error && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl p-1">
              {error === "email" && "¡Email Inválido!"}
              {error === "code" && "Código incorrecto"}
              {error === "server" && "Error al enviar"}
            </h1>
            <p className="text-white p-3 text-center max-w-xs">
              {error === "email" && "Por favor revisa tu email y vuelve a intentarlo."}
              {error === "code" && "El código ingresado no es válido o expiró. Solicita uno nuevo."}
              {error === "server" && "Ocurrió un error inesperado. Intenta nuevamente en unos momentos."}
            </p>
            <button
              className="w-48 rounded-full bg-[#2D2D2D] text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-200"
              onClick={() => {
                setError(null);
                if (error === "code") {
                  setOtpCode("");
                  setVerifyButtonBlocked(false);
                } else {
                  setCodeSent(false);
                  setSendButtonBlocked(false);
                }
              }}
            >
              Volver a intentar
            </button>
          </div>
        )}

        <div className="bg-[#2D2D2D]/90 backdrop-blur-sm rounded-3xl w-96 text-white flex flex-col items-center p-6">

          {!codeSent ? (
            /* Paso 1: ingreso de email */
            <>
              <div className="flex flex-col justify-center items-center mb-4">
                <h1 className="text-3xl pb-2">Inicia sesión</h1>
                <p className="text-center">Ingresa tu correo y te enviaremos un <span className="font-extrabold">código</span> para iniciar sesión</p>
              </div>
              <form className="flex flex-col gap-3 w-full" onSubmit={handleSendCode}>
                <input
                  className="text-center bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none w-full h-[50px] placeholder:italic focus:bg-[#666666] transition-colors duration-200 border border-transparent hover:border-black focus:border-black"
                  type="email"
                  placeholder="correo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-200 disabled:opacity-40"
                  disabled={sendButtonBlocked}
                >
                  {sendButtonBlocked ? "Enviando..." : "Enviar código"}
                </button>
              </form>
            </>
          ) : (
            /* Paso 2: ingreso del código */
            <>
              <div className="flex flex-col justify-center items-center mb-4">
                <h1 className="text-3xl pb-2">Revisa tu email</h1>
                <p className="text-center">Ingresa el código de 6 dígitos que enviamos a <span className="font-semibold">{email}</span></p>
              </div>
              <form className="flex flex-col gap-3 w-full" onSubmit={handleVerifyCode}>
                <input
                  className="text-center bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none w-full h-[50px] tracking-[0.5em] text-xl placeholder:italic placeholder:tracking-normal focus:bg-[#666666] transition-colors duration-200 border border-transparent hover:border-black focus:border-black"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                />
                <button
                  className="rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-200 disabled:opacity-40"
                  disabled={verifyButtonBlocked || otpCode.length < 6}
                >
                  {verifyButtonBlocked ? "Verificando..." : "Verificar código"}
                </button>
              </form>
              <button
                className="mt-3 text-sm text-[#aaaaaa] hover:text-white underline transition-colors duration-200"
                onClick={() => {
                  setCodeSent(false);
                  setSendButtonBlocked(false);
                  setOtpCode("");
                }}
              >
                Usar otro email
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}

