/* empty css                                */
import { b as createAstro, c as createComponent, a as renderComponent, r as renderTemplate, u as unescapeHTML, h as defineScriptVars, m as maybeRenderHead } from '../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { u as useAuth, w as withAuth, $ as $$Layout } from '../chunks/Layout_B3lr_rLA.mjs';
import { s as supabase } from '../chunks/supabase_01iFa7cT.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const ReviewButton = ({
  drId,
  doctorName,
  onReviewStart = () => {
  },
  //callback para inicio review
  onLoadingRedirect = () => {
  }
  //callback antes de redirect al login
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();
  useNavigate();
  useEffect(() => {
    const resetProcessing = () => setIsProcessing(false);
    window.addEventListener("pageshow", resetProcessing);
    return () => window.removeEventListener(
      "pageshow",
      resetProcessing
    );
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: "rounded-full bg-[#2D2D2D] text-white py-6 px-14",
        disabled: true,
        "aria-label": "Verificando estado de autenticación",
        children: /* @__PURE__ */ jsx("span", { children: "Verificando...." })
      }
    );
  }
  if (!isAuthenticated) {
    const handleLoginRedirect = () => {
      setIsProcessing(true);
      onLoadingRedirect({ drId });
      const currentPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("doctor", drId);
      searchParams.set("action", "review");
      const fullCurrentPath = `${currentPath}?${searchParams.toString()}`;
      const loginUrl = `/login?redirect=${encodeURIComponent(fullCurrentPath)}`;
      setTimeout(() => {
        window.location.href = loginUrl;
      }, 300);
    };
    return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2  sm:drop-shadow-2xl", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white py-5 px-5 sm:py-6 sm:px-6 text-sm flex-1 sm:flex-initial",
        onClick: handleLoginRedirect,
        disabled: isProcessing,
        children: isProcessing ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("span", { className: "max-w-[200px] sm:max-w-[250px] whitespace-nowrap", children: "Redirigiendo..." }) }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "#ffffff", children: /* @__PURE__ */ jsxs("g", { fill: "#ffffff", children: [
            /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z", clipRule: "evenodd" }),
            /* @__PURE__ */ jsx("path", { d: "m11.52 14.929l5.917-5.917a8.232 8.232 0 0 1-2.661-1.787a8.232 8.232 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891Zm7.559-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0 0 18.37 8.08l.71-.71Z" })
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "max-w-[200px] sm:max-w-[250px] whitespace-nowrap", children: "Escribe una reseña..." })
        ] })
      }
    ) });
  }
  const handleStartReview = () => {
    setIsProcessing(true);
    onReviewStart({
      drId,
      doctorName,
      userId: user.id,
      userEmail: user.email
    });
    const reviewUrl = `/review?id=${drId}&from=${encodeURIComponent("/doctor/" + drId)}`;
    window.location.href = reviewUrl;
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 sm:drop-shadow-2xl", children: /* @__PURE__ */ jsx(
    "button",
    {
      className: "sm:drop-shadow-2xl rounded-full bg-[#2D2D2D] text-white py-5 px-5 sm:py-6 sm:px-6 text-sm flex-1 sm:flex-initial",
      onClick: handleStartReview,
      disabled: isProcessing,
      "aria-label": `Dejar reseña a ${doctorName} como ${user.email}`,
      children: isProcessing ? /* @__PURE__ */ jsx("span", { className: "max-w-[200px] sm:max-w-[250px]", children: "Preparando..." }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "#ffffff", children: /* @__PURE__ */ jsxs("g", { fill: "#ffffff", children: [
          /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z", clipRule: "evenodd" }),
          /* @__PURE__ */ jsx("path", { d: "m11.52 14.929l5.917-5.917a8.232 8.232 0 0 1-2.661-1.787a8.232 8.232 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891Zm7.559-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0 0 18.37 8.08l.71-.71Z" })
        ] }) }),
        /* @__PURE__ */ jsxs("span", { className: "truncate max-w-[200px] sm:max-w-[250px]", children: [
          "Dejar reseña como ",
          user.email.substring(
            0,
            Math.floor(user.email.length * 0.3)
          ),
          "..."
        ] })
      ] })
    }
  ) });
};

