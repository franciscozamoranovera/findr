/* empty css                                */
import { c as createComponent, a as renderComponent, r as renderTemplate } from '../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D7_TKk5i.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../chunks/supabase_01iFa7cT.mjs';
import { N as NavBar } from '../chunks/NavBar_CX_jpX43.mjs';
export { renderers } from '../renderers.mjs';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendButtonBlocked, setSendButtonBlocked] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectUrl = urlParams.get("redirect") || "/search";
          window.location.href = redirectUrl;
          return;
        }
      } catch (error) {
      }
      setIsCheckingAuth(false);
    };
    checkUserAuth();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendButtonBlocked(true);
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirect");
    if (redirectUrl) {
      localStorage.setItem("findr_redirect_after_login", redirectUrl);
    }
    window.location.hostname.startsWith("192.168");
    const baseUrl = window.location.origin;
    const redirectTo = baseUrl;
    const result = await supabase.auth.signInWithOtp({
      email,
      options: {
        redirectTo
      }
    });
    const emailValue = e.target.value;
    if (emailValue && !emailValue.includes("@")) {
      setEmailError("El email debe contener un @");
    } else {
      setEmailError("");
    }
    if (result.error) {
      if (result.error.code === "email_address_invalid" || result.error.code === "validation_failed" || result.error.code === "unexpected_failure") {
        setEmailError(true);
        setSendButtonBlocked(false);
        return;
      }
    }
    setEmail("");
    setEmailSent(true);
  };
  if (isCheckingAuth) {
    return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center p-3", children: /* @__PURE__ */ jsx("div", { children: "Verificando..." }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex pb-14 justify-center items-center min-h-screen  bg-cover bg-center bg-no-repeat", style: { backgroundImage: "url(/img/findr-background-login.png)" }, children: [
      emailError ? /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm justify-center w-full text-white flex flex-col  items-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl p-1", children: "¡Email Inválido!" }),
        /* @__PURE__ */ jsx("p", { className: "text-white p-3", children: "Por favor, revisa tu email y vuelve a intentarlo" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "w-48 rounded-full bg-[#2D2D2D] text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-400 ease-in-out",
            onClick: () => {
              setEmailError(false);
              setEmailSent(false);
            },
            children: "Volver a intentar"
          }
        )
      ] }) : "",
      emailSent ? /* @__PURE__ */ jsxs("div", { className: "bg-[#2D2D2D]/90 backdrop-blur-sm  rounded-3xl w-96 text-white flex flex-col  items-center p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl pb-2", children: "¡Revisa tu email!" }),
          /* @__PURE__ */ jsx("h3", { className: "text-center min-w-min ", children: "¡Has recibido un enlace para iniciar sesión!" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center p-3 gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-center font-medium", children: "Haz click en el enlace y serás redireccionado para dejar tu reseña." }),
          /* @__PURE__ */ jsx("p", { className: "text-center", children: "Si el link no llegó a tu bandeja principal, revisa tu bandeja de spam. Si no está, tal vez el email estaba mal escrito. Intenta nuevamente." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "w-full rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-400 ease-in-out",
            onClick: () => {
              setEmailSent(false);
              setSendButtonBlocked(false);
            },
            children: "Repetir el proceso"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-[#2D2D2D]/90 backdrop-blur-sm  rounded-3xl w-96 text-white flex flex-col  items-center p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl pb-2", children: "Inicia sesión" }),
          /* @__PURE__ */ jsxs("p", { className: "text-center min-w-min ", children: [
            "Inicia sólo con tu correo electrónico y un ",
            /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "LINK" }),
            " que te enviaremos a tu bandeja de entrada"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-96 p-4", children: [
          /* @__PURE__ */ jsxs(
            "form",
            {
              className: "flex flex-col gap-3 p-2",
              onSubmit: handleSubmit,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "text-center bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none focus:border-transparent w-full h-[50px] pl-12 pr-[40px] placeholder:italic focus:bg-[#666666] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black",
                    type: "email",
                    name: "email",
                    placeholder: "correo@gmail.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "rounded-full bg-black text-white py-3 px-2 hover:bg-[#0066FF] transition-colors duration-300 ease-in-out disabled:text-[#4a4a4b]",
                    disabled: sendButtonBlocked,
                    children: [
                      "Enviar link",
                      emailError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: emailError })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center p-3", children: /* @__PURE__ */ jsx("p", { className: "text-center", children: "Si el link no llegó a tu bandeja principal, revisa tu bandeja de spam. Si no está, tal vez el email estaba mal escrito. Intenta nuevamente." }) })
        ] })
      ] })
    ] })
  ] });
};

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/components/reviewForm/LoginForm.jsx", "client:component-export": "LoginForm" })} ` })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/login.astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
