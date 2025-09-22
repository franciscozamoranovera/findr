
import type { DoctorProfile } from "./doctorProfile";

export async function get() {
    // can replace this with the data fetching logic
    const datosBusqueda: DoctorProfile = {
        //Primary Filters
        title:"",
        region: "",
        comuna: "",
        speciality: "", // filtro por especialidad general (main menu) : Note
        subSpeciality:[],
        diseaseSpecialist:  [], // filtro "especialidad en" por deseases (aside) : Note
        doctorName:"",
        

        //Secondary Filters
        prevision: [],
        attentionType: [],
        background: "",
        healthCareCenter: [{
            name: ""
        }],
        specialityAndBackground: [],


        //Others
        calificacion: 0,
        tagCalificacion: [],
        profilePhoto: "",
        idNumber: 0,
        id: ""
    };

    return {
        props: {
            datosBusqueda,
        },
    };

}


