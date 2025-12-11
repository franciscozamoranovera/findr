import { supabase } from "./supabase"

/* DR REVIEW DATA, IN PROFILE PAGE */
export const fetchDrReviews = async (doctorId, nextPage) => {

    const { data: reviews, error } = await supabase
        .from("reviews_overall_rating")
        .select("diseases, written_review, created_at, is_anonymous, user_email, appointment_reason, promedio_general")
        .eq("doctor_id", doctorId)
        .order('created_at', { ascending: false })
        .range(nextPage.fromPage, nextPage.toPage)


    if (error) {
        console.error('Error fetching reviews:', error)
        throw error
    }

    return reviews;

}

/* DR PROFILE DATA */
export const fetchDrProfile = async (doctorId) => {

    const { data: profileData, error } = await supabase
        .from("doctor_search_view_flat")
        .select("doctor_first_name, full_name, speciality_name, sub_speciality_name, diseases, previsiones, about, background,total_reviews, promedio_general, promedio_atencion, promedio_comunicacion, promedio_continuidad, promedio_conocimiento, promedio_recomendacion, healthcare_centers, private_practice_addresses, healthcare_center_url")
        .eq("id", doctorId)
        .single();


    if (error) {
        console.error('Error fetching reviews:', error)
        throw error
    }

    console.log('PROFILE DATA', profileData)
    return profileData;

}

/* SEARCH RESULTS DATA COMPONENT */
export const fetchSearchResultsData = async (params) => {

    const { region, comuna, SDDsearch, attentionType, healthcareCenter, prevision, diseaseSelection } = params;

    try {

        let query = supabase.from("doctor_search_view_flat").select('*')

        /* PRIMARY FILTERS */
        if (region) { query = query.ilike('region', `%${region}%`) }
        if (comuna) { query = query.ilike('comuna', `%${comuna}%`) }
        if (SDDsearch) { query = query.or(`full_name.ilike.%${SDDsearch}%,speciality_name.ilike.%${SDDsearch}%,sub_speciality_name.ilike.%${SDDsearch}%,diseases_text.ilike.%${SDDsearch}%`) }
        if (prevision.length) { query = query.overlaps('previsiones', prevision) }


        /* SECONDARY FILTERS */
        if (attentionType.length) { query = query.overlaps('attention_types', attentionType) }
        if (healthcareCenter.length) { query = query.overlaps('healthcare_centers', healthcareCenter) }

        if (diseaseSelection.length) { query = query.contains('diseases', diseaseSelection) }


        const { data, error } = await query;
        if (error) throw error;
        if (!data) return;

        /* 
        Note: if (!data) return;

        La línea if (!data) return; es una validación defensiva que verifica si la variable data existe antes de continuar con el resto del código.
        ¿Por qué es importante?
        Evita errores si la consulta a la base de datos falla y retorna null o undefined
        Previene que el código intente acceder a propiedades de data (como data.length) cuando data no existe
        Es una práctica común en JavaScript para manejar casos edge de forma segura
        En este contexto específico:
        Después de hacer la consulta a Supabase (const { data, error } = await query;), esta validación asegura que solo se procese el código siguiente si data contiene resultados válidos, evitando errores en las comparaciones data.length === 0 y data.length > 0.
        
        */


        if (data.length === 0) {

            const message = "Sin resultados para tu búsqueda";

            return message

        }

        /* Send data */
        return data


    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }

};