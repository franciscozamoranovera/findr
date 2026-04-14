/* empty css                                */
import { b as createAstro, c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_SFlxVYzk.mjs';
import 'kleur/colors';
import { u as useAuth, $ as $$Layout } from '../chunks/Layout_B3lr_rLA.mjs';
import { s as supabase } from '../chunks/supabase_01iFa7cT.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
export { renderers } from '../renderers.mjs';

const DiseasesMultiSelect = ({ doctorDiseases, doctorDiseasesSelected, onChange, onNext, onBack }) => {
  const [diseasesSelected, setDiseasesSelected] = useState(doctorDiseasesSelected);
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const handleOnClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDiseasesSelected((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        setBtnNextBlocked(false);
        return [...prevSelected, value];
      }
    });
  };
  useEffect(() => {
    onChange("diseases", diseasesSelected);
    if (diseasesSelected.length === 0) setBtnNextBlocked(true);
  }, [setBtnNextBlocked, diseasesSelected]);
  useEffect(() => {
    setDiseasesSelected(doctorDiseasesSelected);
    if (doctorDiseasesSelected.length > 0) setBtnNextBlocked(false);
  }, [setBtnNextBlocked, setDiseasesSelected]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "h1",
      {
        className: "text-2xl",
        children: "¿Qué patologías?"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-gray-400 text-center p-2",
        children: "Elige las patolgías por las que fuiste a la consulta"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 items-center justify-center p-1", children: [
      doctorDiseases.map(
        (diseaseList) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleOnClick,
            type: "button",
            value: diseaseList,
            className: ` ${diseasesSelected.includes(diseaseList) ? "text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full transition-colors`,
            children: diseaseList
          },
          diseaseList
        )
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleOnClick,
          type: "button",
          value: "Consulta General",
          className: ` ${diseasesSelected.includes("Consulta General") ? "bg-[#2D2D2D] text-white" : "bg-white "}  px-6 py-3 rounded-full  transition-colors`,
          children: "Consulta General"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleOnClick,
          type: "button",
          value: "Otro",
          className: ` ${diseasesSelected.includes("Otro") ? "bg-[#2D2D2D] text-white" : "bg-white "}  px-6 py-3 rounded-full  transition-colors`,
          children: "Otro"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full z-50 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
          type: "button",
          onClick: onBack,
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${diseasesSelected.length > 0 ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`,
          type: "button",
          onClick: onNext,
          disabled: btnNextBlocked,
          children: "Siguiente"
        }
      )
    ] }) })
  ] });
};

const HealthcareCenterSelect = ({ doctorHC, onNext, onChange, healthcareCenterSelected }) => {
  const [healthcareCenterList, setHealthcareCenterList] = useState(healthcareCenterSelected);
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const handleOnClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setHealthcareCenterList(healthcareCenterList === value ? "" : value);
    setBtnNextBlocked(false);
  };
  useEffect(() => {
    onChange("healthcareCenterAppointment", healthcareCenterList);
    if (healthcareCenterList === "") setBtnNextBlocked(true);
  }, [healthcareCenterList, setBtnNextBlocked]);
  useEffect(() => {
    if (healthcareCenterSelected !== "") setHealthcareCenterList(healthcareCenterSelected);
    if (healthcareCenterSelected) setBtnNextBlocked(false);
  }, [setHealthcareCenterList, healthcareCenterSelected]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl", children: "¿Dónde fue la visita?" }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
      doctorHC.map((hCenter, i) => /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${hCenter === healthcareCenterList ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full transition-colors m-2`,
          onClick: handleOnClick,
          type: "button",
          value: hCenter,
          children: hCenter
        },
        i
      )),
      /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              window.history.back();
            },
            children: "Salir"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: ` ${healthcareCenterList !== "" ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`,
            type: "button",
            onClick: onNext,
            disabled: btnNextBlocked,
            children: "Siguiente"
          }
        )
      ] })
    ] })
  ] }) });
};

