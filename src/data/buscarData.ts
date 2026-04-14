export const ESPECIALIDADES: Record<string, string> = {
    cardiologia: "Cardiología",
    ginecologia: "Ginecología y Obstetricia",
    neurologia: "Neurología",
    dermatologia: "Dermatología",
    traumatologia: "Traumatología",
    oftalmologia: "Oftalmología",
    pediatria: "Pediatría",
    psiquiatria: "Psiquiatría",
    urologia: "Urología",
    endocrinologia: "Endocrinología",
};

export const CIUDADES: Record<string, string> = {
    santiago: "Santiago",
    providencia: "Providencia",
    "las-condes": "Las Condes",
    nunoa: "Ñuñoa",
    vitacura: "Vitacura",
};

export function getBuscarPaths() {
    return Object.keys(ESPECIALIDADES).flatMap((especialidad) =>
        Object.keys(CIUDADES).map((ciudad) => ({
            params: { especialidad, ciudad },
        }))
    );
}
