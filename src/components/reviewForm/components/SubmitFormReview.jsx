import { supabase } from "@/components/api/supabase/supabase";


export const SubmitFormReview = ({ formData, writtenReviewInput, checked, onNext, btnNextBlocked }) => {

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
        diseases
    } = formData;


    const handleSubmit = async () => {

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
                user_email: user.email

            })
            console.log('RESULT', result)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>

            <button
                className={` ${writtenReviewInput && checked ? "bg-[#0063F7] text-white" : "bg-[#EFEFEF] text-[#D9D9D9]"} rounded-full w-[100px] h-[50px]`}
                type="button"
                //onSubmit={}
                onClick={() => { handleSubmit(); onNext(); }}

                disabled={btnNextBlocked}
            >
                Enviar
            </button>
        </>
    )
}