const ReasonSelect = ({ onNext, onBack, onChange, appointmentReasonSelected }) => {
  const [appointmentReason, setAppointmentReason] = useState(appointmentReasonSelected);
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const handleOnClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setAppointmentReason(appointmentReason === value ? "" : value);
    setBtnNextBlocked(false);
  };
  useEffect(() => {
    onChange("appointmentReason", appointmentReason);
    if (appointmentReason === "") setBtnNextBlocked(true);
  }, [appointmentReason, setBtnNextBlocked]);
  useEffect(() => {
    if (appointmentReasonSelected !== "") setAppointmentReason(appointmentReasonSelected);
    if (appointmentReasonSelected) setBtnNextBlocked(false);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "h1",
      {
        className: "text-2xl text-center",
        children: "¿Cuál fue el motivo de tu visita?"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-gray-400 text-center p-2",
        children: "¿Es tu primera vez, visita de seguimiento o la visita final?"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${appointmentReason === "Primera Consulta" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "Primera Consulta",
          onClick: handleOnClick,
          children: "Primera Consulta"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${appointmentReason === "Consulta de Seguimiento" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "Consulta de Seguimiento",
          onClick: handleOnClick,
          children: "Consulta de Seguimiento"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${appointmentReason === "Resolvió mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "Resolvió mi problema",
          onClick: handleOnClick,
          children: "Resolvió mi problema"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
          type: "button",
          onClick: onBack,
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${appointmentReason !== "" ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`,
          type: "button",
          onClick: onNext,
          disabled: btnNextBlocked,
          children: "Siguiente"
        }
      )
    ] }) })
  ] }) });
};

const RatingByCommunication = ({ onScrollToNext, communicationSelected, onChange }) => {
  const [communication, setCommunication] = useState(communicationSelected);
  const [info, setInfo] = useState(false);
  const handleCommunicationClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCommunication(communication === value ? "" : value);
  };
  useEffect(() => {
    onChange("communication", communication);
    if (communication) onScrollToNext();
  }, [communication]);
  useEffect(() => {
    if (communicationSelected != "") setCommunication(communicationSelected);
  }, [communicationSelected]);
  useEffect(() => {
    if (info) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [info]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-2xl text-center",
          children: "¿Cómo fue la comunicación?"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-gray-400 text-center p-2",
          children: "¿Fué claro y contundente o muy resumido, poco claro?"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: `${communication === "Excepcional" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Excepcional",
        onClick: handleCommunicationClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Excepcional"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-6 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                setInfo(true);
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    info === true && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-10 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-lg " }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl shadow-lg w-[280px] h-[350px] flex flex-col items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full overflow-y-auto px-2 py-4 scrollbar-hide", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-gray-800 p-4", children: "Comunicación Excepcional" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-center text-gray-800 font-light", children: [
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me explicó todo de manera extraordinariamente clara, usando analogías y ejemplos"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Verificó varias veces si había entendido todo correctamente"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me mostró modelos anatómicos para explicar mi condición"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me envió por email material adicional sobre mi diagnóstico"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Incluso dibujó un cronograma personalizado para mi tratamiento"' })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-white bg-[#2D2D2D] p-2 m-2 rounded-2xl",
            onClick: () => setInfo(false),
            children: "Entendido"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${communication === "Muy buena" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Muy buena",
        onClick: handleCommunicationClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""} select-none`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                        3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                        c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                        68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                        l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                        150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Muy buena"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 select-none cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${communication === "Cumple" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Cumple",
        onClick: handleCommunicationClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center pointer-events-none select-none", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                        3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                        c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                        68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                        l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                        150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: " ml-2 pointer-events-none select-none",
              children: "Cumple"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${communication === "Deficiente" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Deficiente",
        onClick: handleCommunicationClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                        3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                        c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                        68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                        l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                        150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "ml-5 pointer-events-none select-none",
              children: "Deficiente"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${communication === "Pésima" ? "text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Pésima",
        onClick: handleCommunicationClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex pointer-events-none select-none", children: [...Array(1)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                        3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                        c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                        68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                        l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                        150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsx("p", { className: "ml-7 pointer-events-none select-none", children: "Pésima" }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    )
  ] });
};

const RatingByProfessionalism = ({ onScrollToNext, attentionAndProfessionalismSelected, onChange }) => {
  const [professionalism, setProfessionalism] = useState(attentionAndProfessionalismSelected);
  const [info, setInfo] = useState(false);
  const handleProfessionalismClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProfessionalism(professionalism === value ? "" : value);
  };
  useEffect(() => {
    onChange("attentionAndProfessionalism", professionalism);
    if (professionalism) onScrollToNext();
  }, [professionalism]);
  useEffect(() => {
    if (attentionAndProfessionalismSelected != "") setProfessionalism(attentionAndProfessionalismSelected);
  }, [attentionAndProfessionalismSelected]);
  useEffect(() => {
    if (info) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [info]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-2xl text-center",
          children: "¿La atención se sintió profesional?"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-gray-400 text-center p-2",
          children: "¿Fué claro y contundente o muy resumido, poco clarao?"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${professionalism === "Excepcional" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Excepcional",
        onClick: handleProfessionalismClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Excepcional"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-6 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                setInfo(true);
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    info === true && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-10 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl shadow-lg w-[280px] h-[350px] flex flex-col items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full overflow-y-auto px-2 py-4 scrollbar-hide", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-gray-800 p-4", children: "Atención y Profesionalismo Excepcional" }),
          /* @__PURE__ */ jsx("ul", { className: "text-center text-gray-800 font-light", children: /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Una experiencia sobresaliente. No solo fue extremadamente profesional, sino que demostró verdadera preocupación por mi bienestar. Me hizo sentir que era su único paciente del día. Recordaba detalles de consultas anteriores. Su consultorio es un ejemplo de organización y profesionalismo".' }) })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-white bg-[#2D2D2D] p-2 m-2 rounded-2xl",
            onClick: () => setInfo(false),
            children: "Entendido"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${professionalism === "Muy buena" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Muy buena",
        onClick: handleProfessionalismClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Muy buena"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${professionalism === "Cumple" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Cumple",
        onClick: handleProfessionalismClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center pointer-events-none select-none", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: " ml-2 pointer-events-none select-none",
              children: "Cumple"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${professionalism === "Deficiente" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Deficiente",
        onClick: handleProfessionalismClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "ml-5 pointer-events-none select-none",
              children: "Deficiente"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${professionalism === "Pésima" ? "text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Pésima",
        onClick: handleProfessionalismClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex pointer-events-none select-none", children: [...Array(1)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx("p", { className: "ml-7 pointer-events-none select-none", children: "Pésima" }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    )
  ] });
};

const RatingByKnoledge = ({ onScrollToNext, knowledgeDomainSelected, onChange }) => {
  const [knowledge, setKnowledge] = useState(knowledgeDomainSelected);
  const [info, setInfo] = useState(false);
  const handleKnowledgeClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setKnowledge(knowledge === value ? "" : value);
  };
  useEffect(() => {
    onChange("knowledgeDomain", knowledge);
    if (knowledge) onScrollToNext();
  }, [knowledge]);
  useEffect(() => {
    if (knowledgeDomainSelected != "") setKnowledge(knowledgeDomainSelected);
  }, [knowledgeDomainSelected]);
  useEffect(() => {
    if (info) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [info]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-2xl text-center",
          children: "¿Cómo percibiste el dominio de conocimientos?"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-gray-400 text-center p-2",
          children: "¿Fué claro y contundente o muy resumido, poco clarao?"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${knowledge === "Excepcional" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Excepcional",
        onClick: handleKnowledgeClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                 c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                 l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Excepcional"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-6 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                setInfo(true);
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    info === true && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-10 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl shadow-lg w-[280px] h-[350px] flex flex-col items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full overflow-y-auto px-2 py-4 scrollbar-hide", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-gray-800 p-4", children: "Dominio de Conocimientos Excepcional" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-center text-gray-800 font-light", children: [
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me explicó todo de manera extraordinariamente clara, usando analogías y ejemplos"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Verificó varias veces si había entendido todo correctamente"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me mostró modelos anatómicos para explicar mi condición"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me envió por email material adicional sobre mi diagnóstico"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Incluso dibujó un cronograma personalizado para mi tratamiento"' })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-white bg-[#2D2D2D] p-2 m-2 rounded-2xl",
            onClick: () => setInfo(false),
            children: "Entendido"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${knowledge === "Muy buena" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Muy buena",
        onClick: handleKnowledgeClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                 c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                 l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "pointer-events-none select-none",
              children: "Muy buena"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${knowledge === "Cumple" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Cumple",
        onClick: handleKnowledgeClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center pointer-events-none select-none", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                 c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                 l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: " ml-2 pointer-events-none select-none",
              children: "Cumple"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${knowledge === "Deficiente" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Deficiente",
        onClick: handleKnowledgeClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center pointer-events-none select-none", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                 c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                 l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "ml-5 pointer-events-none select-none",
              children: "Deficiente"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${knowledge === "Pésima" ? "text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex flex-row items-center justify-between`,
        type: "button",
        value: "Pésima",
        onClick: handleKnowledgeClick,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex pointer-events-none select-none", children: [...Array(1)].map((_, i) => /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `${i !== 0 ? "-ml-2" : ""}`,
              width: "22",
              height: "22",
              viewBox: "0 0 576 512",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx("path", { d: "M259.3 17.8L194 150.2L47.9 171.5c-26.2 \n                 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5\n                 c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 \n                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 \n                 l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 \n                 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" })
            },
            i
          )) }),
          /* @__PURE__ */ jsx("p", { className: "ml-7 pointer-events-none select-none", children: "Pésima" }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-4 cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    )
  ] });
};

