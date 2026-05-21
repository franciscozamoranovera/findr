
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchDrProfile, fetchDrReviews } from '../api/supabase/fetchFunctions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { DrReviews } from "../doctorReviews/DrReviews";
import AuthReviewButton from "@/components/reviewForm/buttons/progressBar/AuthReviewButton";
import { GetBackButton } from '../reviewForm/buttons/GetBackButton';



export const DoctorProfile = () => {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    /* REVIEW DATA */
    const postReviewQuery = useInfiniteQuery({ // useInfiniteQuery puede hacer multiples llamadas, maneja cache
        queryKey: ["reviews", "infinite", id], //infinite (puede ser otro nombre) ayuda como id para identificar cache y no confundir con otras que digan "review" (data vs data.pages)
        queryFn: ({ pageParam }) => fetchDrReviews(id, pageParam), //pageParam controla paginación
        initialPageParam: 0, //comienza en 0
        getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length : undefined,
        staleTime: 1000 * 60,

    })


    /* DATA FETCHING : Pasar a un hook personalizado, ej.: */
    const postQuery = useQuery({
        queryKey: ["drProfile", id], /* id from useParams */
        queryFn: () => fetchDrProfile(id), /* fetch dr profile data from supabase, tanstack */
        staleTime: 1000 * 60 * 6, //1 min stale time (fresh)

    })

    const doctorData = postQuery.data;


    console.log('HAS NEXT PAGE', postReviewQuery.hasNextPage)



    /* STATES TO HANDLE RATINGS */
    const [ratings, setRatings] = useState({

        overall: '0.0',
        continuationRating: '0.0',
        comunicationRating: '0.0',
        knowledgeDomainRating: '0.0',
        attentionRating: '0.0',
        recomendationRating: '0.0'

    })

    const [toPercentage, setToPercentage] = useState({

        continuationRating: '0.0',
        comunicationRating: '0.0',
        knowledgeDomainRating: '0.0',
        attentionRating: '0.0',
        recomendationRating: '0.0'

    })



    /* BREADCRUMBS */
    const breadcrumbs = searchParams.get('from');

    let sddSearch = null;
    let region = null;
    let comuna = null;
    let prevision = null;

    if (breadcrumbs) {
        try {
            const fromUrl = new URL(decodeURIComponent(breadcrumbs));
            const fromParams = new URLSearchParams(fromUrl.search);

            sddSearch = fromParams.get('SDDsearch');
            prevision = fromParams.get('prevision');
            region = fromParams.get('region');
            comuna = fromParams.get('comuna');

        } catch (error) {
            console.error('Error parsing breadcrumbs URL: ', error);
        }
    }


    /* DOCUMENT TITLE */
    useEffect(() => {
        if (doctorData?.full_name) {
            document.title = `${doctorData.full_name} | findr`;
        }


    }, [doctorData]);



    useEffect(() => {

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        if (doctorData) {

            const toString = (num) => {
                const count = num.toString();

                if (count === "0.0") return 0;

                if (!count.includes(".")) {
                    return count + ".0";
                } else return count;
            };

            //Convert rating to % for bars
            const toPercentaje = (num) => {
                const conversion = num * 20 + "%";
                return conversion;
            };

            setRatings({
                overall: toString(doctorData.promedio_general),
                continuationRating: toString(doctorData.promedio_continuidad),
                comunicationRating: toString(doctorData.promedio_comunicacion),
                knowledgeDomainRating: toString(doctorData.promedio_conocimiento),
                attentionRating: toString(doctorData.promedio_atencion),
                recomendationRating: toString(doctorData.promedio_recomendacion),

            });

            setToPercentage({
                continuationRating: toPercentaje(doctorData.promedio_continuidad),
                comunicationRating: toPercentaje(doctorData.promedio_comunicacion),
                knowledgeDomainRating: toPercentaje(doctorData.promedio_conocimiento),
                attentionRating: toPercentaje(doctorData.promedio_atencion),
                recomendationRating: toPercentaje(doctorData.promedio_recomendacion)
            })

        }


        setLoading(false);

    }, [doctorData])

    // TODO 
    /* 
        HAY QUE MEJORAR EL MATCH THE "CARGANDO" Y "DOCTOR NOT FOUND"
    
    */

    if (postQuery.isLoading) return <div className="text-black p-8 text-center items-center flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
        <p >
            Cargando perfil...
        </p>
    </div>

    if (postQuery.error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

    //TODO: debe ejecutarse si hay después de cargar no hay nada...
    if (!doctorData) return <div className="text-black p-8">¡Doctor no encontrado!</div>;


    return (
        <div className=''>
            {/* Breadcrumbs */}
            <div className="p-2">

                <div className="flex-col hidden sm:block">
                    {region ? (<p className='text-[#adadad]  text-sm'>/{region}</p>) : (<p></p>)}
                    {comuna ? (<p className='text-[#adadad] text-sm'>/{comuna}</p>) : (<p></p>)}
                    {sddSearch ? (<p className='text-[#adadad] text-sm'>/{sddSearch}</p>) : (<p></p>)}
                    {prevision ? (<p className='text-[#adadad] text-sm'>/{prevision}</p>) : (<p></p>)}
                </div>

                {/* Doctor Summary Info */}
                <div className='text-center pt-10'>
                    <div className='items-center'>
                        <p className='text-3xl pb-2'>
                            {doctorData?.gender === 1 ? (
                                <span>👨🏻‍⚕️</span>
                            ) : (
                                <span>🧑🏻‍⚕️</span>
                                
                            )}
                        </p>
                    </div>
                    <h1 className="text-black text-3xl pb-1">{doctorData.full_name}</h1>
                    <h2 className="text-black font-light text-md">{doctorData.speciality_name}</h2>
                    {doctorData.sub_speciality_name && (
                        <h3 className="text-black pt-1 text-xl font-semi-bold">{doctorData.sub_speciality_name}</h3>
                    )}
                </div>


                {/* ------------------- Doctor Rating  -- TOP 5 TO 20 PERCENT ------------------- */}
                <div className='hidden'>
                    <div className='grid grid-cols-[1fr_135px_1fr] mb-[25px] mt-[25px]'>
                        <div className="left-laurel-branch flex justify-end">
                            <img
                                className='h-[150px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'
                                src="/img/doctor-profile/left-laurel-findr-it-rating.png"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <h1 className='text-8xl'>{ratings.overall}</h1>
                        </div>
                        <div className="right-laurel-branch flex justify-start">
                            <img
                                className='h-[150px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'
                                src="/img/doctor-profile/right-laurel-findr-it-rating.png"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        {/* Region rating description - TOP 5 TO 20 PERCENT */}
                        <div className='text-center sm:w-2/3 xl:w-2/3'>
                            <p className='text-xl'>Favorito entre Cardiólogos en la Región
                                Metropolitana</p>
                        </div>

                        {/* Healthcare Center rating description - TOP 5 TO 20 PERCENT */}
                        <div className='text-center sm:w-2/3 xl:w-2/3'>
                            <p className='text-xl'><strong>{doctorData.doctor_first_name}</strong> está dentro del 20%
                                de los cardiólogos mejor valorados en <strong>{doctorData.healthcare_centers}</strong></p>
                        </div>
                    </div>
                </div>


                {/* ------------------- Doctor Rating  -- NOT IN 20 PERCENT & UP ------------------- */}
                <div className=''>

                    <div className="flex items-center justify-center mt-[25px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M12.865 2.996a1 1 0 0 0-1.73 0L8.421 7.674a1.25 1.25 0 0 1-.894.608L2.44 9.05c-.854.13-1.154 1.208-.488 1.76l3.789 3.138c.35.291.515.75.43 1.197L5.18 20.35a1 1 0 0 0 1.448 1.072l4.79-2.522a1.25 1.25 0 0 1 1.164 0l4.79 2.522a1 1 0 0 0 1.448-1.072l-.991-5.205a1.25 1.25 0 0 1 .43-1.197l3.79-3.139c.665-.55.365-1.63-.49-1.759l-5.085-.768a1.25 1.25 0 0 1-.895-.608l-2.714-4.678Z" /></svg>
                        <h1 className='text-8xl pr-16'>{ratings.overall}</h1>
                    </div>


                </div>

                <div className='flex items-center justify-center pt-3'>
                    <p className="font-medium text-md">
                        ({doctorData.total_reviews} reseñas)
                    </p>
                </div>


                {/* Calification by Category */}

                {/* CONTINUE OR NOT RATING */}
                <div className="tag-clasification-section gap-5 flex flex-row flex-wrap justify-center items-center mt-16 mb-12">
                    <div className='continue-or-not'>
                        <div className='w-10'>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/img/doctor-profile/calification-icons/problem-solved.png"
                            />
                        </div>
                        <div className='pt-2'>
                            <p>Continuaría Atendiendose</p>
                        </div>
                        <div className=''>
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabIndex="-1"
                                style={{
                                    '--width-bar-continueOrNotBar':
                                        toPercentage.continuationRating
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-black"
                                    style={{
                                        width:
                                            'var(--width-bar-continueOrNotBar)'
                                    }}
                                />
                            </button>
                        </div>
                        <div className=''>
                            <h1 className='text-center text-3xl'>{ratings.continuationRating}</h1>
                        </div>

                    </div>
                    {/* COMUNICATION RATING */}
                    <div className='comunication'>
                        <div className='w-10'>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/img/doctor-profile/calification-icons/comunication.png"
                            />
                        </div>
                        <div className='pt-2'>
                            <p>Comunicación Clara</p>
                        </div>
                        <div className=''>
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabIndex="-1"
                                style={{
                                    '--width-bar-comunicationBar':
                                        toPercentage.comunicationRating
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-black"
                                    style={{
                                        width:
                                            'var(--width-bar-comunicationBar)'
                                    }}
                                />
                            </button>
                        </div>
                        <div className=''>
                            <h1 className='text-center text-3xl'>{ratings.comunicationRating}</h1>
                        </div>
                    </div>
                    {/* ATTENTION & PROFESSIONAILISM */}
                    <div className='attention-and-professionalism'>
                        <div className='w-10'>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/img/doctor-profile/calification-icons/attention-profesionalism.png"
                            />
                        </div>
                        <div className='pt-2'>
                            <p>Atención y Ptofesionalismo</p>
                        </div>
                        <div className=''>
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabIndex="-1"
                                style={{
                                    '--width-bar-attention-and-professionalism':
                                        toPercentage.attentionRating
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-black"
                                    style={{
                                        width:
                                            'var(--width-bar-attention-and-professionalism)'
                                    }}
                                />
                            </button>
                        </div>
                        <div className=''>
                            <h1 className='text-center text-3xl'>{ratings.attentionRating}</h1>
                        </div>
                    </div>
                    {/* KNOWLEDGE DOMAIN */}
                    <div className='knowledge-domain'>
                        <div className='w-10'>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/img/doctor-profile/calification-icons/knoledge-domain.png"
                            />
                        </div>
                        <div className='pt-2'>
                            <p>Dominio Conocimientos</p>
                        </div>
                        <div className=''>
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabIndex="-1"
                                style={{
                                    '--width-bar-knowledge-domain':
                                        toPercentage.knowledgeDomainRating
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-black"
                                    style={{
                                        width:
                                            'var(--width-bar-knowledge-domain)'
                                    }}
                                />
                            </button>
                        </div>
                        <div className=''>
                            <h1 className='text-center text-3xl'>{ratings.knowledgeDomainRating}</h1>
                        </div>
                    </div>
                    {/* RECOMENDATION TO FAMILY */}
                    <div className='recomendaria-a-familiar'>
                        <div className='w-10'>
                            <img
                                className="w-8 h-8 object-contain"
                                src="/img/doctor-profile/calification-icons/recomendation.png"
                            />
                        </div>
                        <div className='pt-2'>
                            <p>Recomendaría a Familiar</p>
                        </div>
                        <div className=''>
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabIndex="-1"
                                style={{
                                    '--width-bar-recomendation':
                                        toPercentage.recomendationRating
                                }}
                            >
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-black"
                                    style={{
                                        width:
                                            'var(--width-bar-recomendation)'
                                    }}
                                />
                            </button>
                        </div>
                        <div className=''>
                            <h1 className='text-center text-3xl'>{ratings.recomendationRating}</h1>
                        </div>
                    </div>
                </div>



                {/*  ---------------------- DR PROFILE ----------------------*/}
                {/* <div className='w-full md:p-14'> */}
                <div className='w-full md:w-3/4 mx-auto'>

                    <div className='grid grid-cols-1 md:grid-cols-12 md:auto-rows-[180px] gap-6'>

                        {/* ABOUT */}
                        <div className='col-span-1 md:col-span-7 md:row-span-2 p-5 bg-[#d5d5d5] rounded-3xl '>
                            <h1 className='text-2xl pb-2'>Sobre {doctorData.full_name}</h1>
                            {doctorData.about && doctorData.about.length > 0 ?
                                (
                                    <p className=''>
                                        {doctorData.about}
                                    </p>

                                ) : (
                                    <p className=''>Pronto más información</p>
                                )

                            }
                        </div>

                        {/* DISEASES */}
                        <div className='col-span-1 md:col-span-5 md:row-span-4 p-5 bg-[#d5d5d5] rounded-3xl'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fillRule="evenodd" d="M7.25 5.461V6.95a62.92 62.92 0 0 0-1.084.091c-1.441.134-2.565 1.471-2.704 2.91c-.016.164.12.299.285.299h16.506a.279.279 0 0 0 .285-.3c-.14-1.438-1.263-2.775-2.704-2.909a62.813 62.813 0 0 0-1.084-.091V5.46a1.75 1.75 0 0 0-1.49-1.73l-1.22-.183a13.75 13.75 0 0 0-4.08 0l-1.22.183a1.75 1.75 0 0 0-1.49 1.73Zm6.567-.43a12.25 12.25 0 0 0-3.634 0l-1.22.183a.25.25 0 0 0-.213.247v1.393a62.913 62.913 0 0 1 6.5 0V5.461a.25.25 0 0 0-.213-.247l-1.22-.183Zm6.736 7.019a.3.3 0 0 0-.3-.3H3.747a.3.3 0 0 0-.3.3v5.925a2.996 2.996 0 0 0 2.719 2.984a62.99 62.99 0 0 0 11.668 0a2.996 2.996 0 0 0 2.719-2.984V12.05ZM9.5 15.25a.75.75 0 1 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75h1.75a.75.75 0 0 0 0-1.5h-1.75V13.5a.75.75 0 1 0-1.5 0v1.75H9.5Z" clipRule="evenodd" /></svg>
                                <h1 className='text-2xl text-start'>Patologías que trata</h1>
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {doctorData.diseases && doctorData.diseases.length > 0 ? (
                                    doctorData.diseases.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p className='text-md'>
                                                {d}
                                            </p>
                                        </button>
                                    ))
                                ) : (
                                    <p>Pronto más información</p>
                                )}
                            </div>
                        </div>

                        {/* BACKGROUND */}
                        <div className='col-span-1 md:col-span-4 md:row-span-2 p-5 bg-[#d5d5d5] rounded-3xl'>
                            <div className='flex items-center pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fillRule="evenodd" d="M12.355 3.302a1.34 1.34 0 0 0-.743 0c-.519.148-1.042.284-1.568.421C7.701 4.335 5.12 5.01 2.913 6.81l-1.04.85c-.83.677-.83 2.003 0 2.68l1.024.834a12.01 12.01 0 0 0 2.353 1.491v4.629a2.75 2.75 0 0 0 1.751 2.562l4 1.56a2.75 2.75 0 0 0 1.998 0l4-1.56a2.75 2.75 0 0 0 1.751-2.562v-4.62a11.948 11.948 0 0 0 2.337-1.484l.163-.133V16a.75.75 0 0 0 1.5 0V9c0-.5-.208-1.002-.623-1.34l-1.024-.834c-2.224-1.81-4.913-2.512-7.184-3.104c-.524-.137-1.046-.273-1.564-.42ZM8.3 12.812a.75.75 0 0 0-.598 1.376c1.278.555 2.6 1.01 3.956 1.358c.236.06.484.06.72 0a26.176 26.176 0 0 0 3.945-1.359a.75.75 0 0 0-.6-1.374c-1.197.522-2.435.95-3.705 1.277A24.828 24.828 0 0 1 8.3 12.812Z" clipRule="evenodd" /></svg>
                                <h1 className='text-2xl text-start'>Estudios</h1>

                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {/* Background */}
                                {doctorData.background && doctorData.background.length > 0 ? (
                                    doctorData.background.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p className='text-sm'>
                                                {d}
                                            </p>
                                        </button>
                                    ))
                                ) : (
                                    <p>Pronto más información</p>
                                )
                                }
                            </div>
                        </div>

                        {/* PREVISION */}
                        <div className='col-span-1 md:col-span-3 md:row-span-2 p-5 bg-[#d5d5d5] rounded-3xl'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M13.16 4.407a2.25 2.25 0 0 0-2.32 0l-.517.311a9.75 9.75 0 0 1-4.115 1.354l-.325.031A1.25 1.25 0 0 0 4.75 7.347v1.644a10.25 10.25 0 0 0 3.126 7.37l3.255 3.147a1.25 1.25 0 0 0 1.738 0l3.255-3.147a10.25 10.25 0 0 0 3.126-7.37V7.347a1.25 1.25 0 0 0-1.133-1.244l-.325-.03a9.75 9.75 0 0 1-4.115-1.355l-.516-.31Z" /></svg>
                                <h1 className='text-2xl text-start'>Previsión</h1>
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {doctorData.previsiones && doctorData.previsiones.length > 0 ? (
                                    doctorData.previsiones.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p className='text-md'>
                                                {d}
                                            </p>
                                        </button>
                                    ))
                                ) : (
                                    <p>Pronto más información</p>
                                )}
                            </div>
                        </div>

                        {/* HEALTHCARE CENTER */}
                        <div className='col-span-1 md:col-span-4 md:row-span-2 p-5 bg-[#d5d5d5] rounded-3xl'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M8.75 10a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0Z" /><path fill="#2D2D2D" fillRule="evenodd" d="M3.774 8.877a8.038 8.038 0 0 1 8.01-7.377h.432a8.038 8.038 0 0 1 8.01 7.377a8.693 8.693 0 0 1-1.933 6.217L13.5 20.956a1.937 1.937 0 0 1-3 0l-4.792-5.862a8.693 8.693 0 0 1-1.934-6.217ZM12 5.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5Z" clipRule="evenodd" /></svg>
                                <h1 className='text-2xl text-start '>Centros de atención</h1>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {(doctorData.healthcare_centers && doctorData.healthcare_centers.length > 0) || (doctorData.private_practice_addresses && doctorData.private_practice_addresses.length > 0) ? (
                                    <>
                                        {/* Healthcare centers */}
                                        {doctorData.healthcare_centers && doctorData.healthcare_centers.map((d, index) => (
                                            <a
                                                href={doctorData.healthcare_center_url && doctorData.healthcare_center_url[index] ?
                                                    (doctorData.healthcare_center_url[index].startsWith('http') ?
                                                        doctorData.healthcare_center_url[index] :
                                                        `https://${doctorData.healthcare_center_url[index]}`)
                                                    : '#'} //link of the healthcare center
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='text-center cursor-pointer rounded-full p-3 bg-[#2D2D2D] text-white no-underline hover:bg-white hover:text-black transition-colors'
                                                key={`hc-${index}`}
                                            >
                                                <p className='text-sm text-center line-clamp-2'>
                                                    {d}
                                                </p>
                                            </a>
                                        ))}

                                        {/* Private Attention */}
                                        {doctorData.private_practice_addresses && doctorData.private_practice_addresses.map((d, index) => (
                                            <button key={`pa-${index}`} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                                <p className='text-sm text-center'>
                                                    {d}
                                                </p>
                                            </button>
                                        ))}
                                    </>
                                ) : (
                                    <p>Pronto más información</p>
                                )}


                            </div>
                        </div>



                        {/* INVESTIGATION & PROJECTS */}
                        <div className='col-span-1 md:col-span-8 md:row-span-2 p-5 bg-[#d5d5d5] rounded-3xl flex flex-col'>
                            <div className='flex items-center pb-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fillRule="evenodd" d="M14.495 3.25H8.5a.75.75 0 0 0 0 1.5h.26v5.087a7.25 7.25 0 0 1-1.256 4.078l-3.093 4.548a1.855 1.855 0 0 0 1.326 2.887l.087.01l.017.002c4.093.46 8.225.46 12.318 0l.018-.002l.086-.01a1.855 1.855 0 0 0 1.326-2.887l-3.093-4.548a7.25 7.25 0 0 1-1.256-4.078V4.75h.26a.75.75 0 0 0 0-1.5h-1.005Zm-4.666 9.3h4.342a8.75 8.75 0 0 1-.43-2.713V4.75H10.26v5.087a8.75 8.75 0 0 1-.431 2.713ZM10 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm2-1a1 1 0 1 1 2 0a1 1 0 0 1-2 0Z" clipRule="evenodd" /></svg>
                                <h1 className='text-2xl text-start'>Investigación y Proyectos</h1>
                            </div>
                            <div className='flex flex-row flex-1 items-stretch gap-2 w-full overflow-x-scroll overflow-y-hidden hide-scrollbar-desktop horizontal-scroll'>
                                {doctorData.investigation_and_projects && doctorData.investigation_and_projects.length > 0 ? (
                                    doctorData.investigation_and_projects.map((item, index) => (
                                        <div key={item.id || index} className='rounded-3xl p-2 h-full w-[280px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white flex-shrink-0 overflow-hidden'>
                                            <div className='h-full flex flex-col justify-between p-3'>
                                                <div className='flex items-center justify-between mb-2'>
                                                    <p className='text-lg font-semibold truncate'>{item.title}</p>
                                                    {item.init_date && (
                                                        <p className='text-sm whitespace-nowrap ml-2'>
                                                            {new Date(item.init_date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: '2-digit' })}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='flex-1 overflow-hidden'>
                                                    <p className='text-sm text-left line-clamp-6'>
                                                        {item.body}
                                                    </p>
                                                </div>
                                                <div className='text-left mt-2 flex flex-wrap gap-1'>
                                                    {item.type?.map((t, i) => (
                                                        <span key={i} className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Sin información</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="items-center gap-2 flex fixed bottom-3 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 w-auto">
                    <AuthReviewButton
                        client:load
                        drId={id}
                        doctorName={doctorData.doctor_first_name}
                    />
                    <GetBackButton client:load />
                </div>
                <div className='pt-12'>
                    <div className='flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#2D2D2D" fillRule="evenodd" d="M8.002 4.553a50.577 50.577 0 0 1 8.099.04l1.623.138a2.666 2.666 0 0 1 2.409 2.252l.102.669a20.665 20.665 0 0 1-.096 6.835a2.343 2.343 0 0 1-2.305 1.923H8.858c-.207 0-.41.051-.592.149l-3.911 2.102A.75.75 0 0 1 3.25 18V9.483a4.93 4.93 0 0 1 4.559-4.915l.193-.015ZM8 9.5A1.25 1.25 0 1 0 8 12a1.25 1.25 0 0 0 0-2.5Zm4 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5Zm2.75 1.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Z" clipRule="evenodd" /></svg>
                        <h1 className='text-center font-medium text-3xl pb-5'>Reseñas</h1>
                    </div>

                </div>

                {/* DR REVIEW CARDS */}
                <div className='flex justify-center overflow-y-auto gap-2 h-auto relative hide-scrollbar-desktop'>
                    <div className='w-full max-w-[1100px] md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 p-[10px] safari-columns'>
                        <DrReviews client:load postReviewQuery={postReviewQuery} />
                    </div>
                </div>

                {/* LOAD MORE REVIEWS (DR REVIEWS COMPONENT) */}
                {
                    (postReviewQuery.hasNextPage || postReviewQuery.data?.pages?.length > 1) && (
                        <div className="break-inside-avoid-column w-full flex justify-center py-10">
                            {
                                postReviewQuery.hasNextPage ? (
                                    <button
                                        className="text-white bg-black px-6 py-3 rounded-full shadow disabled:opacity-50"
                                        onClick={() => postReviewQuery.fetchNextPage()}
                                        disabled={postReviewQuery.isFetchingNextPage}
                                    >
                                        {
                                            postReviewQuery.isFetchingNextPage
                                                ? <p>Cargando más...</p>
                                                : <p>Cargar más</p>
                                        }
                                    </button>
                                ) : (
                                    <button
                                        className="text-black bg-[#b7b7b7] px-6 py-3 rounded-full  pointer-events-none cursor-pointer"
                                    >
                                        <p>
                                            No hay más comentarios para cargar
                                        </p>
                                    </button>
                                )
                            }
                        </div>
                    )
                }

                <div className='pt-60'>

                </div>
            </div>


        </div>
    )
}

