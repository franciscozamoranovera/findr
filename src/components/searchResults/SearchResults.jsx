/* COMPONENT OBJECTIVES:
    1. Display the results using the route as input.
*/

/* IDEAS TO IMPROVE THE COMPONENT:
    1. ..
*/


import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { supabase } from "@/components/api/supabase/supabase";



export const SearchResults = () => {

  const [searchParams] = useSearchParams();

  // HANDLE FILTER RESULTS
  const [results, setResults] = useState([]);

  const [noResults, setNoResults] = useState([]);

  // HANDLE URL
  const SDDsearch = searchParams.get("SDDsearch") || "";
  const region = searchParams.get("region") || "";
  const comuna = searchParams.get("comuna") || "";
  const prevision = searchParams.get("prevision")?.split(',') || [];
  const attentionType = searchParams.get("attentiontype")?.split(',') || [];
  const healthcareCenter = searchParams.get("healthcareCenter")?.split(',') || [];
  const diseaseSelection = searchParams.get("diseaseSelection")?.split(',') || [];




  useEffect(() => {

    const fetchData = async () => {

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


          setNoResults(message)

        } else if (data.length > 0) {

          setNoResults([]);

        }

        /* Send data */
        setResults(data)


      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(`Failed to fetch data: ${error.message}`);
      }

    };

    fetchData();

  }, [SDDsearch,
    region,
    comuna,
    prevision.join(','),
    attentionType.join(','),
    healthcareCenter.join(','),
    diseaseSelection.join(',')]);


  return (
    <div>
      {/* Pinterest-style Masonry Grid */}

      <div className="w-full">
        {/* Mensaje de no resultados */}

        {noResults && (
          <div className="text-center text-gray-400 py-6">{noResults}</div>
        )}


        {/* Masonry grid */}
        <div
          className="
            columns-1
            sm:columns-2
            md:columns-3
            lg:columns-4
            gap-4
            w-full
            max-w-7xl
            mx-auto
            mt-4
          "
        >
          {results.map((r) => (
            <div
              key={r.id}
              className="mb-4 break-inside-avoid"
            >
              <a
                href={`/${r.id}`}
                className="block bg-[#262626] rounded-2xl p-4 transition-all duration-200 border-4 border-transparent hover:border-blue-600 shadow-lg w-full"
                style={{ color: "#fff", minHeight: "320px" }}
              >
                <div className="font-bold text-lg mb-2">{r.full_name}</div>
                <div className="text-blue-300">{r.speciality_name}</div>
                {/* Puedes agregar más info aquí para que las tarjetas tengan alturas variables */}
              </a>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