const RatingByRecommendation = ({ recommendationToFamilySelected, onChange }) => {
  const [recommendation, setRecommendation] = useState(recommendationToFamilySelected);
  const [info, setInfo] = useState(false);
  const handleRecommendationClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setRecommendation(recommendation === value ? "" : value);
  };
  useEffect(() => {
    onChange("recommendationToFamily", recommendation);
  }, [recommendation]);
  useEffect(() => {
    if (recommendationToFamilySelected != "") setRecommendation(recommendationToFamilySelected);
  }, [recommendationToFamilySelected, setRecommendation]);
  useEffect(() => {
    if (info) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [info]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3 pb-52", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-2xl text-center",
          children: "¿Recomendarías un familiar?"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-gray-400 text-center p-2",
          children: "¿Lo recomendarías a tus padres?"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${recommendation === "Sí" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex relative items-center`,
        type: "button",
        value: "Sí",
        onClick: handleRecommendationClick,
        children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "flex-1 ml-3 text-center pointer-events-none select-none",
              children: "Sí"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-auto cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
                setInfo(true);
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    info === true && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-10 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl shadow-lg w-[280px] h-[350px] flex flex-col items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full overflow-y-auto px-2 py-4 scrollbar-hide", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-gray-800 p-4", children: "Si Recomiendo a un Familiar" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-center text-gray-800 font-light", children: [
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me explicó todo de manera extraordinariamente clara, usando analogías y ejemplos"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Verificó varias veces si había entendido todo correctamente"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me mostró modelos anatómicos para explicar mi condición"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Me envió por email material adicional sobre mi diagnóstico"' }),
            /* @__PURE__ */ jsx("li", { className: "p-3 m-1 text-start", children: '"Incluso dibujó un cronograma personalizado para mi tratamiento"' })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-white bg-[#2D2D2D] p-2 m-2 rounded-2xl",
            onClick: () => setInfo(false),
            children: "Entendido"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${recommendation === "No" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex relative items-center`,
        type: "button",
        value: "No",
        onClick: handleRecommendationClick,
        children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "flex-1 ml-3 pointer-events-none select-none",
              children: "No"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-auto cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: ` ${recommendation === "No estoy seguro/a" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex relative items-center`,
        type: "button",
        value: "No estoy seguro/a",
        onClick: handleRecommendationClick,
        children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "flex-1 ml-3 pointer-events-none select-none",
              children: "No estoy seguro/a"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 16 16",
              className: "ml-auto cursor-pointer",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" })
            }
          )
        ]
      }
    )
  ] });
};

