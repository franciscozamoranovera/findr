export interface DoctorProfile {
    speciality: string;
    subSpeciality: string[];
    diseaseSpecialist: string[];
    prevision: string[];
    attentionType: string[];
    background: string;
    specialityAndBackground: string[];
    region: string;
    comuna: string;
    title: string;
    calificacion: number;
    tagCalificacion: string[]
    profilePhoto: string;
    doctorName: string;
    idNumber: number;
    id: string;
    healthCareCenter: [{
        name: string
    }]
}