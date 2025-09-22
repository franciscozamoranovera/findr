import { useState, useEffect } from "react"


export const ReasonSelect = ({ onNext, onBack, onChange, appointmentReasonSelected }) => {

    const [appointmentReason, setAppointmentReason] = useState(appointmentReasonSelected);

    const [btnNextBlocked, setBtnNextBlocked] = useState(true);


    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setAppointmentReason(appointmentReason === value ? "" : value);
        
        setBtnNextBlocked(false);
        
    }
    
    useEffect(() => {
        
        onChange("appointmentReason", appointmentReason);
        if (appointmentReason === "") setBtnNextBlocked(true);


    }, [appointmentReason, setBtnNextBlocked])

    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {

        if (appointmentReasonSelected !== "") setAppointmentReason(appointmentReasonSelected);
        if (appointmentReasonSelected) setBtnNextBlocked(false);


    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center p-3">
                <div>
                    <h1 className="text-2xl text-center"
                    >
                        ¿Cuál fue el motivo de tu visita?
                    </h1>
                </div>
                <div>
                    <p className="text-gray-400 text-center p-2"
                    >
                        ¿Es tu primera vez, visita de seguimiento o la visita final?
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-3">
                    <button
                        className={` ${appointmentReason === "Primera Consulta" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`}
                        type="button"
                        value="Primera Consulta"
                        onClick={handleOnClick}

                    >
                        Primera Consulta
                    </button>
                    <button
                        className={` ${appointmentReason === "Consulta de Seguimiento" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`}
                        type="button"
                        value="Consulta de Seguimiento"
                        onClick={handleOnClick}
                    >
                        Consulta de Seguimiento
                    </button>
                    <button
                        className={` ${appointmentReason === "Resolvió mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full  transition-colors m-2`}
                        type="button"
                        value="Resolvió mi problema"
                        onClick={handleOnClick}
                    >
                        Resolvió mi problema
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
                            className={` ${appointmentReason !== "" ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
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