const EvaluationSelection = ({ appointmentReasonSelected, evaluationTypeSelected, communicationSelected, attentionAndProfessionalismSelected, knowledgeDomainSelected, recommendationToFamilySelected, onChange, onBack, onNext }) => {
  const [reason, setReason] = useState();
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const [reasonSelection, setReasonSelection] = useState("");
  const [problemSolvedOption, setProblemSolvedOption] = useState("");
  const [addClass, setAddClass] = useState();
  const child0Ref = useRef(null);
  const child1Ref = useRef(null);
  const child2Ref = useRef(null);
  const child3Ref = useRef(null);
  const child4Ref = useRef(null);
  const onScrollToNext = () => scrollToChild1();
  const scrollToChild0 = () => {
    child0Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToChild1 = () => {
    child1Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToChild2 = () => {
    child2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToChild3 = () => {
    child3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToChild4 = () => {
    child4Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const newReasonSelection = reasonSelection === value ? "" : value;
    setReasonSelection(newReasonSelection);
    onChange("evaluationType", newReasonSelection);
    const newProblemSolved = problemSolvedOption === value ? "" : value;
    setProblemSolvedOption(newProblemSolved);
    onChange("problemSolved", newProblemSolved);
    onScrollToNext();
  };
  useEffect(() => {
    if (appointmentReasonSelected === "Primera Consulta") {
      setReason(1);
      setAddClass(`${appointmentReasonSelected !== "" && communicationSelected !== "" && attentionAndProfessionalismSelected !== "" && knowledgeDomainSelected !== "" && recommendationToFamilySelected !== "" ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`);
      setBtnNextBlocked(true);
    }
    if (appointmentReasonSelected === "Consulta de Seguimiento") {
      setReason(2);
      setAddClass(`${reasonSelection && appointmentReasonSelected && communicationSelected && attentionAndProfessionalismSelected && knowledgeDomainSelected && recommendationToFamilySelected ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`);
      setBtnNextBlocked(true);
    }
    if (appointmentReasonSelected === "Resolvió mi problema") {
      setReason(3);
      setAddClass(`${problemSolvedOption && appointmentReasonSelected && communicationSelected && attentionAndProfessionalismSelected && knowledgeDomainSelected && recommendationToFamilySelected ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`);
      setBtnNextBlocked(true);
    }
  }, [
    reasonSelection,
    problemSolvedOption,
    appointmentReasonSelected,
    communicationSelected,
    attentionAndProfessionalismSelected,
    knowledgeDomainSelected,
    recommendationToFamilySelected,
    setReason,
    setBtnNextBlocked
  ]);
  useEffect(() => {
    if (reason === 1 && appointmentReasonSelected && communicationSelected && attentionAndProfessionalismSelected && knowledgeDomainSelected && recommendationToFamilySelected) {
      setBtnNextBlocked(false);
    }
    if (reason === 2 && reasonSelection && appointmentReasonSelected && communicationSelected && attentionAndProfessionalismSelected && knowledgeDomainSelected && recommendationToFamilySelected) {
      setBtnNextBlocked(false);
    }
    if (reason === 3 && problemSolvedOption && appointmentReasonSelected && communicationSelected && attentionAndProfessionalismSelected && knowledgeDomainSelected && recommendationToFamilySelected) {
      setBtnNextBlocked(false);
    }
  }, [
    reasonSelection,
    problemSolvedOption,
    appointmentReasonSelected,
    communicationSelected,
    attentionAndProfessionalismSelected,
    knowledgeDomainSelected,
    recommendationToFamilySelected,
    setBtnNextBlocked,
    reason
  ]);
  useEffect(() => {
    if (reasonSelection === "") scrollToChild0();
    if (problemSolvedOption === "") scrollToChild0();
  }, [reasonSelection, problemSolvedOption, scrollToChild0, setBtnNextBlocked]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    reason === 1 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-2", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "h1",
        {
          className: "text-2xl text-center",
          children: [
            "Según tu ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Primera consulta" }),
            ", evaluemos..."
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-gray-400 text-center p-2",
          children: "Elige una opción"
        }
      ) }),
      /* @__PURE__ */ jsx(
        RatingByCommunication,
        {
          onScrollToNext: scrollToChild2,
          communicationSelected,
          onChange
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: child2Ref, children: /* @__PURE__ */ jsx(
        RatingByProfessionalism,
        {
          onScrollToNext: scrollToChild3,
          attentionAndProfessionalismSelected,
          onChange
        }
      ) }),
      /* @__PURE__ */ jsx("div", { ref: child3Ref, children: /* @__PURE__ */ jsx(
        RatingByKnoledge,
        {
          onScrollToNext: scrollToChild4,
          knowledgeDomainSelected,
          onChange
        }
      ) }),
      /* @__PURE__ */ jsx("div", { ref: child4Ref, children: /* @__PURE__ */ jsx(
        RatingByRecommendation,
        {
          recommendationToFamilySelected,
          onChange
        }
      ) })
    ] }),
    reason === 2 && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "pb-32 flex flex-col items-center justify-center p-2",
        ref: child0Ref,
        children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "text-2xl text-center",
              children: [
                "De mi ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Consulta de Seguimiento" }),
                ", quiero evaluar"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-gray-400 flex flex-col items-center justify-center",
              children: "Elige una opción"
            }
          ) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center p-3",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: ` ${reasonSelection === "Revisión de exámenes" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2`,
                    type: "button",
                    value: "Revisión de exámenes",
                    onClick: handleOnClick,
                    children: "Revisión de exámenes"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: ` ${reasonSelection === "Avances en mi tratamiento" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                    type: "button",
                    value: "Avances en mi tratamiento",
                    onClick: handleOnClick,
                    children: "Avances en mi tratamiento"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: ` ${reasonSelection === "No tuve avances en mi tratamiento" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                    type: "button",
                    value: "No tuve avances en mi tratamiento",
                    onClick: handleOnClick,
                    children: "No tuve avances en mi tratamiento"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: ` ${reasonSelection === "Resolvió mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                    type: "button",
                    value: "Resolvió mi problema",
                    onClick: handleOnClick,
                    children: "Resolvió mi problema"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: ` ${reasonSelection === "Resolvió parcialmente mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                    type: "button",
                    value: "Resolvió parcialmente mi problema",
                    onClick: handleOnClick,
                    children: "Resolvió parcialmente mi problema"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center p-2", children: /* @__PURE__ */ jsx(
              "h1",
              {
                className: "text-2xl",
                children: "Evaluemos..."
              }
            ) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-gray-400 text-center p-2",
                children: "Elige una opción"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child1Ref, children: /* @__PURE__ */ jsx(
              RatingByCommunication,
              {
                onScrollToNext: scrollToChild2,
                communicationSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child2Ref, children: /* @__PURE__ */ jsx(
              RatingByProfessionalism,
              {
                onScrollToNext: scrollToChild3,
                attentionAndProfessionalismSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child3Ref, children: /* @__PURE__ */ jsx(
              RatingByKnoledge,
              {
                onScrollToNext: scrollToChild4,
                knowledgeDomainSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child4Ref, children: /* @__PURE__ */ jsx(
              RatingByRecommendation,
              {
                recommendationToFamilySelected,
                onChange
              }
            ) })
          ] })
        ]
      }
    ),
    reason === 3 && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center p-2",
        ref: child0Ref,
        children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "text-2xl text-center",
              children: [
                "¡Espectacular, ",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: " Se ha resuelto tu problema!" }),
                /* @__PURE__ */ jsx("br", {}),
                "Según lo anterior dirías que fue..."
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-gray-400 text-center p-2",
              children: "Elige una opción"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: ` ${reasonSelection === "Mi primera consulta" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                type: "button",
                value: "Mi primera consulta",
                onClick: handleOnClick,
                children: "Resuelto completamente"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: ` ${reasonSelection === "No continuaré" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`,
                type: "button",
                value: "No continuaré",
                onClick: handleOnClick,
                children: "Resuelto parcialmente"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center p-2", children: /* @__PURE__ */ jsx(
              "h1",
              {
                className: "text-3xl",
                children: "Evalúa tu experiencia"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-gray-400 text-center p-2",
                children: "Cómo calificarías según lo sieguiente"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child1Ref, children: /* @__PURE__ */ jsx(
              RatingByCommunication,
              {
                onScrollToNext: scrollToChild2,
                communicationSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child2Ref, children: /* @__PURE__ */ jsx(
              RatingByProfessionalism,
              {
                onScrollToNext: scrollToChild3,
                attentionAndProfessionalismSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child3Ref, children: /* @__PURE__ */ jsx(
              RatingByKnoledge,
              {
                onScrollToNext: scrollToChild4,
                knowledgeDomainSelected,
                onChange
              }
            ) }),
            /* @__PURE__ */ jsx("div", { ref: child4Ref, children: /* @__PURE__ */ jsx(
              RatingByRecommendation,
              {
                recommendationToFamilySelected,
                onChange
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full  bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
          type: "button",
          onClick: onBack,
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: addClass,
          type: "button",
          onClick: onNext,
          disabled: btnNextBlocked,
          children: "Siguiente"
        }
      )
    ] }) })
  ] });
};

const ProgressBar = ({ step }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 inset-x-0 mx-auto flex w-[350px] space-x-1 pt-1", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex-1 h-1 ${i < step ? "bg-[#2D2D2D]" : "bg-white"}`
    },
    i
  )) }) });
};

