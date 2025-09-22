
export const DiseaseSelectionContainer = ({ diseasesList, setDiseaseList }) => {


    /* Recordatorio */
    /* diseasesList, setDiseaseList 
        1. ambos prop vienen del componente input, se crean alla, se eliminan de acá y actualizan allá 
    
    */

 
    /* HELPERS */

    const removeDiseaseButton = (e) => {
        e.preventDefault();

        /* remueve al hacer click en boton */
        const value = e.target.value;
        const index = diseasesList.indexOf(value);
        const removeDiseaseBySelection = diseasesList.filter((_, i) => i !== index);

        /* actualiza la lista y devuelve el valor al input */
        setDiseaseList(removeDiseaseBySelection)


        // El guion bajo (_) es un nombre de variable comúnmente usado en JavaScript (y otros lenguajes) para indicar que ese parámetro no se va a usar.
        // Por ejemplo, en `.filter((_, i) => i !== index)`, el primer argumento de la función de filtro representa el elemento del array, pero como no lo necesitas, se usa `_` para dejar claro que es intencionalmente ignorado.
        // Es una convención para mejorar la legibilidad del código.
    }


    return (
        <>
            {/* 
                1. Container almacena selección multiple, hace que se deseleccione al clickear también
                    H: 
                        1. (R: NO, porque habrá que esperar a dar "buscar" para que se vea)...usar searchParams para conseguir el valor
                        2. Usar "selectedValue de handleValueSel..." del comp. input
                2. Debe enviar señal al wrapper para que se deseleccione el elegido
                3. Desde el wrapper enviar señal al container para que desaparezca.
                4. Modificar este filtro en SUPABASE.
            */}

            {
                diseasesList.map(disease => (
                    <button
                        className=" m-1 p-2 text-white bg-blue-600 rounded-lg"
                        key={disease}
                        value={disease}
                        onClick={removeDiseaseButton}
                    >
                        {disease}
                    </button>
                ))
            }

        </>
    )
}

