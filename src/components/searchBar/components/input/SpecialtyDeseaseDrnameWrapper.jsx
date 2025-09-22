import { useState, useEffect } from "react";
import { supabase } from "@/components/api/supabase/supabase";


export const SpecialtyDeseaseDrnameWrapper = ({ inputValue, onValueSelected }) => {


    /* ESTADO QUE MANEJA DR DATABASE (all) */
    const [doctorsData, setDoctorsData] = useState([]); //inputValue (prop) se compara con estos states..


    /* ESTADO QUE MANEJA FILTRO Y REND. AL MISMO TIEMPO */
    const [filterWrapper, setFilterWrapper] = useState([]);
    /* Note
        1. filterWrapper => Va en el <button></button> para autocomplete.
        2. setFilterWrapper => recibe el valor filtrado (aplicanda la lógica)
    */

    const getSDDData = async () => {


        const getDrnames = await supabase.from("doctor_fullname_view").select('*');
        const doctorsNames = Object.values(getDrnames)[1].map(doc => doc.full_name);

        const getSpeciality = await supabase.from("speciality").select(`speciality_name`);
        const speciality = Object.values(getSpeciality)[1].map(spe => spe.speciality_name);

        const getSubSpeciality = await supabase.from("sub_speciality").select(`sub_speciality_name`);
        const subSpeciality = Object.values(getSubSpeciality)[1].map(subSpe => subSpe.sub_speciality_name);

        const getDiseases = await supabase.from("diseases").select(`disease_name`);
        const diseases = Object.values(getDiseases)[1].map(dic => dic.disease_name);


        const imputData = [
            ...doctorsNames,
            ...speciality,
            ...subSpeciality,
            ...diseases
        ]

        return imputData;

    }




    /* LOAD DR DATA to "doctorsData", nothing else. */
    useEffect(() => {

        const loadData = async () => {
            const doctorData = await getSDDData();
            /* Receive the Dr Database */
            setDoctorsData(doctorData);
        }

        loadData();

    }, []) //si [] = vacío, se ejecuta 1 vez

    /* MANAGE WRAPPER FILTER */
    useEffect(() => {

        removeAutocomplete();

        /* FILTER DATA  */
        if (inputValue.length === 0) return;

        let filteredSpeciality = [];

        doctorsData.forEach(data => {

            if (normalizarTexto(data).includes(normalizarTexto(inputValue))) {
                filteredSpeciality.push(data)
            }

        });

        setFilterWrapper(filteredSpeciality);

    }, [inputValue, doctorsData]) //si [algo] = le dice a react que debe usarse de nuevo (re-render) escuchando esas dependencias.


    /* HELPERS */

    /* Flows up the selected value to parent component */
    const onClickValue = (e) => {
        e.preventDefault();

        const value = e.target.innerText;

        if (onValueSelected) onValueSelected(value);
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

                <li key={data} className=" border-b border-[#434343c5] bg-[rgba(41,41,41,0.95)] hover:bg-[rgba(41,41,41,0.791)]">
                    <button
                        onClick={onClickValue}
                        className="w-full text-left p-2 text-white cursor-pointer border-0 bg-transparent"
                    >
                        {data}
                    </button>
                </li>

            ))}
        </>
    )

}