const ContinueOrNot = ({ continueOrNotSelected, doctorFName, onChange, onNext, onBack }) => {
  const [continueWith, setContinueWith] = useState(continueOrNotSelected);
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const handleOnClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setContinueWith(continueWith === value ? "" : value);
    if (value) setBtnNextBlocked(false);
  };
  useEffect(() => {
    onChange("continueOrNot", continueWith);
    if (continueWith === "") setBtnNextBlocked(true);
  }, [continueWith]);
  useEffect(() => {
    if (continueOrNotSelected !== "") setContinueWith(continueOrNotSelected);
    if (continueOrNotSelected) setBtnNextBlocked(false);
  }, [setContinueWith, continueOrNotSelected, setBtnNextBlocked]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "h1",
      {
        className: "text-2xl text-center",
        children: [
          "Según tu experiencia, ",
          /* @__PURE__ */ jsx("br", {}),
          " ¿continuarías visitando a ",
          /* @__PURE__ */ jsx("span", { className: "underline", children: doctorFName }),
          "?"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-gray-400 text-center p-2",
        children: "Elige una opción"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${continueWith === "Sí, continuaré atendiendome" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "Sí, continuaré atendiendome",
          onClick: handleOnClick,
          children: "Sí, continuaré atendiendome"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${continueWith === "No, buscaré otra opción" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "No, buscaré otra opción",
          onClick: handleOnClick,
          children: "No, buscaré otra opción"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${continueWith === "No estoy seguro/a" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`,
          type: "button",
          value: "No estoy seguro/a",
          onClick: handleOnClick,
          children: "No estoy seguro/a"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
          type: "button",
          onClick: onBack,
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` ${continueWith !== "" ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`,
          type: "button",
          onClick: onNext,
          disabled: btnNextBlocked,
          children: "Siguiente"
        }
      )
    ] }) })
  ] }) });
};

const Consent = ({ setIsAnonymous, isAnonymous, checked, setChecked, setBtnNextBlocked }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOnClickConsent = (e) => {
    e.preventDefault();
    setChecked(!checked);
    setBtnNextBlocked(true);
  };
  const handleOnClickAnonymus = (e) => {
    e.preventDefault();
    setIsAnonymous(!isAnonymous);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "pb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col-2 gap-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `${isAnonymous === true ? " text-white bg-[#2D2D2D]" : " text-[#2D2D2D] bg-[#ffffff]"} text-sm border border-[#2D2D2D] rounded-full px-4 py-2 transition-colors`,
            value: isAnonymous,
            onClick: handleOnClickAnonymus,
            children: "Anónimo"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `${checked === true ? " text-white bg-[#2D2D2D]" : " text-[#2D2D2D] bg-[#ffffff]"} border border-[#2D2D2D] rounded-full px-4 py-2 transition-colors`,
            onClick: handleOnClickConsent,
            value: checked,
            children: "Acepto Consentimiento"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center w-[20rem] p-2", children: "Al aceptar el consentimiento, aceptas el uso de datos personales para añadir tu opinión sobre un especialista." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "underline text-blue-700 cursor-pointer",
          value: "Ver Concentimiento",
          children: "Ver Concentimiento"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 p-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "text-white bg-[#2D2D2D] rounded-full px-6 py-3 transition-colors",
          value: "Políticas de Privacidad",
          children: "Políticas de Privacidad"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "text-white bg-[#2D2D2D] rounded-full px-6 py-3 transition-colors",
          value: "Términos y Condiciones",
          children: "Términos y Condiciones"
        }
      )
    ] })
  ] }) });
};

