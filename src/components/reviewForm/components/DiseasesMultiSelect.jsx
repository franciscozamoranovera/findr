import { useState, useEffect } from "react";



export const DiseasesMultiSelect = ({ doctorDiseases, doctorDiseasesSelected, onChange, onNext, onBack }) => {


    const [diseasesSelected, setDiseasesSelected] = useState(doctorDiseasesSelected);

    const [btnNextBlocked, setBtnNextBlocked] = useState(true);



    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;


        // Usar el estado previo para agregar o quitar el valor seleccionado
        setDiseasesSelected(prevSelected => {

            //prevSelected: Func de flecha que recibe el estado actual como argumento. Esta es una forma "funcional" de usar el estado en react
            if (prevSelected.includes(value)) {
                // Si ya está seleccionado, lo quitamos:
                return prevSelected.filter(item => item !== value);

            } else {
                // Si no está seleccionado, lo agregamos a la cola:
                setBtnNextBlocked(false)
                return [...prevSelected, value];
            }


        });



    }

    useEffect(() => {

        onChange("diseases", diseasesSelected);
        if (diseasesSelected.length === 0) setBtnNextBlocked(true);


    }, [setBtnNextBlocked, diseasesSelected])

    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {
            
        setDiseasesSelected(doctorDiseasesSelected);
        if (doctorDiseasesSelected.length > 0) setBtnNextBlocked(false);


    }, [setBtnNextBlocked, setDiseasesSelected])


    return (
        <div className="flex flex-col items-center justify-center p-4">

            <div>
                <h1 className="text-2xl"
                >
                    ¿Qué patologías?
                </h1>
            </div>
            <div>
                <p className="text-gray-400 text-center p-2"
                >
                    Elige las patolgías por las que fuiste a la consulta
                </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-center p-1">

                {
                    doctorDiseases.map(
                        (diseaseList) => (
                            <button
                                onClick={handleOnClick}
                                key={diseaseList}
                                type="button"
                                value={diseaseList}
                                className={` ${diseasesSelected.includes(diseaseList) ? "text-white bg-[#2D2D2D]" : "bg-white"}  px-6 py-3 rounded-full transition-colors`}
                            >
                                {diseaseList}
                            </button>
                        )
                    )
                }


                <button
                    onClick={handleOnClick}
                    type="button"
                    value="Consulta General"
                    className={` ${diseasesSelected.includes("Consulta General") ? "bg-[#2D2D2D] text-white" : "bg-white "}  px-6 py-3 rounded-full  transition-colors`}
                >
                    Consulta General
                </button>

                <button
                    onClick={handleOnClick}
                    type="button"
                    value="Otro"
                    className={` ${diseasesSelected.includes("Otro") ? "bg-[#2D2D2D] text-white" : "bg-white "}  px-6 py-3 rounded-full  transition-colors`}
                >
                    Otro
                </button>
            </div>


            <div>
                <div className="fixed bottom-0 left-0 w-full z-50 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20">

                    <button
                        className="rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]"
                        type="button"
                        onClick={onBack}

                    >
                        Atrás
                    </button>

                    <button
                        className={` ${diseasesSelected.length > 0 ? "bg-[#2D2D2D] text-white" : " bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
                        type="button"
                        onClick={onNext}
                        disabled={btnNextBlocked}

                    >
                        Siguiente
                    </button>

                </div>
            </div>


        </div>


    )
}

