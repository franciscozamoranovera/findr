/* COMPONENT OBJECTIVES:
    1. Display the results using the route as input.
*/

/* IDEAS TO IMPROVE THE COMPONENT:
    1. ..
*/

import { useSearchParams, Link } from 'react-router-dom';

import { fetchSearchResultsData } from "../api/supabase/fetchFunctions";
import { useQuery } from "@tanstack/react-query";


export const SearchResults = () => {

  const [searchParams] = useSearchParams();


  // HANDLE URL
  const SDDsearch = searchParams.get("SDDsearch") || "";
  const region = searchParams.get("region") || "";
  const comuna = searchParams.get("comuna") || "";
  const prevision = searchParams.get("prevision")?.split(',') || [];
  const attentionType = searchParams.get("attentiontype")?.split(',') || [];
  const healthcareCenter = searchParams.get("healthcareCenter")?.split(',') || [];
  const diseaseSelection = searchParams.get("diseaseSelection")?.split(',') || [];

  const currentSearchUrl = window.location.href;

  const postQuery = useQuery({
    queryKey: ["searchResults", { search: SDDsearch, region, comuna, prevision, attentionType, healthcareCenter, diseaseSelection }],
    queryFn: () => fetchSearchResultsData({ SDDsearch, region, comuna, prevision, attentionType, healthcareCenter, diseaseSelection }),
    staleTime: 1000 * 60 * 6,
    //gcTime: 1000 * 60 * 30, (persistencia en memoria por 30 min)
  })


  /* Errors before using the data (tanstack) */

  if (postQuery.isError) {

    if (postQuery.error.message.includes("fetch")) {

      return <div className="text-red-600 p-8 text-center items-center flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#2d2d2d"><g fill="#2d2d2d"><path d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137c0-4.6 4.923-7.935 9.264-4.323L9.81 8.204a.75.75 0 0 0 .253.906l2.833 2.024l-2.466 2.878a.75.75 0 0 0 .039 1.018l1.7 1.7l-.91 3.64c-.756-.253-1.516-.843-2.298-1.46c-.277-.218-.564-.438-.856-.663Z" /><path d="M12.812 20.345c.732-.265 1.469-.837 2.226-1.434c.277-.219.564-.44.856-.664C18.702 16.083 22 13.542 22 9.137c0-4.515-4.741-7.81-9.02-4.518l-1.553 3.622l3.009 2.149a.75.75 0 0 1 .133 1.098l-2.548 2.973l1.51 1.509a.75.75 0 0 1 .197.712l-.916 3.663Z" /></g></svg>
        <h2 className="text-xl">¡Error al cargar los resultados, verifica tu conexión a internet!</h2>
      </div>

    } else {
      return <div className="text-red-600 p-8 text-center items-center flex flex-col justify-center">
        {postQuery.error.message}
      </div>
    }
  }

  /* SEARCH RESULTS DATA */
  const searchResultsData = postQuery.data;


  return (
    <div>
      {/* Pinterest-style Masonry Grid */}

      <div className="w-full">
        {/* Mensaje de no resultados */}

        {searchResultsData.length === 0 && (
          <div className="text-center text-gray-400 py-6">"Sin resultados para tu búsqueda</div>
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
          {searchResultsData.map((r) => (
            <div
              key={r.id}
              className="mb-4 break-inside-avoid"
            >
              <Link
                to={`/doctor/${r.id}?from=${encodeURIComponent(currentSearchUrl)}`}

                className="block bg-[#262626] rounded-2xl p-4 transition-all duration-200 border-4 border-transparent hover:border-blue-600 shadow-lg w-full"
                style={{ color: "#fff", minHeight: "320px" }}
              >
                <div className="font-bold text-lg mb-2">{r.full_name}</div>
                <div className="text-blue-300">{r.speciality_name}</div>
                {/* Puedes agregar más info aquí para que las tarjetas tengan alturas variables */}
              </Link>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