const SubmitFormReview = ({ userName, doctorId, formData, writtenReviewInput, checked, onNext, btnNextBlocked, setBtnNextBlocked, doctorFullName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const sendConfirmationEmail = async (userEmail, userName2, doctorFullName2, reviewText) => {
    try {
      const response = await fetch(`${"https://ehdwumyvvxjmzatwkrhu.supabase.co"}/functions/v1/send-review-confirmation`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHd1bXl2dnhqbXphdHdrcmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDkwNDQsImV4cCI6MjA1OTI4NTA0NH0.KB45j2HWqH9Ub63OFPXKi81FNU1qY6fq5wI8jWFBkiU"}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail,
          userName: userName2,
          doctorFullName: doctorFullName2,
          reviewText,
          submissionDate: (/* @__PURE__ */ new Date()).toLocaleString("es-ES")
        })
      });
      if (response.ok) {
        const result = await response.json();
      } else {
      }
    } catch (error) {
    }
  };
  const sendFailureEmail = async (userEmail, userName2, doctorFullName2, reviewText, errorMessage) => {
    try {
      const response = await fetch(`${"https://ehdwumyvvxjmzatwkrhu.supabase.co"}/functions/v1/send-failure-notification`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHd1bXl2dnhqbXphdHdrcmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDkwNDQsImV4cCI6MjA1OTI4NTA0NH0.KB45j2HWqH9Ub63OFPXKi81FNU1qY6fq5wI8jWFBkiU"}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail,
          userName: userName2,
          doctorFullName: doctorFullName2,
          reviewText,
          errorMessage,
          attemptCount: 1,
          lastAttemptDate: (/* @__PURE__ */ new Date()).toLocaleString("es-ES")
        })
      });
      if (response.ok) {
        const result = await response.json();
      } else {
      }
    } catch (error) {
    }
  };
  const {
    writtenReview,
    healthcareCenterAppointment,
    appointmentReason,
    evaluationType,
    problemSolved,
    communication,
    attentionAndProfessionalism,
    knowledgeDomain,
    recommendationToFamily,
    continueOrNot,
    diseases,
    isAnonymous
  } = formData;
  const handleSubmit = async () => {
    setBtnNextBlocked(true);
    setIsLoading(true);
    if (userName) {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: userName
        }
      });
    }
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const result = await supabase.from("reviews").insert({
        user_id: user.id,
        doctor_id: doctorId,
        written_review: writtenReview,
        appointment_reason: appointmentReason,
        attention_and_professionalism: attentionAndProfessionalism,
        comunication: communication,
        continue_or_not: continueOrNot,
        diseases,
        evaluation_type: evaluationType,
        healthcare_center_appointment: healthcareCenterAppointment,
        knowledge_domain: knowledgeDomain,
        problem_solved: problemSolved,
        recommendation_to_family: recommendationToFamily,
        user_email: user.email,
        is_anonymous: isAnonymous
      });
      if (result.error) {
        throw result.error;
      }
      sendConfirmationEmail(
        user.email,
        userName || user.user_metadata?.full_name || "Usuario",
        doctorFullName || "Doctor",
        writtenReview
      );
      setTimeout(() => {
        setIsLoading(false);
        onNext();
      }, 300);
      return result;
    } catch (error) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          sendFailureEmail(
            user.email,
            userName || user.user_metadata?.full_name || "Usuario",
            doctorFullName || "Doctor",
            writtenReview,
            error.message || "Error desconocido"
          );
        }
      } catch (emailError) {
      }
      setIsLoading(false);
      return { error };
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "button",
    {
      className: ` ${writtenReviewInput && checked ? "bg-[#0063F7] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`,
      type: "button",
      onClick: () => {
        handleSubmit();
      },
      disabled: btnNextBlocked,
      children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#ffffff", d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z", children: /* @__PURE__ */ jsx("animateTransform", { attributeName: "transform", dur: "0.75s", repeatCount: "indefinite", type: "rotate", values: "0 12 12;360 12 12" }) }) }) }) : /* @__PURE__ */ jsx("span", { children: "Enviar" })
    }
  ) });
};

