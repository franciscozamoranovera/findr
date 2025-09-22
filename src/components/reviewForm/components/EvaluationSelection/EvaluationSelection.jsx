import { useState, useEffect, useRef } from "react";
import { RatingByCommunication } from "./Rating/RatingByCommunication";
import { RatingByProfessionalism } from "./Rating/RatingByProfessionalism";
import { RatingByKnoledge } from "./Rating/RatingByKnowledge";
import { RatingByRecommendation } from "./Rating/RatingByRecommendation";


/* TODO:
    1.[X]- Rules if:
        a. [] - "Mi Primera Consulta" -> "mi primera consulta" / "no continuaré" 
            i. TODO: Entregar respuesta desde pag anterior, según eso desplegar opciones.
    2.[X]- states for evaluation, type of reason ("revisión de examenes", etc)
    3.[X] - borrar datos cuando vuelvas atrás al momento de evaluar por rating...
    4.[SI]- Si le doy a consulta seguimiento, luego marco las opciones, vuelvo y le doy a primera consula,
        debería resetear los valores puestos para la evaluación ? (comunicación, dom conocimientos, etc?)
    5.[]- make the reason 3 view
 */

export const EvaluationSelection = ({ appointmentReasonSelected, evaluationTypeSelected, communicationSelected, attentionAndProfessionalismSelected, knowledgeDomainSelected, recommendationToFamilySelected, onChange, onBack, onNext }) => {

    const [reason, setReason] = useState();
    const [btnNextBlocked, setBtnNextBlocked] = useState(true);

    /* IF CONSULTA SEGUIMIENTO */
    const [reasonSelection, setReasonSelection] = useState("");
    
    /* IF RESOLVIÓ MI PROBLEMA */
    const [problemSolvedOption, setProblemSolvedOption] = useState("");

    const [addClass, setAddClass] = useState()

    /* REF CONTROL ON CLICK (SELECT)*/
    const child0Ref = useRef(null);
    const child1Ref = useRef(null);
    const child2Ref = useRef(null);
    const child3Ref = useRef(null);
    const child4Ref = useRef(null);

    const onScrollToNext = () => scrollToChild1()

    const scrollToChild0 = () => {
        child0Ref.current?.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToChild1 = () => {
        child1Ref.current?.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToChild2 = () => {
        child2Ref.current?.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToChild3 = () => {
        child3Ref.current?.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToChild4 = () => {
        child4Ref.current?.scrollIntoView({ behavior: "smooth" });
    }



    /* CONTROL BUTTON SELECTION */
    const handleOnClick = (e) => {
        e.preventDefault();

        const value = e.target.value;


        const newReasonSelection = reasonSelection === value ? "" : value;
        setReasonSelection(newReasonSelection);
        onChange("evaluationType", newReasonSelection);

        const newProblemSolved = problemSolvedOption === value ? "" : value;
        setProblemSolvedOption(newProblemSolved);
        onChange("problemSolved", newProblemSolved);


        onScrollToNext(scrollToChild1);
    }

    /* BUTTON CONDITIONALS FOR REASON SELECTION */
    useEffect(() => {

        /* Primera Consulta */
        /* primer acercamiento, si fue malo, elíge "no continuaré" */
        if (appointmentReasonSelected === 'Primera Consulta') {

            setReason(1)

            setAddClass(`${appointmentReasonSelected !== ""
                && communicationSelected !== ""
                && attentionAndProfessionalismSelected !== ""
                && knowledgeDomainSelected !== ""
                && recommendationToFamilySelected !== "" ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`)

            setBtnNextBlocked(true);
        };


        /* Consulta Seguimiento */
        /* rev examenes, rev. seguimiento tratameinto  */
        if (appointmentReasonSelected === 'Consulta de Seguimiento') {

            setReason(2)/* , setBtnNextBlocked(false); */

            setAddClass(`${reasonSelection
                && appointmentReasonSelected
                && communicationSelected
                && attentionAndProfessionalismSelected
                && knowledgeDomainSelected
                && recommendationToFamilySelected ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`)


            setBtnNextBlocked(true);
        }


        /* Cierre Tratamiento Consulta */
        /* si tratamiento concluyó con éxito  */
        if (appointmentReasonSelected === 'Resolvió mi problema') {

            setReason(3)
            
            setAddClass(`${problemSolvedOption
                && appointmentReasonSelected
                && communicationSelected
                && attentionAndProfessionalismSelected
                && knowledgeDomainSelected
                && recommendationToFamilySelected ? "bg-[#2D2D2D] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`)


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
        setBtnNextBlocked,

    ]);


    useEffect(() => {

        if (reason === 1 &&
            appointmentReasonSelected
            && communicationSelected
            && attentionAndProfessionalismSelected
            && knowledgeDomainSelected
            && recommendationToFamilySelected
        ) {
            setBtnNextBlocked(false);
        }

        if (reason === 2
            && reasonSelection
            && appointmentReasonSelected
            && communicationSelected
            && attentionAndProfessionalismSelected
            && knowledgeDomainSelected
            && recommendationToFamilySelected
        ) {
            setBtnNextBlocked(false);
        }

        if (reason === 3
            && problemSolvedOption
            && appointmentReasonSelected
            && communicationSelected
            && attentionAndProfessionalismSelected
            && knowledgeDomainSelected
            && recommendationToFamilySelected
        ) {
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
    ])



    useEffect(() => {
        if (reasonSelection === "") scrollToChild0();
        if (problemSolvedOption === "") scrollToChild0();

    }, [reasonSelection, problemSolvedOption, scrollToChild0, setBtnNextBlocked])




    return (

        <>
            {/* <div className="flex flex-col items-center justify-center"> */}

            {reason === 1 && (
                <div className="flex flex-col items-center justify-center p-2">
                    <div>
                        <h1 className="text-2xl text-center"
                        >
                            Según tu <span className="text-red-500">Primera consulta</span>, evaluemos...
                        </h1>

                    </div>
                    <div>
                        <p className="text-gray-400 text-center p-2"
                        >
                            Elige una opción
                        </p>
                    </div>

                    <RatingByCommunication
                        onScrollToNext={scrollToChild2}
                        communicationSelected={communicationSelected}
                        onChange={onChange}
                    />

                    <div ref={child2Ref}>
                        <RatingByProfessionalism
                            onScrollToNext={scrollToChild3}
                            attentionAndProfessionalismSelected={attentionAndProfessionalismSelected}
                            onChange={onChange}
                        />
                    </div>

                    <div ref={child3Ref}>
                        <RatingByKnoledge
                            onScrollToNext={scrollToChild4}
                            knowledgeDomainSelected={knowledgeDomainSelected}
                            onChange={onChange}

                        />
                    </div >

                    <div ref={child4Ref}>
                        <RatingByRecommendation
                            recommendationToFamilySelected={recommendationToFamilySelected}
                            onChange={onChange}

                        />
                    </div>
                </div>
            )}


            {reason === 2 && (
                <div
                    className="pb-32 flex flex-col items-center justify-center p-2"

                    ref={child0Ref}
                >
                    <div>
                        <h1 className="text-2xl text-center"
                        >
                            De mi <span className="text-red-500">Consulta de Seguimiento</span>, quiero evaluar
                        </h1>
                    </div>
                    <div>
                        <p className="text-gray-400 flex flex-col items-center justify-center"
                        >
                            Elige una opción
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center p-3"
                    >
                        <button
                            className={` ${reasonSelection === "Revisión de exámenes" ? " text-white bg-[#2D2D2D]" : "bg-white"} w-[280px] px-6 py-3 rounded-full transition-colors m-2`}
                            type="button"
                            value="Revisión de exámenes"
                            onClick={handleOnClick}
                        >
                            Revisión de exámenes
                        </button>
                        <button
                            className={` ${reasonSelection === "Avances en mi tratamiento" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="Avances en mi tratamiento"
                            onClick={handleOnClick}
                        >
                            Avances en mi tratamiento
                        </button>
                        <button
                            className={` ${reasonSelection === "No tuve avances en mi tratamiento" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="No tuve avances en mi tratamiento"
                            onClick={handleOnClick}
                        >
                            No tuve avances en mi tratamiento
                        </button>
                        <button
                            className={` ${reasonSelection === "Resolvió mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="Resolvió mi problema"
                            onClick={handleOnClick}
                        >
                            Resolvió mi problema
                        </button>
                        <button
                            className={` ${reasonSelection === "Resolvió parcialmente mi problema" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="Resolvió parcialmente mi problema"
                            onClick={handleOnClick}
                        >
                            Resolvió parcialmente mi problema
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3">
                        <div className="flex flex-col items-center justify-center p-2">
                            <h1 className="text-2xl"
                            >
                                Evaluemos...
                            </h1>

                        </div>
                        <div>
                            <p className="text-gray-400 text-center p-2"
                            >
                                Elige una opción
                            </p>
                        </div>
                        <div ref={child1Ref}>
                            <RatingByCommunication
                                onScrollToNext={scrollToChild2}
                                communicationSelected={communicationSelected}
                                onChange={onChange}
                            />
                        </div>

                        <div ref={child2Ref}>
                            <RatingByProfessionalism
                                onScrollToNext={scrollToChild3}
                                attentionAndProfessionalismSelected={attentionAndProfessionalismSelected}
                                onChange={onChange}
                            />
                        </div>

                        <div ref={child3Ref}>
                            <RatingByKnoledge
                                onScrollToNext={scrollToChild4}
                                knowledgeDomainSelected={knowledgeDomainSelected}
                                onChange={onChange}

                            />
                        </div >

                        <div ref={child4Ref}>
                            <RatingByRecommendation
                                recommendationToFamilySelected={recommendationToFamilySelected}
                                onChange={onChange}

                            />
                        </div>
                    </div>

                </div>
            )}



            {reason === 3 && (
                <div
                    className="flex flex-col items-center justify-center p-2"
                    ref={child0Ref}
                >

                    <div>
                        <h1 className="text-2xl text-center"
                        >
                            ¡Espectacular, <br></br> 
                            <span className="text-red-500"> Se ha resuelto tu problema!</span> 
                            <br></br>
                            Según lo anterior dirías que fue...
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
                            className={` ${reasonSelection === "Mi primera consulta" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="Mi primera consulta"
                            onClick={handleOnClick}
                        >
                            Resuelto completamente
                        </button>
                        <button
                            className={` ${reasonSelection === "No continuaré" ? " text-white bg-[#2D2D2D]" : "bg-white"} px-6 py-3 rounded-full  transition-colors m-2`}
                            type="button"
                            value="No continuaré"
                            onClick={handleOnClick}
                        >
                            Resuelto parcialmente
                        </button>

                    </div>
                    <div className="flex flex-col items-center justify-center p-3">
                        <div className="flex flex-col items-center justify-center p-2">
                            <h1 className="text-3xl"
                            >
                                Evalúa tu experiencia
                            </h1>

                        </div>
                        <div>
                            <p className="text-gray-400 text-center p-2"
                            >
                                Cómo calificarías según lo sieguiente
                            </p>
                        </div>
                        <div ref={child1Ref}>
                            <RatingByCommunication
                                onScrollToNext={scrollToChild2}
                                communicationSelected={communicationSelected}
                                onChange={onChange}
                            />
                        </div>

                        <div ref={child2Ref}>
                            <RatingByProfessionalism
                                onScrollToNext={scrollToChild3}
                                attentionAndProfessionalismSelected={attentionAndProfessionalismSelected}
                                onChange={onChange}
                            />
                        </div>

                        <div ref={child3Ref}>
                            <RatingByKnoledge
                                onScrollToNext={scrollToChild4}
                                knowledgeDomainSelected={knowledgeDomainSelected}
                                onChange={onChange}

                            />
                        </div >

                        <div ref={child4Ref}>
                            <RatingByRecommendation
                                recommendationToFamilySelected={recommendationToFamilySelected}
                                onChange={onChange}

                            />
                        </div>
                    </div>
                </div>




            )}

            {/* </div> */}

            <div>
                <div className="fixed bottom-0 left-0 w-full  bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20">
                    <button
                        className="rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]"
                        type="button"
                        onClick={onBack}
                    >
                        Atrás
                    </button>

                    <button
                        className={addClass}
                        type="button"
                        onClick={onNext}
                        disabled={btnNextBlocked}

                    >
                        Siguiente
                    </button>

                </div>

            </div>


        </>

    )
}

