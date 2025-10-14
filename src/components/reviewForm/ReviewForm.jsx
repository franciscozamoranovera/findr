import { useState, useEffect } from "react";
import { useAuth } from "../api/supabase/AuthProvider";
import { supabase } from "../api/supabase/supabase";

import { DiseasesMultiSelect } from "./components/DiseasesMultiSelect"
import { HealthcareCenterSelect } from "./components/HealthcareCenterSelect";
import { ReasonSelect } from "./components/ReasonSelect";
import { EvaluationSelection } from "./components/EvaluationSelection/EvaluationSelection";
import { ProgressBar } from "./buttons/progressBar/ProgressBar";
import { ContinueOrNot } from "./components/ContinueOrNot";
import { WrittenReview } from "./components/WrittenReview";
import { Thanks } from "./components/Thanks";


export const ReviewForm = ({ doctorId, doctorHC, doctorFName, doctorFullName ,doctorDiseases }) => {

    const [step, setStep] = useState(1);
    const [userFname, setUserFname] = useState()
    const { user, loading, isAuthenticated } = useAuth();

    // Protección híbrida cliente-side (Opción B)
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            console.log('❌ ReviewForm: Usuario no autenticado, redirigiendo...');
            const currentUrl = window.location.pathname + window.location.search;
            window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
        }
    }, [loading, isAuthenticated]);

    //USERNAME
    useEffect(() => {
        const fetchUserName = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const name = session?.user?.user_metadata?.full_name;
            setUserFname(name);
        };

        fetchUserName();

    }, [])


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
    })



    const handleNext = () => setStep(prev => prev + 1) //prev es una función de flecha abreviada. setStep recibe como parámetro esta función.
    const handleBack = () => setStep(prev => prev - 1)

    const handleChange = (field, value) => {

        /* onChange le pasa el valor valueUpdated (formData) */
        setFormData(prev => ({ ...prev, [field]: value }))

        console.log('formData', formData) /* formData iría en el handleSubmit del form */

    }

    // Solución temporal: Solo protección básica sin AuthProvider
    // TODO: Arreglar AuthProvider después

    // Si no hay user después de 3 segundos, asumir no autenticado
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user && !loading) {
                console.log('❌ ReviewForm: Timeout - redirigiendo a login');
                const currentUrl = window.location.pathname + window.location.search;
                window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [user, loading]);

    // Mostrar formulario si hay indicios de autenticación o mientras carga
    // TODO: Restaurar protección completa cuando AuthProvider funcione

    return (
        <>
            <ProgressBar
                step={step}
            />

            <form>
                {step === 1 && (

                    <HealthcareCenterSelect
                        doctorHC={doctorHC}
                        doctorId={doctorId}

                        healthcareCenterSelected={formData.healthcareCenterAppointment}

                        onChange={handleChange}

                        onNext={handleNext}
                    />
                )}
                {step === 2 && (

                    <DiseasesMultiSelect
                        doctorDiseases={doctorDiseases}

                        doctorDiseasesSelected={formData.diseases}
                        onChange={handleChange}

                        onBack={handleBack}
                        onNext={handleNext}
                    />

                )}
                {step === 3 && (

                    <ReasonSelect
                        onChange={handleChange}
                        appointmentReasonSelected={formData.appointmentReason}

                        onBack={handleBack}
                        onNext={handleNext}
                    />
                )}
                {step === 4 && (

                    <EvaluationSelection

                        appointmentReasonSelected={formData.appointmentReason}
                        communicationSelected={formData.communication}
                        attentionAndProfessionalismSelected={formData.attentionAndProfessionalism}
                        knowledgeDomainSelected={formData.knowledgeDomain}
                        recommendationToFamilySelected={formData.recommendationToFamily}

                        evaluationTypeSelected={formData.evaluationType}
                        problemSolvedSelected={formData.problemSolved}

                        onChange={handleChange}

                        onBack={handleBack}
                        onNext={handleNext}
                    />
                )}
                {step === 5 && (

                    <ContinueOrNot

                        doctorFName={doctorFName}
                        continueOrNotSelected={formData.continueOrNot}

                        onChange={handleChange}

                        onBack={handleBack}
                        onNext={handleNext}
                    />
                )}
                {step === 6 && (

                    <WrittenReview
                        writtenReviewText={formData.writtenReview}
                        onChange={handleChange}

                        onBack={handleBack}
                        onNext={handleNext}

                        formData={formData}

                        doctorId={doctorId}
                        userFname={userFname}
                        doctorFName={doctorFName}
                        doctorFullName={doctorFullName}
                    />
                )}
                {step === 7 && (
                    <Thanks
                        doctorFName={doctorFName}

                    />
                )}
            </form>
        </>
    )
}