const WrittenReview = ({ writtenReviewText, onChange, onBack, onNext, formData, userFname, doctorId, doctorFName, doctorFullName }) => {
  const [writtenReviewInput, setWrittenReviewInput] = useState(writtenReviewText);
  const [checked, setChecked] = useState(false);
  const [btnNextBlocked, setBtnNextBlocked] = useState(true);
  const [userName, setUserName] = useState("");
  const [userNameExist, setUserNameExist] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(formData.isAnonymous);
  const handleInputText = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setWrittenReviewInput(value);
    setBtnNextBlocked(true);
  };
  const handleInputName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUserName(value);
  };
  useEffect(() => {
    if (userFname) {
      setUserName(userFname);
      setUserNameExist(true);
    }
  }, []);
  useEffect(() => {
    onChange("writtenReview", writtenReviewInput);
    onChange("isAnonymous", isAnonymous);
    if (writtenReviewInput.length < 0 && !checked) setBtnNextBlocked(true);
    if (writtenReviewInput.length > 0 && checked) setBtnNextBlocked(false);
  }, [isAnonymous, writtenReviewInput, setBtnNextBlocked, checked]);
  useEffect(() => {
    if (writtenReviewText.length > 0) setWrittenReviewInput(writtenReviewText);
    if (writtenReviewText.length > 0 && checked) setBtnNextBlocked(false);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-3", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "h1",
      {
        className: "text-2xl text-center",
        children: "Escribe una reseña"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "w-[20rem]", children: /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-gray-400 text-center p-2",
        children: "Escribe algo que ayude a otros. ¿Qué te habría gustado saber?"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "pb-3 w-[20rem] flex flex-col items-center", children: userNameExist ? /* @__PURE__ */ jsxs("span", { className: "text-xl text-black", children: [
      "Escribiendo como ",
      userFname
    ] }) : /* @__PURE__ */ jsx(
      "input",
      {
        className: "bg-[#555555] text-white rounded-full px-4 py-2 focus:outline-none focus:border-transparent h-[50px] w-full placeholder:italic focus:bg-[#666666] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black",
        type: "text",
        name: "name",
        placeholder: "Tu primer nombre",
        onChange: handleInputName
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-[20rem] h-[22rem] rounded-[3rem] overflow-hidden", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        onChange: handleInputText,
        value: writtenReviewInput,
        placeholder: "Escribe algo que sea realmente constructivo...",
        className: "text-xl w-full h-full bg-white border border-gray-200 px-6 py-5 focus:outline-none focus:ring-2 focus:ring-gray-400  text-gray-600 align-top rounded-[3rem] resize-none overflow-y-scroll whitespace-pre-wrap\n                        \n                                        /* WebKit */\n                                        [&::-webkit-scrollbar]:w-2\n                                        [&::-webkit-scrollbar-track]:bg-transparent\n                                        [&::-webkit-scrollbar-thumb]:bg-[#676767]\n                                        [&::-webkit-scrollbar-thumb]:rounded-full\n                                        \n                                        /* Firefox */\n                                        [scrollbar-width:thin] \n                                        [scrollbar-color:#676767_transparent]\n                                        \n                                        "
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Consent,
      {
        checked,
        setChecked,
        setIsAnonymous,
        isAnonymous,
        setBtnNextBlocked
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]",
          type: "button",
          onClick: onBack,
          children: "Atrás"
        }
      ),
      /* @__PURE__ */ jsx(
        SubmitFormReview,
        {
          checked,
          writtenReviewInput,
          onNext,
          btnNextBlocked,
          setBtnNextBlocked,
          formData,
          doctorId,
          userName,
          doctorFName,
          doctorFullName
        }
      )
    ] }) })
  ] }) });
};

const Thanks = ({ doctorFName }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "text-center justify-center flex flex-col items-center pt-4",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-center p-2", children: "Gracias! Review registrada" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-blue-700 cursor-pointer",
            onClick: () => {
              const url = new URL(window.location);
              const fromPage = url.searchParams.get("from");
              if (fromPage) {
                window.location.href = fromPage;
              } else {
                window.location.href = "/";
              }
            },
            children: `Volver al perfil de ${doctorFName}`
          }
        )
      ]
    }
  ) });
};

