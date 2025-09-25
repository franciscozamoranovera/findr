import { useState, useEffect } from "react"


export const RatingByRecommendation = ({ recommendationToFamilySelected, onChange }) => {

    /* COMUNICATION ACCURACY SELECTION */
    const [recommendation, setRecommendation] = useState(recommendationToFamilySelected);

    /* MODAL STATE*/
    const [info, setInfo] = useState(false);

    const handleRecommendationClick = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setRecommendation(recommendation === value ? "" : value);

    }

    useEffect(() => {
        onChange("recommendationToFamily", recommendation);
    }, [recommendation]);

    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {
        if (recommendationToFamilySelected != "") setRecommendation(recommendationToFamilySelected)

    }, [recommendationToFamilySelected, setRecommendation]);

    /* MODAL CONTROL */
    useEffect(() => {
        if (info) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [info]);

    return (

        <div className="flex flex-col items-center justify-center p-3 pb-52">

            <div className="flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-2xl text-center"
                    >
                        ¿Recomendarías un familiar?
                    </h1>

                </div>
                <div>
                    <p className="text-gray-400 text-center p-2"
                    >
                        ¿Lo recomendarías a tus padres?
                    </p>
                </div>
            </div>
            <button
                className={` ${recommendation === "Sí" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2 flex relative items-center`}
                type="button"
                value="Sí"
                onClick={handleRecommendationClick}
            >

                <p
                    className="flex-1 ml-3 text-center pointer-events-none select-none"
                >
                    Sí
                </p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    className="ml-auto"
                    onClick={() => setInfo(true)}
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
                                    Si Recomiendo a un Familiar
                                </h2>

                                <ul className="text-center text-gray-800 font-light">
                                    <li className="p-3 m-1 text-start">
                                        "Me explicó todo de manera extraordinariamente clara, usando analogías y ejemplos"
                                    </li>
                                    <li className="p-3 m-1 text-start">
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
                                    </li>
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
                className={` ${recommendation === "No" ? " text-white bg-[#2D2D2D]" : "bg-white"}  w-[280px] px-6 py-3 rounded-full  transition-colors m-2 flex relative items-center`}
                type="button"
                value="No"
                onClick={handleRecommendationClick}
            >
                <p
                    className="flex-1 ml-3 pointer-events-none select-none"
                >
                    No

                </p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    className="ml-auto"
                /* onClick = abrir MODAL */
                >
                    <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                </svg>

            </button>
            <button
                className={` ${recommendation === "No estoy seguro/a" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px]  px-6 py-3 rounded-full  transition-colors m-2 flex relative items-center`}
                type="button"
                value="No estoy seguro/a"
                onClick={handleRecommendationClick}
            >
                <p
                    className="flex-1 ml-3 pointer-events-none select-none"
                >
                    No estoy seguro/a
                </p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    className="ml-auto"
                /* onClick = abrir MODAL */
                >
                    <path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533c.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598c-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081l.082-.381l2.29-.287zM8 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                </svg>

            </button>



        </div>
    )
}

