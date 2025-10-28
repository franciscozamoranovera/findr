import { useState } from "react";
import { supabase } from "@/components/api/supabase/supabase";


export const SubmitFormReview = ({ userName, doctorId, formData, writtenReviewInput, checked, onNext, btnNextBlocked, setBtnNextBlocked, doctorFullName }) => {
    const [isLoading, setIsLoading] = useState(false);


    // **PASO 2: Funciones para enviar emails**
    // Función para enviar email de confirmación cuando la reseña se envía exitosamente
    const sendConfirmationEmail = async (userEmail, userName, doctorFullName, reviewText) => {
        try {
            console.log('📧 Enviando email de confirmación...');

            const response = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/send-review-confirmation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    userName,
                    doctorFullName,
                    reviewText,
                    submissionDate: new Date().toLocaleString('es-ES')
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Email de confirmación enviado:', result.emailId);
            } else {
                console.error('❌ Error enviando email de confirmación:', await response.text());
            }
        } catch (error) {
            console.error('❌ Error en función de email:', error);
        }
    };

    // Función para enviar email de notificación cuando falla el envío
    const sendFailureEmail = async (userEmail, userName, doctorFullName, reviewText, errorMessage) => {
        try {
            console.log('📧 Enviando email de falla...');

            const response = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/send-failure-notification`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.PUBLIC_SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    userName,
                    doctorFullName,
                    reviewText,
                    errorMessage: errorMessage,
                    attemptCount: 1,
                    lastAttemptDate: new Date().toLocaleString('es-ES')
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Email de falla enviado:', result.emailId);
            } else {
                console.error('❌ Error enviando email de falla:', await response.text());
            }
        } catch (error) {
            console.error('❌ Error en función de email de falla:', error);
        }
    };


    const {
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

        setBtnNextBlocked(true)
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
            // **PASO 3A: Obtener datos del usuario**
            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError) throw userError;

            // **PASO 3B: Insertar reseña en base de datos**
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

            // **PASO 3C: Verificar si hubo error en la inserción**
            if (result.error) {
                throw result.error;
            }

            console.log('✅ Reseña guardada exitosamente:', result)

            // **PASO 3D: Enviar email de confirmación (no bloquea el flujo)**
            sendConfirmationEmail(
                user.email,
                userName || user.user_metadata?.full_name || 'Usuario',
                doctorFullName || 'Doctor',
                writtenReview
            );

            setTimeout(() => {
                setIsLoading(false)
                onNext()
            }, 300)

            return result;

        } catch (error) {
            console.error('❌ Error enviando reseña:', error)

            // **PASO 3E: Obtener datos para email de falla**
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    // **PASO 3F: Enviar email de falla (no bloquea el flujo)**
                    sendFailureEmail(
                        user.email,
                        userName || user.user_metadata?.full_name || 'Usuario',
                        doctorFullName || 'Doctor',
                        writtenReview,
                        error.message || 'Error desconocido'
                    );
                }
            } catch (emailError) {
                console.error('Error obteniendo user para email de falla:', emailError);
            }

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                    </div>

                ) : (
                    <span>Enviar</span>
                )}
            </button>
        </>
    )
}

