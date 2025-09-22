import { useState, useEffect } from "react"


export const ContinueOrNot = ({ continueOrNotSelected, doctorFName, onChange, onNext, onBack }) => {

    const [continueWith, setContinueWith] = useState(continueOrNotSelected);

    const [btnNextBlocked, setBtnNextBlocked] = useState(true);


    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;
        /* revisar esto. */

    
        setContinueWith(continueWith === value ? "" : value);
        
        
        if(value) setBtnNextBlocked(false);

    }

    /* SEND DATA TO  */
    useEffect(() => {

        onChange("continueOrNot", continueWith);
        if (continueWith === "") setBtnNextBlocked(true);


    }, [continueWith]);

    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {

        if (continueOrNotSelected !== "") setContinueWith(continueOrNotSelected);
        if (continueOrNotSelected) setBtnNextBlocked(false);


   }, [setContinueWith, continueOrNotSelected, setBtnNextBlocked]);

    return (
        <>
            <div className="flex flex-col items-center justify-center p-3">
                
                <div>
                    <h1 className="text-2xl text-center"
                    >
                        Según tu experiencia, <br/> ¿continuarías visitando a <span className="underline">{doctorFName}</span>?
                    </h1>
                </div>
                <div>
                    <p className="text-gray-400 text-center p-2"
                    >
                        Elige una opción
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-3">
                    <button
                        className={` ${continueWith === "true" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`}
                        type="button"
                        value="true"
                        onClick={handleOnClick}
                    >
                        Sí, continuaré atendiendome
                    </button>
                    <button
                        className={` ${continueWith === "false" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`}
                        type="button"
                        value="false"
                        onClick={handleOnClick}
                    >
                        No, buscaré otra opción
                    </button>
                </div>

                <div>
                    <div className="fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20">

                        <button
                            className="rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]"
                            type="button"
                            onClick={onBack}
                        >
                            Atrás
                        </button>

                        <button
                            className={` ${continueWith !== "" ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
                            type="button"
                            onClick={onNext}
                            disabled={btnNextBlocked}

                        >
                            Siguiente
                        </button>

                    </div>
                </div>


            </div>

        </>
    )
}

