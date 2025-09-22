import { useState, useEffect } from "react";
import { supabase } from "@/components/api/supabase/supabase";

export const DiseaseSelectionWrapper = ({ diseaseSelectionValue, onValueSelected, setDiseaseSelection }) => {

    /* ESTADO QUE MANEJA DR DATABASE (all) */
    const [diseaseSelectionData, setDiseaseSelectionData] = useState([]);

    /* ESTADO QUE MANEJA FILTRO Y REND. AL MISMO TIEMPO */
    const [filterWrapper, setFilterWrapper] = useState([]);

    /* ESTADO QUE MANEJA SELECCIÓN MULTIPLE (COLOREA EL DATO SELECCIONADO, SI SELECCIONA NUEVAMENTE LO ELIMINA) */
    const [isSelected, setIsSelected] = useState(false);


    const getDiseaseNames = async () => {
        const getDiseases = await supabase.from("diseases").select(`disease_name`);
        const diseases = Object.values(getDiseases)[1].map(diseases => diseases.disease_name);

        return diseases;
    }

    useEffect(() => {
        const loadData = async () => {
            const diseaseData = await getDiseaseNames();
            setDiseaseSelectionData(diseaseData)
        }

        loadData()

    }, []) //si [] = vacío, se ejecuta 1 vez


    /* MANAGE WRAPPER FILTER */
    useEffect(() => {
        removeAutocomplete();

        /* FILTER DATA */
        if (diseaseSelectionValue.length === 0) return;

        let filteredDiseases = [];

        diseaseSelectionData.forEach(data => {

            if (normalizarTexto(data).includes(normalizarTexto(diseaseSelectionValue))) {
                filteredDiseases.push(data)
            }
        });

        setFilterWrapper(filteredDiseases)

    }, [diseaseSelectionValue, diseaseSelectionData]); //si [algo] = le dice a react que debe usarse de nuevo (re-render) escuchando esas dependencias.



    /* HELPERS */
    /* Flows up the selected value to parent component */
    const onClickValue = (e) => {
        e.preventDefault();

        const value = e.target.innerText;

        if (onValueSelected) {
            
            onValueSelected(value)

            /* Limpia input  */
            setDiseaseSelection("");
            
            setIsSelected(true) /* NO FUNCIONA PORQUE SE GENERA DE NUEVO EL WRAPPER POSIBLEMENTE */
        };
    }

    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function removeAutocomplete() {
        setFilterWrapper([])
    }

   

    return (
        <>
            {filterWrapper.map(data => (

                <li key={data} className="border-b border-[#434343c5] bg-[rgba(41,41,41,0.95)] hover:bg-[rgba(41,41,41,0.791)]">
                    <button
                        onClick={onClickValue}
                        className={`${isSelected ? 'bg-blue-500' : 'bg-[rgba(41,41,41,0.95)'} w-full text-left p-2 text-white cursor-pointer border-0 bg-transparent`}
                    >
                        {data}
                    </button>
                </li>

            ))}
        </>
    )
}

