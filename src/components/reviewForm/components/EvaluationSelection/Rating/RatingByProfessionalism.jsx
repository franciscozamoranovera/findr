import { useState, useEffect } from "react"


export const RatingByProfessionalism = ({ onScrollToNext, attentionAndProfessionalismSelected, onChange }) => {

    /* COMmUNICATION ACCURACY SELECTION */
    const [professionalism, setProfessionalism] = useState(attentionAndProfessionalismSelected);


    /* MODAL */
    const [info, setInfo] = useState(false);

    const handleProfessionalismClick = (e) => {
        e.preventDefault();
        const value = e.target.value;
        
        
        setProfessionalism(professionalism === value ? "" : value)
    };
    
    useEffect(() => {
        onChange("attentionAndProfessionalism", professionalism)
        if (professionalism) onScrollToNext();

        /* TO FIX:
            marca undefined al presionar una segunda vez la "i"
        */

    }, [professionalism]);

    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {
        /* onChange toma y envía el valor de professionalism a formData.attentionAndProfessionalism > attentionAndProfessionalismSelected rescata el valor y lo asigna de nuevo cuando se vuelve atrás */
        if (attentionAndProfessionalismSelected != "") setProfessionalism(attentionAndProfessionalismSelected)

    }, [attentionAndProfessionalismSelected]);

    /* MODAL CONTROL */
    useEffect(() => {
        if (info) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [info]);

    return (
        
            <div className="flex flex-col items-center justify-center p-3">

                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="text-2xl text-center"
                        >
                            ¿La atención se sintió profesional?
                        </h1>

                    </div>
                    <div>
                        <p className="text-gray-400 text-center p-2"
                        >
                            ¿Fué claro y contundente o muy resumido, poco clarao?
                        </p>
                    </div>
                </div>

                <button
                    className={` ${professionalism === "Excepcional" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`}
                    type="button"
                    value="Excepcional"
                    onClick={handleProfessionalismClick}
                >

                    <div className="flex items-center pointer-events-none select-none">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${i !== 0 ? "-ml-2" : ""}`}
                                width="22"
                                height="22"
                                viewBox="0 0 576 512"
                                fill="currentColor"

                            >
                                <path d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 
                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5
                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                        ))}
                    </div>
                    <p
                        className="pointer-events-none select-none"
                    >
                        Excepcional
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        className="ml-6 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setInfo(true);
                        }}
                    >
                        <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                    </svg>

                </button>

                {/* INFO MODAL */}
                {info === true && (
                    <>
                        <div className="fixed inset-0 z-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>
                            <div className="relative bg-white rounded-3xl shadow-lg w-[280px] h-[350px] flex flex-col items-center justify-between">

                                <div className="flex-1 w-full overflow-y-auto px-2 py-4 scrollbar-hide">

                                    <h2 className="text-center text-gray-800 p-4">
                                        Atención y Profesionalismo Excepcional
                                    </h2>

                                    <ul className="text-center text-gray-800 font-light">
                                        <li className="p-3 m-1 text-start">
                                            "Una experiencia sobresaliente. No solo fue extremadamente profesional, sino que demostró verdadera preocupación por mi bienestar. Me hizo sentir que era su único paciente del día.
                                            Recordaba detalles de consultas anteriores.
                                            Su consultorio es un ejemplo de organización y profesionalismo".                                        
                                            </li>
                                        {/* <li className="p-3 m-1 text-start">
                                            "Verificó varias veces si había entendido todo correctamente"
                                        </li>
                                        <li className="p-3 m-1 text-start">
                                            "Me mostró modelos anatómicos para explicar mi condición"
                                        </li>
                                        <li className="p-3 m-1 text-start">
                                            "Me envió por email material adicional sobre mi diagnóstico"
                                        </li>
                                        <li className="p-3 m-1 text-start">
                                            "Incluso dibujó un cronograma personalizado para mi tratamiento"
                                        </li> */}
                                    </ul>

                                </div>
                                <div>
                                    <button
                                        className="text-white bg-[#2D2D2D] p-2 m-2 rounded-2xl"
                                        onClick={() => setInfo(false)}
                                    >
                                        Entendido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>


                )}

                <button
                    className={` ${professionalism === "Muy buena" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`}
                    type="button"
                    value="Muy buena"
                    onClick={handleProfessionalismClick}
                >
                    <div className="flex items-center pointer-events-none select-none">
                        {[...Array(4)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${i !== 0 ? "-ml-2" : ""}`}
                                width="22"
                                height="22"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 
                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5
                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                        ))}
                    </div>
                    <p
                        className="pointer-events-none select-none"
                    >
                        Muy buena

                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        className="ml-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se propague al button
                            // Aquí abrir MODAL
                            console.log('SVG clickeado - abrir modal');
                        }}
                    >
                        <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                    </svg>

                </button>
                <button
                    className={` ${professionalism === "Cumple" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`}
                    type="button"
                    value="Cumple"
                    onClick={handleProfessionalismClick}
                >
                    <div className="flex items-center justify-center pointer-events-none select-none">
                        {[...Array(3)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${i !== 0 ? "-ml-2" : ""}`}
                                width="22"
                                height="22"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 
                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5
                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                        ))}
                    </div>

                    <p
                        className=" ml-2 pointer-events-none select-none"
                    >
                        Cumple
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        className="ml-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se propague al button
                            // Aquí abrir MODAL
                            console.log('SVG clickeado - abrir modal');
                        }}
                    >
                        <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                    </svg>

                </button>
                <button
                    className={` ${professionalism === "Deficiente" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex flex-row items-center justify-between`}
                    type="button"
                    value="Deficiente"
                    onClick={handleProfessionalismClick}
                >
                    <div className="flex items-center pointer-events-none select-none">
                        {[...Array(2)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${i !== 0 ? "-ml-2" : ""}`}
                                width="22"
                                height="22"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 
                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5
                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                        ))}
                    </div>
                    <p
                        className="ml-5 pointer-events-none select-none"
                    >
                        Deficiente
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        className="ml-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se propague al button
                            // Aquí abrir MODAL
                            console.log('SVG clickeado - abrir modal');
                        }}
                    >
                        <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                    </svg>

                </button>
                <button
                    className={` ${professionalism === "Pésima" ? "text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex flex-row items-center justify-between`}
                    type="button"
                    value="Pésima"
                    onClick={handleProfessionalismClick}
                >

                    <div className="flex pointer-events-none select-none">
                        {[...Array(1)].map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${i !== 0 ? "-ml-2" : ""}`}
                                width="22"
                                height="22"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 
                                3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5
                                c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 
                                l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                                150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                        ))}
                    </div>
                    <p className="ml-7 pointer-events-none select-none">
                        Pésima
                    </p>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        className="ml-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que se propague al button
                            // Aquí abrir MODAL
                            console.log('SVG clickeado - abrir modal');
                        }}
                    >
                        <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                    </svg>

                </button>

            </div>
        
    )
}

