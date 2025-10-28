import { useState, useEffect } from "react";



export const HealthcareCenterSelect = ({ doctorHC, onNext, onChange, healthcareCenterSelected }) => {

    const [healthcareCenterList, setHealthcareCenterList] = useState(healthcareCenterSelected);

    const [btnNextBlocked, setBtnNextBlocked] = useState(true);

    const handleOnClick = (e) => {

        e.preventDefault();
        const value = e.target.value;

        setHealthcareCenterList(healthcareCenterList === value ? "" : value);


        setBtnNextBlocked(false);
    }



    /* Capture and send the value to the form (father) */
    useEffect(() => {
        onChange("healthcareCenterAppointment", healthcareCenterList);

        if (healthcareCenterList === "") setBtnNextBlocked(true);


    }, [healthcareCenterList, setBtnNextBlocked]);


    /* Keep selection when go back */
    useEffect(() => {

        if (healthcareCenterSelected !== "") setHealthcareCenterList(healthcareCenterSelected);
        if (healthcareCenterSelected) setBtnNextBlocked(false);


    }, [setHealthcareCenterList, healthcareCenterSelected]);



    return (

        <>
            <div className="flex flex-col items-center justify-center p-3">
                <div>
                    <h1 className="text-2xl">¿Dónde fue la visita?</h1>
                </div>

                <div className="p-3">

                    {
                        doctorHC.map((hCenter, i) => (

                            <button
                                className={` ${hCenter === healthcareCenterList ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full transition-colors m-2`}
                                onClick={handleOnClick}
                                type="button"
                                value={hCenter}
                                key={i}


                            >
                                {hCenter}
                            </button>

                        ))
                    }

                    <div className="fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20">

                        <button
                            className="rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                //Go back to doc profile
                                window.history.back();

                            }}
                        >
                            Salir
                        </button>

                        <button
                            className={` ${healthcareCenterList !== "" ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
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

