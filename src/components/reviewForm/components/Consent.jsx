import { useState, useEffect } from "react";


/* TODO:
    1. OK - casilla cerificación
    2. pop up "saber más" 
    3. texto con links a "politicas de privacidad" y "término de condiciones"
    4. OK - casilla de verificación debe habilitar el BTN publicar también
*/


export const Consent = ({ checked, setChecked, setBtnNextBlocked }) => {


    const [openModal, setOpenModal] = useState(false);

    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;
        /* !checked */
        setChecked(!checked); /* !checked, alterna valor booleano */

        setBtnNextBlocked(true);
    };



    return (
        <>
            <div className="pb-16">

                <div className="flex flex-col items-center justify-center p-2">
                    <div className="flex flex-col-2 gap-1">
                        <button
                            className=" text-[#2D2D2D] bg-[#ffffff] text-sm border border-[#2D2D2D] rounded-full px-4 py-2 transition-colors"
                            /* className={`${checked === true ? " text-white bg-[#2D2D2D]" : " text-[#2D2D2D] bg-[#ffffff]"} text-sm border border-[#2D2D2D] rounded-full px-4 py-2 transition-colors`}
                            onClick={handleOnClick}
                            value={checked} */
                        >
                            Anónimo
                        </button>
                        <button
                            className={`${checked === true ? " text-white bg-[#2D2D2D]" : " text-[#2D2D2D] bg-[#ffffff]"} border border-[#2D2D2D] rounded-full px-4 py-2 transition-colors`}
                            onClick={handleOnClick}
                            value={checked}
                        >
                            Acepto Consentimiento
                        </button>
                    </div>

                    <p className="text-center w-[20rem] p-2">
                        Al aceptar el consentimiento, aceptas el uso de datos personales para añadir tu opinión sobre un especialista.
                    </p>
                    <button
                        className="underline text-blue-700 cursor-pointer"
                        value="Ver Concentimiento"
                    //onClick={}
                    >
                        Ver Concentimiento
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-2">
                    <button
                        className="text-white bg-[#2D2D2D] rounded-full px-6 py-3 transition-colors"
                        value="Políticas de Privacidad"
                    //onClick={}
                    >
                        Políticas de Privacidad
                    </button>
                    <button
                        className="text-white bg-[#2D2D2D] rounded-full px-6 py-3 transition-colors"
                        value="Términos y Condiciones"
                    //onClick={}
                    >
                        Términos y Condiciones
                    </button>
                </div>
            </div>
        </>
    )
}
