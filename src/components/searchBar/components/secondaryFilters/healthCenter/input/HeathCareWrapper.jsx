import { useState, useEffect } from "react";
import { supabase } from "@/components/api/supabase/supabase";

export const HeathcareCenterWrapper = ({ healthcareCenterValue, healthcareCenterValueSelected }) => {

  /* ESTADO QUE MANEJA DR DATABASE (all) */
  const [healthcareCenterData, setHealthcareCenterData] = useState([]);

  /* ESTADO QUE MANEJA FILTRO Y REND. AL MISMO TIEMPO */
  const [filterWrapper, setFilterWrapper] = useState([]);


  const getHealthCareCentersNames = async () => {
    const getHealthCareCenterNames = await supabase.from("healthcare_center").select(`healthcare_center_name`);
    const healthcareCenter = Object.values(getHealthCareCenterNames)[1].map(healthcareCenter => healthcareCenter.healthcare_center_name);

    return healthcareCenter;
  }

  useEffect(() => {
    const loadData = async () => {
      const healthcareCentersData = await getHealthCareCentersNames();
      setHealthcareCenterData(healthcareCentersData);
    }

    loadData()

  }, []) //si [] = vacío, se ejecuta 1 vez

  /* MANAGE WRAPPER FILTER */
  useEffect(() => {
    removeAutocomplete();

    /* FILTER DATA */
    if (healthcareCenterValue.length === 0) return;

    let filteredHealthcareCenter = [];

    healthcareCenterData.forEach(data => {

      if (normalizarTexto(data).includes(normalizarTexto(healthcareCenterValue))) {
        filteredHealthcareCenter.push(data)
      };

    })

    setFilterWrapper(filteredHealthcareCenter)

  }, [healthcareCenterValue, healthcareCenterData])

  /* HELPERS */
  const onClickValue = (e) => {
    e.preventDefault();

    const value = e.target.innerText;

    if (healthcareCenterValueSelected) {
      healthcareCenterValueSelected(value);
    }
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

