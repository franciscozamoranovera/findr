import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { s as supabase } from './supabase_01iFa7cT.mjs';
import { useState, useEffect } from 'react';

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    return subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: isLoggedIn ? /* @__PURE__ */ jsx(
    "button",
    {
      className: "rounded-full bg-[#2D2D2D] text-white py-1 px-1  sm:py-1 sm:px-3 md:py-1 md:px-3 lg:py-2 lg:px-4  hover:bg-white hover:text-black",
      onClick: () => {
        supabase.auth.signOut();
      },
      children: /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-sm md:text-md lg:text-md", children: "Cerrar Sesión" })
    }
  ) : [] });
};

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pl-4 pt-3  bg-transparent", children: [
    /* @__PURE__ */ jsx("a", { href: "/search", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        viewBox: "0 0 820 180",
        xmlns: "http://www.w3.org/2000/svg",
        className: "max-w-3xl w-48 sm:w-48 md:w-52 lg:w-52",
        children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: "innerShadow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
            /* @__PURE__ */ jsx("feOffset", { dx: "7", dy: "7" }),
            " ",
            /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "5", result: "blur" }),
            /* @__PURE__ */ jsx(
              "feComposite",
              {
                operator: "out",
                in: "SourceGraphic",
                in2: "blur",
                result: "inverse"
              }
            ),
            /* @__PURE__ */ jsx("feFlood", { floodColor: "black", floodOpacity: "0.28", result: "color" }),
            /* @__PURE__ */ jsx("feComposite", { operator: "in", in: "color", in2: "inverse", result: "shadow" }),
            /* @__PURE__ */ jsx("feComposite", { operator: "over", in: "shadow", in2: "SourceGraphic" })
          ] }) }),
          /* @__PURE__ */ jsxs(
            "text",
            {
              x: "20",
              y: "140",
              fontFamily: "'EB Garamond', serif",
              fontSize: "160",
              fontWeight: "500",
              children: [
                /* @__PURE__ */ jsx("tspan", { fill: "#000000", children: "fin" }),
                /* @__PURE__ */ jsx(
                  "tspan",
                  {
                    fill: "#0066FF",
                    filter: "url(#innerShadow)",
                    dx: "-6",
                    children: "dr"
                  }
                )
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "items-center pr-5 flex gap-10 md:gap-5 sm:gap-4 lg:gap-10 ", children: [
      /* @__PURE__ */ jsx("a", { href: "https://wa.me/56951083930?text=Hola!%20Qu%C3%A9%20tal%3F", target: "_blank", rel: "noopener noreferrer", className: "text-md text-gray-500 hover:text-[#2D2D2D] underline cursor-pointer", children: "Soy especialista" }),
      isLoggedIn ? /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx(Logout, { "client:load": true }) }) : []
    ] })
  ] }) });
};

export { NavBar as N };
