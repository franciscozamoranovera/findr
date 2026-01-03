/* COMPONENT OBJECTIVES:
    1. Display the results using the route as input.
*/

/* IDEAS TO IMPROVE THE COMPONENT:
    1. ..
*/

import { useSearchParams, Link } from 'react-router-dom';
import { fetchSearchResultsData } from "../api/supabase/fetchFunctions";
import { useQuery } from "@tanstack/react-query";
import ReviewButton from '../reviewForm/buttons/progressBar/ReviewButton';
import ReviewAuthGuard from '../reviewForm/ReviewAuthGuard';
import AuthReviewButton from '../reviewForm/buttons/progressBar/AuthReviewButton';



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


  /* MANAGE ERRORS AND LOADING */
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

  /*  */
  if (postQuery.isLoading) return <div className="text-black p-8 text-center items-center flex flex-col justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
    <p >
      Cargando resultados...
    </p>
  </div>



  /* SEARCH RESULTS DATA */
  const searchResultsData = postQuery.data;


  /* HELPERS */
  const toString = (num) => {
    const count = num.toString();

    if (count === "0.0") return 0;

    if (!count.includes(".")) {
      return count + ".0";
    } else return count;
  };


  return (
    <>
      {/* Pinterest-style Masonry Grid */}

      {/* Mensaje de no resultados */}
      {searchResultsData === "Sin resultados para tu búsqueda" ? (
        <div className="text-center text-gray-400 py-6">"Sin resultados para tu búsqueda</div>
      ) : (
        <>
          {/* Masonry grid */}
          < div
            className="
              columns-1
              sm:columns-2
              md:columns-3
              lg:columns-4 

              gap-4

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
                  className="block bg-white rounded-[30px] p-1.5 transition-all duration-200 border-4 border-transparent hover:border-blue-600  w-full"
                  style={{ color: "#fff", minHeight: "420px" }}
                >
                  {/* Card Info */}
                  <div className='border-[5px] border-none w-full h-full flex flex-col'>

                    {/* Photo profile */}
                    <div className='flex-1 overflow-hidden'>
                      <img
                        className='rounded-[25px] w-full h-full object-cover'
                        src='/img/profile-photo-example.png'
                      />
                    </div>

                    {/* Summary info */}
                    <div className='flex-1 flex flex-col justify-center p-2'>
                      <div className="mb-2 items-center justify-center">
                        <h1 className='text-xl text-black'>{r.full_name}</h1>
                        <p className='text-sm text-blue-600'>{r.speciality_name}</p>
                        <p className='text-black text-sm pt-1'>{r.healthcare_centers[0]}</p>
                      </div>


                      {/* Reviews, Ratings and Prevision */}
                      {
                        r.total_reviews === 0 ? (
                          <>
                            <div className='flex flex-col justify-center items-center pt-2'>
                              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="#2d2d2d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 2.5V3c0 2.828 0 4.243.879 5.121C14.757 9 16.172 9 19 9h.5m.5 1.657V14c0 3.771 0 5.657-1.172 6.828S15.771 22 12 22s-5.657 0-6.828-1.172S4 17.771 4 14V9.456c0-3.245 0-4.868.886-5.967a4 4 0 0 1 .603-.603C6.59 2 8.211 2 11.456 2c.705 0 1.058 0 1.381.114q.1.036.197.082c.31.148.559.397 1.058.896l4.736 4.736c.579.578.867.868 1.02 1.235c.152.368.152.776.152 1.594" /></svg>
                              <p className='text-black font-semibold text-sm p-1'>Sin reseñas</p>
                            </div>

                            {/*  <button
                              className='bg-[#2D2D2D] relative rounded-[25px] mt-3 p-2 hover:bg-blue-600'
                            >
                              <div className='absolute inset-0 opacity-0 mb-5'>
                                <AuthReviewButton client:load drId={r.id} />
                              </div>
                              <p>Escribe una reseña</p>
                            </button> */}
                          </>

                        )
                          : (
                            <>
                              < div className='grid grid-cols-3 items-center justify-center gap-1'>
                                <div className='flex items-center justify-center gap-1'>
                                  <div className='flex flex-col items-center justify-center gap-1'>
                                    <div className='flex items-center justify-center'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M12.865 2.996a1 1 0 0 0-1.73 0L8.421 7.674a1.25 1.25 0 0 1-.894.608L2.44 9.05c-.854.13-1.154 1.208-.488 1.76l3.789 3.138c.35.291.515.75.43 1.197L5.18 20.35a1 1 0 0 0 1.448 1.072l4.79-2.522a1.25 1.25 0 0 1 1.164 0l4.79 2.522a1 1 0 0 0 1.448-1.072l-.991-5.205a1.25 1.25 0 0 1 .43-1.197l3.79-3.139c.665-.55.365-1.63-.49-1.759l-5.085-.768a1.25 1.25 0 0 1-.895-.608l-2.714-4.678Z" /></svg>
                                      <p className='text-black font-medium text-lg '>{toString(r.promedio_general)}</p>
                                    </div>
                                    <p className='text-gray-500 font-medium text-sm'>Calificación</p>
                                  </div>
                                </div>

                                {/* <svg className='' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="none" stroke="#2d2d2d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21V3" /></svg> */}

                                <div className='flex flex-col items-center justify-center gap-1'>
                                  <p className='text-black font-medium text-lg'>{r.total_reviews}</p>
                                  <p className='text-gray-500 font-medium text-sm'>Reseñas</p>
                                </div>

                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="none" stroke="#2d2d2d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21V3" /></svg> */}

                                <div className='flex flex-col items-center justify-center gap-1'>
                                  {r.previsiones ? (
                                    r.previsiones.map((prev) => (
                                      <p className='text-black font-medium text-sm'>{prev}</p>
                                    ))
                                  ) : (
                                    ''
                                  )}
                                  {/* <p className='text-gray-500 font-medium text-sm'>Previsiones</p> */}
                                </div>
                              </div>
                            </>
                          )}

                    </div>

                    <button
                      className='bg-[#2D2D2D] rounded-[25px] mt-2 p-2 hover:bg-blue-600'
                    >
                      <div className='opacity-0 absolute'>
                        <AuthReviewButton client:load drId={r.id} />
                      </div>
                      <div className='flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#ffffff"><g fill="#ffffff"><path fill-rule="evenodd" d="M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /><path d="m11.52 14.929l5.917-5.917a8.232 8.232 0 0 1-2.661-1.787a8.232 8.232 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891Zm7.559-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7.003 7.003 0 0 0 18.37 8.08l.71-.71Z" /></g></svg>
                        <p className='ml-2'>Escribe una reseña</p>
                      </div>
                    </button>

                  </div>
                </Link>
              </div>
            ))}
          </div >
        </>
      )}
    </>
  );
}