const AuthReviewButton = withAuth(ReviewButton);

const DrReviews = ({ postReviewQuery }) => {
  if (postReviewQuery.isPending) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-16  rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-48 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-48 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-14 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-24 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-32 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-24 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-14 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-32 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-16 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-16 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-36 rounded-3xl  " }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-300 pt-20 pb-20 rounded-3xl  " })
    ] });
  }
  const reviewData = postReviewQuery.data?.pages.flat();
  const maskEmailName = (email) => {
    const [name, domain] = email.split("@");
    return name.substring(0, 7) + "***@" + domain;
  };
  const getRelativeTime = (dateString) => {
    const now = /* @__PURE__ */ new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
    if (diffDays < 1) return "Hace unas horas";
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 14) return "Hace 1 semana";
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
  };
  const toString = (num) => {
    const count = num.toString();
    if (count === "0.0") return 0;
    if (!count.includes(".")) {
      return count + ".0";
    } else return count;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: reviewData && reviewData.length > 0 ? reviewData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((data, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-3xl w-full break-inside-avoid ", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center p-1", children: [
      /* @__PURE__ */ jsx("div", { className: "pr-3", children: "🙋🏻‍♂️" }),
      /* @__PURE__ */ jsx("div", { className: "", children: data.is_anonymous ? /* @__PURE__ */ jsx("h4", { className: "text-sm", children: "Anonimo" }) : /* @__PURE__ */ jsx("h4", { className: "text-sm", children: maskEmailName(data.user_email) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center p-1", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#000000", d: "M17.562 21.56a1.003 1.003 0 0 1-.465-.115L12 18.765l-5.097 2.68a1 1 0 0 1-1.451-1.054l.973-5.676l-4.123-4.02a1 1 0 0 1 .554-1.705l5.699-.828l2.548-5.164a1.042 1.042 0 0 1 1.794 0l2.548 5.164l5.699.828a1 1 0 0 1 .554 1.706l-4.123 4.019l.973 5.676a1 1 0 0 1-.986 1.169Z" }) }),
      /* @__PURE__ */ jsx("div", { className: "pr-1 pl-0.5", children: toString(data.promedio_general) }),
      /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsxs("p", { className: "font-normal", children: [
        " • ",
        getRelativeTime(data.created_at)
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-2 break-words min-w-0", style: { whiteSpace: "pre-line" }, children: /* @__PURE__ */ jsx("p", { children: data.written_review }) }),
    /* @__PURE__ */ jsx("div", { className: "p-1 mb-1 border-black border rounded-xl w-fit", children: /* @__PURE__ */ jsx("p", { className: "text-xs", children: data.appointment_reason }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1", children: data.diseases.map((diseases, i2) => /* @__PURE__ */ jsx("ul", { className: "bg-gray-400 p-2 rounded-xl w-fit", children: /* @__PURE__ */ jsx("li", { className: "text-sm", children: diseases }) }, i2)) })
  ] }, i)) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm p-3", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 font-medium", children: "Todavía no tiene reseñas" }) }) });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://findr.cl");
