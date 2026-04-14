import { b as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, e as renderHead, f as renderSlot, d as addAttribute } from './astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
/* empty css                        */
import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { s as supabase } from './supabase_01iFa7cT.mjs';
import { $ as $$Footer } from './footer_DkCDBuL9.mjs';

const AuthContext = createContext({
  //default values (its like a template)
  user: null,
  session: null,
  loading: true,
  //verificación de estado inicial
  signOut: () => {
  },
  //function for logout
  isAuthenticated: false,
  // valor por defecto
  isLoading: true
  // valor por defecto
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (user) {
      sessionStorage.removeItem("auth-redirecting");
    }
  }, [user]);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) {
        } else if (currentSession) {
          setUser(currentSession.user);
          setSession(currentSession);
        } else {
          setUser(null);
          setSession(null);
        }
      } catch (error) {
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        switch (event) {
          case "SIGNED_IN":
            setUser(newSession.user);
            setSession(newSession);
            const savedRedirectUrl = localStorage.getItem("findr_redirect_after_login");
            if (savedRedirectUrl) {
              localStorage.removeItem("findr_redirect_after_login");
              setTimeout(() => {
                window.location.href = savedRedirectUrl;
              }, 300);
            }
            break;
          case "SIGNED_OUT":
            setUser(null);
            setSession(null);
            break;
          case "TOKEN_REFRESHED":
            setUser(newSession.user);
            setSession(newSession);
            break;
          case "USER_UPDATED":
            setUser(newSession.user);
            setSession(newSession);
            break;
          case "INITIAL_SESSION":
            if (newSession) {
              setUser(newSession.user);
              setSession(newSession);
            }
            break;
        }
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const handleStorageChange = async (event) => {
      if (event.key && (event.key.includes("sb-") || event.key === "findr-supabase-auth")) {
        try {
          const { data: { session: updatedSession }, error } = await supabase.auth.getSession();
          if (error) {
          } else if (updatedSession) {
            setUser(updatedSession.user);
            setSession(updatedSession);
            setLoading(false);
          } else {
            setUser(null);
            setSession(null);
            setLoading(false);
          }
        } catch (error) {
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error };
      }
      return { error: null };
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };
  const contextValue = {
    user,
    // null or {id, email,...}
    session,
    // null or {id, email,...}
    loading,
    //initial state validation
    signOut,
    //logout function
    isAuthenticated: !!(user || session?.user),
    // boolean: true si hay usuario
    isLoading: loading
    // alias más claro para loading
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: contextValue, children });
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error(
      "🚨 useAuth debe ser usado dentro de un AuthProvider. Envuelve tu componente con <AuthProvider>...</AuthProvider>"
    );
  }
  return context;
};

const AuthWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx(AuthProvider, { children });
};
const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    return /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(WrappedComponent, { ...props }) });
  };
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
  return ComponentWithAuth;
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://findr.cl");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Encuentra tu pr\xF3ximo m\xE9dico de confianza. Busca por especialidad, ciudad y previsi\xF3n. Lee rese\xF1as reales de pacientes." } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"><link rel="icon" type="image/svg+xml" href="/img/fav-findr.svg"><title>', '</title><meta name="google-site-verification" content="2YhiQURq9L-vlOQka0xXCvm4VhJae-RV5_rsRYJG6NM"><meta name="description"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><!-- Google Fonts preconnect --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap">', "<!-- Safari mobile viewport fix: sets --real-vh to actual visible height --><script>\n            function setRealVh() {\n                document.documentElement.style.setProperty('--real-vh', window.innerHeight + 'px');\n            }\n            setRealVh();\n            window.addEventListener('resize', setRealVh, { passive: true });\n        <\/script>", '</head> <body class="flex flex-col"> <div class="min-h-dvh"> ', " </div> ", " </body></html>"])), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderSlot($$result, $$slots["head"]), renderHead(), renderComponent($$result, "AuthWrapper", AuthWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/components/api/supabase/AuthWrapper.jsx", "client:component-export": "AuthWrapper" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])}  ` }), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $, useAuth as u, withAuth as w };
