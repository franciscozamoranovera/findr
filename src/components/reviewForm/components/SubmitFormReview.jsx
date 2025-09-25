import { useState } from "react";
import { supabase } from "@/components/api/supabase/supabase";


export const SubmitFormReview = ({ userName, formData, writtenReviewInput, checked, onNext, btnNextBlocked }) => {
    const [isLoading, setIsLoading] = useState(false);

    /* TODO:
        1. debería agregar un spinner al botón de enviar..., si status:201, continuar, si no, intentar nuevamente (quizá sin internet, etc)
    */


    const {

        doctorId,
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

        setIsLoading(true)

        // Actualizar nombre si existe
        if (userName) {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    full_name: userName
                }
            })

            if (error) {
                console.error('Error actualizando nombre:', error)
            } else {
                console.log('✅ Nombre actualizado:', data.user.user_metadata.full_name)
            }
        }

        try {

            const { data: { user }, error } = await supabase.auth.getUser()
            const result = await supabase.from('reviews').insert({

                user_id: user.id,
                doctor_id: doctorId,
                written_review: writtenReview,
                appointment_reason: appointmentReason,
                attention_and_professionalism: attentionAndProfessionalism,
                comunication: communication,
                continue_or_not: continueOrNot,
                diseases: diseases,
                evaluation_type: evaluationType,
                healthcare_center_appointment: healthcareCenterAppointment,
                knowledge_domain: knowledgeDomain,
                problem_solved: problemSolved,
                recommendation_to_family: recommendationToFamily,
                user_email: user.email,
                is_anonymous: isAnonymous

            })
            console.log('RESULT', result)

            setTimeout(() => {
                setIsLoading(false)
                onNext()
            }, 300)

            return result;

        } catch (error) {
            console.error(error)
            setIsLoading(false)
            return { error }
        }


    }

    return (
        <>

            <button
                className={` ${writtenReviewInput && checked ? "bg-[#0063F7] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
                type="button"
                onClick={() => { handleSubmit() }}

                disabled={btnNextBlocked}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                ) : (
                    <span>Enviar</span>
                )}
            </button>
        </>
    )
}