const prerender = false;
const $$ProfileDoc = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProfileDoc;
  const { id } = Astro2.params;
  const { data, error } = await supabase.from("doctor_search_view_flat").select(
    "doctor_first_name, full_name, speciality_name, sub_speciality_name, diseases, total_reviews, promedio_general, promedio_atencion, promedio_comunicacion, promedio_continuidad, promedio_conocimiento, promedio_recomendacion, healthcare_centers"
  ).eq("id", id).single();
  if (error) {
    return Astro2.redirect("/404");
  }
  if (!data) {
    return Astro2.redirect("/404");
  }
  const toString = (num) => {
    const count = num.toString();
    if (count === "0") return 0;
    if (!count.includes(".")) {
      return count + ".0";
    } else return count;
  };
  const doctorRating = toString(data.promedio_general);
  const continuationRating = toString(data.promedio_continuidad);
  const comunicationRating = toString(data.promedio_comunicacion);
  const knowledgeDomainRating = toString(data.promedio_conocimiento);
  const attentionRating = toString(data.promedio_atencion);
  const recomendationRating = toString(data.promedio_recomendacion);
  const toPercentaje = (num) => {
    const conversion = num * 20 + "%";
    return conversion;
  };
  const continueOrNotBar = toPercentaje(data.promedio_continuidad);
  const comunicationBar = toPercentaje(data.promedio_comunicacion);
  const knowledgeDomainBar = toPercentaje(data.promedio_conocimiento);
  const attentionBar = toPercentaje(data.promedio_atencion);
  const recomendationBar = toPercentaje(data.promedio_recomendacion);
  const metaTitle = `${data.full_name} - ${data.speciality_name ?? "M\xE9dico"} | findr`;
  const metaDescription = data.total_reviews > 0 ? `${data.full_name}, ${data.speciality_name ?? "m\xE9dico"} con calificaci\xF3n ${data.promedio_general}/5 basada en ${data.total_reviews} rese\xF1as. ${data.healthcare_centers?.[0] ? `Atiende en ${data.healthcare_centers[0]}.` : ""}` : `Perfil de ${data.full_name}, ${data.speciality_name ?? "m\xE9dico"}. ${data.healthcare_centers?.[0] ? `Atiende en ${data.healthcare_centers[0]}.` : ""}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": data.full_name,
    "medicalSpecialty": data.speciality_name ?? void 0,
    ...data.total_reviews > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.promedio_general,
        "reviewCount": data.total_reviews,
        "bestRating": 5,
        "worstRating": 1
      }
    },
    ...data.healthcare_centers?.[0] && {
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": data.healthcare_centers[0]
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": metaTitle, "description": metaDescription, "data-astro-cid-xzwk6hol": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section class="summary-section" data-astro-cid-xzwk6hol> <section class="doc-profile-summary" data-astro-cid-xzwk6hol> <div class="doc-profile-photo" data-astro-cid-xzwk6hol>\u{1F468}\u{1F3FB}\u200D\u2695\uFE0F</div> <div class="pb-3" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol> ', ' </h1> </div> <div class="pb-2" data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>', '</p> </div> <div class="dp-speciality-subspeciality" data-astro-cid-xzwk6hol> ', " ", ' </div> <container class="dp-top-20-percent" data-astro-cid-xzwk6hol> <!-- Hide for those that are out of top 20% --> <div class="dp-laurel-branches-overall-top-rated" data-astro-cid-xzwk6hol> <!-- Only for top rated drs --> <div class="left-laurel-branch" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/left-laurel-findr-it-rating.png" data-astro-cid-xzwk6hol> </div> <div class="overall-rate" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> <div class="right-laurel-branch" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/right-laurel-findr-it-rating.png" data-astro-cid-xzwk6hol> </div> </div> <div class="dp-description-top-rated-region" data-astro-cid-xzwk6hol> <!-- Only for top rated drs --> <p data-astro-cid-xzwk6hol>\nFavorito entre Cardi\xF3logos en la Regi\xF3n\n                            Metropolitana\n</p> </div> <div class="dp-description-top-rated-chile" data-astro-cid-xzwk6hol> <!-- Only for top rated drs --> <p data-astro-cid-xzwk6hol> <strong data-astro-cid-xzwk6hol>', '</strong> est\xE1 dentro del 20%\n                            de los cardi\xF3logos mejor valorados de Chile\n</p> </div> <div class="top-rated-reviews-qty" data-astro-cid-xzwk6hol> <h3 data-astro-cid-xzwk6hol>(', " rese\xF1as)</h3> </div> </container> <script>(function(){", '\n                    //hide overall rating.\n                    if (doctorRating === 0) {\n                        return (document.querySelector(\n                            ".dp-top-20-percent",\n                        ).style.display = "none");\n                    }\n\n                    //add % to width for rating bars\n                    document.documentElement.style.setProperty(\n                        "--width-bar-continueOrNotBar",\n                        continueOrNotBar,\n                    );\n                    document.documentElement.style.setProperty(\n                        "--width-bar-comunicationBar",\n                        comunicationBar,\n                    );\n                    document.documentElement.style.setProperty(\n                        "--width-bar-knowledgeDomainBar",\n                        knowledgeDomainBar,\n                    );\n                    document.documentElement.style.setProperty(\n                        "--width-bar-attentionBar",\n                        attentionBar,\n                    );\n                    document.documentElement.style.setProperty(\n                        "--width-bar-recomendationBar",\n                        recomendationBar,\n                    );\n                })();<\/script> <!-- hidden --> <container class="dp-out-20percent-rated" hidden data-astro-cid-xzwk6hol> <div class="dp-star-overall-rate" data-astro-cid-xzwk6hol> <!-- For the 80% mayority rated out of 20% or 0 reviews + 0 rating --> <div class="out-20percent-star" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" data-astro-cid-xzwk6hol> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" data-astro-cid-xzwk6hol></path> </svg> </div> <div class="out-20percent-overall-rate" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>4,0</h1> </div> <div class="out-20percent-reviews-qty" data-astro-cid-xzwk6hol> <h3 data-astro-cid-xzwk6hol>\u2022 6 rese\xF1as</h3> </div> </div> </container> <!-- hidden --> <container class="tag-clasification-section gap-5 flex flex-row flex-wrap justify-center items-center mt-16 mb-12" data-astro-cid-xzwk6hol> <div class="resolvio-mi-problema" data-astro-cid-xzwk6hol> <div class="icon-resolvio-mi-problema" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/calification-icons/problem-solved.png" data-astro-cid-xzwk6hol> </div> <div data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>Continuar\xEDa Atendiendose</p> </div> <div class="graph-resolvio-mi-problema" data-astro-cid-xzwk6hol> <button class="pointer-events-none" tabindex="-1" data-astro-cid-xzwk6hol></button> </div> <div class="rate-resolvio-mi-problema" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> </div> <div class="comunicacion-clara" data-astro-cid-xzwk6hol> <div class="icon-comunicacion-clara" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/calification-icons/comunication.png" data-astro-cid-xzwk6hol> </div> <div data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>Comunicaci\xF3n Clara</p> </div> <div class="graph-comunicacion-clara" data-astro-cid-xzwk6hol> <button class="pointer-events-none" tabindex="-1" data-astro-cid-xzwk6hol></button> </div> <div class="rate-comunicacion-clara" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> </div> <div class="atencion-profesionalismo" data-astro-cid-xzwk6hol> <div class="icon-atencion-profesionalismo" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/calification-icons/attention-profesionalism.png" data-astro-cid-xzwk6hol> </div> <div data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>Atenci\xF3n y Profesionalismo</p> </div> <div class="graph-atencion-profesionalismo" data-astro-cid-xzwk6hol> <button class="pointer-events-none" tabindex="-1" data-astro-cid-xzwk6hol></button> </div> <div class="rate-atencion-profesionalismo" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> </div> <div class="dominio-conocimientos" data-astro-cid-xzwk6hol> <div class="icon-dominio-conocimientos" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/calification-icons/knoledge-domain.png" data-astro-cid-xzwk6hol> </div> <div data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>Dominio Conocimientos</p> </div> <div class="graph-dominio-conocimientos" data-astro-cid-xzwk6hol> <button class="pointer-events-none" tabindex="-1" data-astro-cid-xzwk6hol></button> </div> <div class="rate-dominio-conocimientos" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> </div> <div class="recomiendo-a-familiar" data-astro-cid-xzwk6hol> <div class="icon-recomiendo-a-familiar" data-astro-cid-xzwk6hol> <img src="/img/doctor-profile/calification-icons/recomendation.png" data-astro-cid-xzwk6hol> <div data-astro-cid-xzwk6hol> <div data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>Recomendar\xEDa a Familiar</p> </div> <div class="graph-recomiendo-a-familiar" data-astro-cid-xzwk6hol> <button class="pointer-events-none" tabindex="-1" data-astro-cid-xzwk6hol></button> </div> <div class="rate-recomiendo-a-familiar" data-astro-cid-xzwk6hol> <h1 data-astro-cid-xzwk6hol>', '</h1> </div> </div> </div> </div> </container> </section> </section>  <section class="flex flex-col gap-2 items-center" data-astro-cid-xzwk6hol> <!-- ---- ABOUT SECTION ---- --> <section class="sm:w-3/5 pl-3 pr-3" data-astro-cid-xzwk6hol> <container class="about" data-astro-cid-xzwk6hol> <h1 class="pb-4 pt-4" data-astro-cid-xzwk6hol>Sobre ', '</h1> <div class="gap-2 pb-4" data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\nSoy m\xE9dico general con casi 40 a\xF1os de experiencia\n                            en atenci\xF3n de pacientes tanto adultos como ni\xF1os en\n                            la atenci\xF3n primaria p\xFAblica de salud , as\xED como en\n                            el \xE1rea privada; consultas m\xE9dicas , centros\n                            m\xE9dicos, atenci\xF3n de urgencia tanto de adultos como\n                            de ni\xF1os.\n</p> </div> </container> <container class="flex flex-col gap-1" data-astro-cid-xzwk6hol> <div class="education" data-astro-cid-xzwk6hol> <div class="flex items-center gap-1" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" data-astro-cid-xzwk6hol><g fill="none" data-astro-cid-xzwk6hol><path fill="#000000" fill-rule="evenodd" d="M6.5 16H16c1.886 0 2.828 0 3.414-.586C20 14.828 20 13.886 20 12V7c0-1.886 0-2.828-.586-3.414C18.828 3 17.886 3 16 3H8c-1.886 0-2.828 0-3.414.586C4 4.172 4 5.114 4 7v11.5A2.5 2.5 0 0 1 6.5 16M9 6a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4z" clip-rule="evenodd" data-astro-cid-xzwk6hol></path><path fill="#000000" d="m19.414 15.414l-.707-.707zm0-11.828l-.707.707zM9 6V5zm0 4V9zm6 0v1zm0-4V5zm1 9H6.5v2H16zm2.707-.293c-.076.076-.212.17-.646.229c-.462.062-1.09.064-2.061.064v2c.915 0 1.701.002 2.328-.082c.655-.088 1.284-.287 1.793-.797zM19 12c0 .971-.002 1.599-.064 2.061c-.059.434-.153.57-.229.646l1.414 1.414c.51-.51.709-1.138.797-1.793C21.002 13.7 21 12.915 21 12zm0-5v5h2V7zm-.293-2.707c.076.076.17.212.229.646C18.998 5.4 19 6.029 19 7h2c0-.915.002-1.701-.082-2.328c-.088-.655-.287-1.284-.797-1.793zM16 4c.971 0 1.599.002 2.061.064c.434.059.57.153.646.229l1.414-1.414c-.51-.51-1.138-.709-1.793-.797C17.7 1.998 16.915 2 16 2zM8 4h8V2H8zm-2.707.293c.076-.076.212-.17.646-.229C6.4 4.002 7.029 4 8 4V2c-.915 0-1.701-.002-2.328.082c-.655.088-1.284.287-1.793.797zM5 7c0-.971.002-1.599.064-2.061c.059-.434.153-.57.229-.646L3.879 2.879c-.51.51-.709 1.138-.797 1.793C2.998 5.3 3 6.085 3 7zm0 11.5V7H3v11.5zM6.5 15A3.5 3.5 0 0 0 3 18.5h2A1.5 1.5 0 0 1 6.5 17zM8 8a1 1 0 0 1 1-1V5a3 3 0 0 0-3 3zm1 1a1 1 0 0 1-1-1H6a3 3 0 0 0 3 3zm6 0H9v2h6zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-1-1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3zM9 7h6V5H9zm2 13H6.5v2H11zm-8-1.5A3.5 3.5 0 0 0 6.5 22v-2A1.5 1.5 0 0 1 5 18.5z" data-astro-cid-xzwk6hol></path><path stroke="#000000" stroke-linecap="round" stroke-width="2" d="M20 21H10" data-astro-cid-xzwk6hol></path></g></svg> <h3 class="text-xl" data-astro-cid-xzwk6hol>Formaci\xF3n</h3> </div> <ul data-astro-cid-xzwk6hol> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- M\xE9dico Cirujano, Pontificia Universidad\n                                    Cat\xF3lica de Chile, Chile.\n</p> </li> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- Anestesi\xF3logo, Pontificia Universidad\n                                    Cat\xF3lica de Chile, Chile (2001).\n</p> </li> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- Fellow, Regional Anesthesia & Ambulatory\n                                    Surgery, Duke University Medical Center, USA\n                                    (2006).\n</p> </li> </ul> </div> <div class="research-projects" data-astro-cid-xzwk6hol> <div class="flex items-center gap-1 clear-start" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" data-astro-cid-xzwk6hol><path fill="#000000" fill-rule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H18v8.75A2.75 2.75 0 0 1 15.25 15h-1.072l.798 3.06a.75.75 0 0 1-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 0 1-1.452-.38L5.823 15H4.75A2.75 2.75 0 0 1 2 12.25V3.5h-.25A.75.75 0 0 1 1 2.75ZM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373Zm7.49-8.931a.75.75 0 0 1-.175 1.046a19.326 19.326 0 0 0-3.398 3.098a.75.75 0 0 1-1.097.04L8.5 8.561l-2.22 2.22A.75.75 0 1 1 5.22 9.72l2.75-2.75a.75.75 0 0 1 1.06 0l1.664 1.663a20.786 20.786 0 0 1 3.122-2.74a.75.75 0 0 1 1.046.176Z" clip-rule="evenodd" data-astro-cid-xzwk6hol></path></svg> <h3 class="text-xl" data-astro-cid-xzwk6hol>Investigaci\xF3n y Proyectos</h3> </div> <ul data-astro-cid-xzwk6hol> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- 2010-2012: Director (PI), Proyecto FONIS\n                                    Regular SA09I20035:\u201CEvaluaci\xF3n del uso de\n                                    analgesia de Plexo Lumbar Continuo en la\n                                    incidencia de eventos cardiovasculares en\n                                    perioperatorio de pacientes adultos mayores\n                                    con riesgo coronario con fractura de\n                                    cadera\u201D. Fuente de Financiamiento: CONICYT.\n</p> </li> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- 2011- 2012: Investigador Principal,\n                                    Proyecto Investigaci\xF3n Sociedad de\n                                    Anestesiolog\xEDa de Chile: \u201CComparaci\xF3n de los\n                                    niveles plasm\xE1ticos de levobupivaca\xEDna con y\n                                    sin vasoconstrictor administrada en un\n                                    bloqueo de plano transverso abdominal (TAP\n                                    Block) guiado por ultrasonograf\xEDa\u201D. Fuente\n                                    de Financiamiento: Fondo de Fomento a la\n                                    Investigaci\xF3n, Sociedad de Anestesiolog\xEDa de\n                                    Chile.\n</p> </li> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- 2011- 2012: Investigador Principal,\n                                    Proyecto Investigaci\xF3n Sociedad de\n                                    Anestesiolog\xEDa de Chile: \u201CComparaci\xF3n de los\n                                    niveles plasm\xE1ticos de levobupivaca\xEDna con y\n                                    sin vasoconstrictor administrada en un\n                                    bloqueo de plano transverso abdominal (TAP\n                                    Block) guiado por ultrasonograf\xEDa\u201D. Fuente\n                                    de Financiamiento: Fondo de Fomento a la\n                                    Investigaci\xF3n, Sociedad de Anestesiolog\xEDa de\n                                    Chile.\n</p> </li> <li data-astro-cid-xzwk6hol> <p data-astro-cid-xzwk6hol>\n- 2011- 2012: Investigador Principal,\n                                    Proyecto Investigaci\xF3n Sociedad de\n                                    Anestesiolog\xEDa de Chile: \u201CComparaci\xF3n de los\n                                    niveles plasm\xE1ticos de levobupivaca\xEDna con y\n                                    sin vasoconstrictor administrada en un\n                                    bloqueo de plano transverso abdominal (TAP\n                                    Block) guiado por ultrasonograf\xEDa\u201D. Fuente\n                                    de Financiamiento: Fondo de Fomento a la\n                                    Investigaci\xF3n, Sociedad de Anestesiolog\xEDa de\n                                    Chile.\n</p> </li> </ul> </div> </container> <container class="placeofcare-prevision" data-astro-cid-xzwk6hol> <div class="placeofcare" data-astro-cid-xzwk6hol> <div class="flex items-center gap-1" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56" data-astro-cid-xzwk6hol><path fill="#000000" d="M28 4c9.389 0 17 7 17 19c0 9.13-9.841 22.313-14.548 28.096c-1.354 1.604-3.627 1.54-4.903 0C20.843 45.316 11 32.132 11 23c0-12 7.611-19 17-19m0 11a6 6 0 1 0 0 12a6 6 0 0 0 0-12" data-astro-cid-xzwk6hol></path></svg> <h1 class="text-2xl" data-astro-cid-xzwk6hol>Lugar de Atenci\xF3n</h1> </div> <ul data-astro-cid-xzwk6hol> <div class="flex items-center gap-1" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" data-astro-cid-xzwk6hol><path fill="#000000" fill-rule="evenodd" d="M8.879.593c0-.272.22-.493.492-.493h1.602c.272 0 .493.22.493.493V2.47h1.94c.272 0 .492.221.492.493v1.602c0 .272-.22.492-.492.492h-1.94v1.94a.493.493 0 0 1-.493.493H9.37A.493.493 0 0 1 8.88 7V5.06H7a.493.493 0 0 1-.493-.493V2.964c0-.272.22-.493.493-.493h1.879zm-.185 13.292a2.66 2.66 0 0 1-1.723-.409A23.878 23.878 0 0 1 .506 7.011a2.66 2.66 0 0 1 .404-3.32l.375-.375a.897.897 0 0 1 1.261 0l1.518 1.577a.887.887 0 0 1 0 1.251a.897.897 0 0 0 0 1.262l2.513 2.513a.897.897 0 0 0 1.261 0a.887.887 0 0 1 1.252 0l1.577 1.567a.897.897 0 0 1 0 1.261l-.375.374a2.66 2.66 0 0 1-1.598.764" clip-rule="evenodd" data-astro-cid-xzwk6hol></path></svg> <h4 data-astro-cid-xzwk6hol>Telemedicina</h4> </div> <li data-astro-cid-xzwk6hol>\n- Particular: \u201CAv Ricardo Lyon 1450,\n                                Providencia.\n</li> </ul> <ul data-astro-cid-xzwk6hol> <h4 data-astro-cid-xzwk6hol>Presencial</h4> <li data-astro-cid-xzwk6hol>\n- Particular: \u201CAv Ricardo Lyon 1450,\n                                Providencia.\n</li> <li data-astro-cid-xzwk6hol>- Clinica Indisa</li> <li data-astro-cid-xzwk6hol>- Clinica Alemana</li> <li data-astro-cid-xzwk6hol>- Clinica Las Condes</li> </ul> </div> <div class="prevision" data-astro-cid-xzwk6hol> <h2 data-astro-cid-xzwk6hol>Prevision</h2> <ul data-astro-cid-xzwk6hol> <li data-astro-cid-xzwk6hol>- Fonasa</li> <li data-astro-cid-xzwk6hol>- Colmena</li> <li data-astro-cid-xzwk6hol>- Mas Vida</li> </ul> </div> </container> <container class="treated-deseases-list" data-astro-cid-xzwk6hol> <h2 data-astro-cid-xzwk6hol>Enfermedades que trata</h2> <div class="flex flex-wrap gap-2" data-astro-cid-xzwk6hol> ', ' </div> </container> </section> <!-- ---- DOC REVIEWS ---- --> <section class="doc-reviews" data-astro-cid-xzwk6hol> <!-- <div class="button-review-container"> --> <div class="text-center" data-astro-cid-xzwk6hol> <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="30" height="30" viewBox="0 0 24 24" data-astro-cid-xzwk6hol><path fill="#000000" d="m6 18l-3.15 3.15q-.25.25-.55.125T2 20.8V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H6Zm6-5.525l1.9 1.15q.275.175.55-.013t.2-.512l-.5-2.175l1.7-1.475q.25-.225.15-.537t-.45-.338L13.325 8.4l-.875-2.05q-.125-.3-.45-.3t-.45.3l-.875 2.05l-2.225.175Q8.1 8.6 8 8.913t.15.537l1.7 1.475l-.5 2.175q-.075.325.2.513t.55.012l1.9-1.15Z" data-astro-cid-xzwk6hol></path></svg> <h1 class="text-xxl pb-2" data-astro-cid-xzwk6hol>\n\xBFQu\xE9 se opina sobre ', '?\n</h1> <h3 class="p-2" data-astro-cid-xzwk6hol>(', ' rese\xF1as)</h3> </div> <div class="fixed bottom-1 sm:bottom-20 left-15 right-15 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-1 sm:w-auto" data-astro-cid-xzwk6hol> ', ' </div> <div class="patient-comments relative" data-astro-cid-xzwk6hol> <!-- relative: make the absolute works in DrReviews to show: "Todav\xEDa no hay rese\xF1as" --> <div class="patient-comments-desktop" data-astro-cid-xzwk6hol> ', " </div> </div> </section> </section>  "])), maybeRenderHead(), data.full_name, data.healthcare_centers, data.speciality_name && /* check if we can access to sub_speciality (ex. if null we avoid errors) */
  renderTemplate`<h2 data-astro-cid-xzwk6hol>${data.speciality_name}</h2>`, data.sub_speciality_name && renderTemplate`<p class="text-xl" data-astro-cid-xzwk6hol>${data.sub_speciality_name}</p>`, doctorRating, data.full_name, data.total_reviews, defineScriptVars({
    doctorRating,
    continueOrNotBar,
    comunicationBar,
    knowledgeDomainBar,
    attentionBar,
    recomendationBar
  }), continuationRating, comunicationRating, attentionRating, knowledgeDomainRating, recomendationRating, data.doctor_first_name, data.diseases.map((disease) => renderTemplate`<button class="p-2 rounded-full bg-[#2D2D2D] text-white" data-astro-cid-xzwk6hol>${disease}</button>`), data.doctor_first_name, data.total_reviews, renderComponent($$result2, "AuthReviewButton", AuthReviewButton, { "client:load": true, "drId": id, "doctorName": data.doctor_first_name, "client:component-hydration": "load", "client:component-path": "@/components/reviewForm/buttons/progressBar/AuthReviewButton", "client:component-export": "default", "data-astro-cid-xzwk6hol": true }), renderComponent($$result2, "DrReviews", DrReviews, { "client:load": true, "doctorId": id, "client:component-hydration": "load", "client:component-path": "@/components/doctorReviews/DrReviews", "client:component-export": "DrReviews", "data-astro-cid-xzwk6hol": true })), "head": ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(jsonLd))) })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/profileDoc.astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/profileDoc.astro";
const $$url = "/profileDoc";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ProfileDoc,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
