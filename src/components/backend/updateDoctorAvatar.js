import { supabaseServer } from "./supabaseServer.js"

export async function updateDoctorAvatar({
    doctorId,
    publicUrl
}) {

    console.log('Doctor ID:', doctorId)
    console.log('Public URL:', publicUrl)

    const { error } = await supabaseServer
        .from('doctor_profile')
        .update({
            profile_photo: publicUrl
        })
        .eq('id', doctorId)
        .select() //Agrego esto para ver qué se actualizó


    if (error) {
        console.error("Supabase error:", error)
        throw new Error("Failed to update doctor avatar")
    }


    return true
}