const ReviewForm = ({ doctorId, doctorHC, doctorFName, doctorFullName, doctorDiseases }) => {
  const [step, setStep] = useState(1);
  const [userFname, setUserFname] = useState();
  const { user, loading, isAuthenticated } = useAuth();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const currentUrl = window.location.pathname + window.location.search;
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
    }
  }, [loading, isAuthenticated]);
  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const name = session?.user?.user_metadata?.full_name;
      setUserFname(name);
    };
    fetchUserName();
  }, []);
  const [formData, setFormData] = useState({
    healthcareCenterAppointment: "",
    appointmentReason: "",
    evaluationType: "",
    problemSolved: "",
    communication: "",
    attentionAndProfessionalism: "",
    knowledgeDomain: "",
    recommendationToFamily: "",
    continueOrNot: "",
    diseases: [],
    writtenReview: "",
    isAnonymous: false
  });
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        const currentUrl = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      }
    }, 3e3);
    return () => clearTimeout(timer);
  }, [user, loading]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ProgressBar,
      {
        step
      }
    ),
    /* @__PURE__ */ jsxs("form", { children: [
      step === 1 && /* @__PURE__ */ jsx(
        HealthcareCenterSelect,
        {
          doctorHC,
          doctorId,
          healthcareCenterSelected: formData.healthcareCenterAppointment,
          onChange: handleChange,
          onNext: handleNext
        }
      ),
      step === 2 && /* @__PURE__ */ jsx(
        DiseasesMultiSelect,
        {
          doctorDiseases,
          doctorDiseasesSelected: formData.diseases,
          onChange: handleChange,
          onBack: handleBack,
          onNext: handleNext
        }
      ),
      step === 3 && /* @__PURE__ */ jsx(
        ReasonSelect,
        {
          onChange: handleChange,
          appointmentReasonSelected: formData.appointmentReason,
          onBack: handleBack,
          onNext: handleNext
        }
      ),
      step === 4 && /* @__PURE__ */ jsx(
        EvaluationSelection,
        {
          appointmentReasonSelected: formData.appointmentReason,
          communicationSelected: formData.communication,
          attentionAndProfessionalismSelected: formData.attentionAndProfessionalism,
          knowledgeDomainSelected: formData.knowledgeDomain,
          recommendationToFamilySelected: formData.recommendationToFamily,
          evaluationTypeSelected: formData.evaluationType,
          problemSolvedSelected: formData.problemSolved,
          onChange: handleChange,
          onBack: handleBack,
          onNext: handleNext
        }
      ),
      step === 5 && /* @__PURE__ */ jsx(
        ContinueOrNot,
        {
          doctorFName,
          continueOrNotSelected: formData.continueOrNot,
          onChange: handleChange,
          onBack: handleBack,
          onNext: handleNext
        }
      ),
      step === 6 && /* @__PURE__ */ jsx(
        WrittenReview,
        {
          writtenReviewText: formData.writtenReview,
          onChange: handleChange,
          onBack: handleBack,
          onNext: handleNext,
          formData,
          doctorId,
          userFname,
          doctorFName,
          doctorFullName
        }
      ),
      step === 7 && /* @__PURE__ */ jsx(
        Thanks,
        {
          doctorFName
        }
      )
    ] })
  ] });
};

const ReviewAuthGuard = ({ children, fallbackUrl = "/login" }) => {
  const { user, loading } = useAuth();
  const [forceRender, setForceRender] = useState(0);
  const [directAuth, setDirectAuth] = useState({ user: null, loading: true });
  useEffect(() => {
    const directCheck = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        setDirectAuth({
          user: session?.user || null,
          loading: false
        });
      } catch (error) {
        setDirectAuth({ user: null, loading: false });
      }
    };
    const timeout = setTimeout(() => {
      if (loading) {
        directCheck();
      }
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [loading]);
  const finalUser = directAuth.loading === false ? directAuth.user : user;
  const finalLoading = directAuth.loading === false ? directAuth.loading : loading;
  useEffect(() => {
    setForceRender((prev) => prev + 1);
  }, [user, loading, directAuth, finalUser, finalLoading]);
  if (finalLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center min-h-32", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#000000", d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z", children: /* @__PURE__ */ jsx("animateTransform", { attributeName: "transform", dur: "0.75s", repeatCount: "indefinite", type: "rotate", values: "0 12 12;360 12 12" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-600", children: /* @__PURE__ */ jsx("p", { children: "Verificando autenticación..." }) })
    ] });
  }
  if (!finalUser) {
    const currentPath = window.location.pathname + window.location.search;
    const redirectUrl = `${fallbackUrl}?redirect=${encodeURIComponent(currentPath)}`;
    const isAlreadyRedirecting = sessionStorage.getItem("auth-redirecting");
    if (isAlreadyRedirecting) {
      window.location.replace("/search");
      return;
    }
    sessionStorage.setItem("auth-redirecting", "true");
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 300);
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-32", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: "Redirigiendo al login..." }),
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#000000", d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z", children: /* @__PURE__ */ jsx("animateTransform", { attributeName: "transform", dur: "0.75s", repeatCount: "indefinite", type: "rotate", values: "0 12 12;360 12 12" }) }) })
    ] }) });
  }
  return children;
};

const $$Astro = createAstro("https://findr.cl");
const $$Review = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Review;
  console.log("\u{1F50D} review.astro se est\xE1 renderizando");
  const url = new URL(Astro2.request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return Astro2.redirect("/404");
  }
  const { data: doctor_search_view_flat, error } = await supabase.from("doctor_search_view_flat").select("*").eq("id", id).single();
  if (error || !doctor_search_view_flat) {
    return Astro2.redirect("/404");
  }
  const doctorFName = doctor_search_view_flat.doctor_first_name;
  const doctorFullName = doctor_search_view_flat.full_name;
  const doctorPrivatePractice = doctor_search_view_flat.private_practice_addresses;
  const doctorHealthCareCenter = doctor_search_view_flat.healthcare_centers;
  const doctorHC = [...doctorHealthCareCenter, ...doctorPrivatePractice];
  const doctorDiseases = doctor_search_view_flat.diseases;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Review Form Page" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ReviewAuthGuard", ReviewAuthGuard, { "fallbackUrl": "/login", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/reviewForm/ReviewAuthGuard", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center"> <div class="flex flex-col items-center pt-2 pb-3"> <h1 class="p-2 text-lg"> ${doctorFullName} </h1> <h3 class="text-xs"> ${doctor_search_view_flat.sub_speciality_name} </h3> </div> ${renderComponent($$result3, "ReviewForm", ReviewForm, { "doctorId": id, "doctorHC": doctorHC, "doctorDiseases": doctorDiseases, "doctorFName": doctorFName, "doctorFullName": doctorFullName, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/reviewForm/ReviewForm", "client:component-export": "ReviewForm" })} </div> ` })} ` })}`;
}, "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/review.astro", void 0);

const $$file = "/Users/franciscozamoranovera/Downloads/findr_it-astro/src/pages/review.astro";
const $$url = "/review";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Review,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
