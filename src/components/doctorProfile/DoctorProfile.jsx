
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase";
import { DrReviews } from "../doctorReviews/DrReviews";
import AuthReviewButton from "@/components/reviewForm/buttons/progressBar/AuthReviewButton";



export const DoctorProfile = () => {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    /* States to handle ratings */
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

    const [nextPage, setNextPage] = useState({
        a: 0,
        b: 1
    })

    /* Breadcrumbs */
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


    /* Document Title */
    useEffect(() => {
        if (data?.full_name) {
            document.title = `${data.full_name} | findr`;
        }
    }, [data]);


    /* Data Fetching */
    useEffect(() => {
        const fetchDoctorData = async () => {
            const { data: doctorData, error } = await supabase
                .from("doctor_search_view_flat")
                .select("doctor_first_name,full_name, speciality_name, sub_speciality_name, diseases, previsiones, about, background,total_reviews, promedio_general, promedio_atencion, promedio_comunicacion, promedio_continuidad, promedio_conocimiento, promedio_recomendacion, healthcare_centers, private_practice_addresses, healthcare_center_url")
                .eq('id', id)
                .single();

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            if (doctorData) {
                setData(doctorData)

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

        };

        if (id) fetchDoctorData();

    }, [id])

    if (loading) return <div className="text-black p-8 text-center items-center flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
        <p >
            Cargando perfil...
        </p>
    </div>;

    if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;
    if (!data) return <div className="text-black p-8">Doctor not found</div>;



    return (
        <div className=''>
            {/* Breadcrumbs */}
            <div className="p-6">
                <div className="flex-col hidden sm:block">
                    {region ? (<p className='text-[#adadad]  text-sm'>/{region}</p>) : (<p></p>)}
                    {comuna ? (<p className='text-[#adadad] text-sm'>/{comuna}</p>) : (<p></p>)}
                    {sddSearch ? (<p className='text-[#adadad] text-sm'>/{sddSearch}</p>) : (<p></p>)}
                    {prevision ? (<p className='text-[#adadad] text-sm'>/{prevision}</p>) : (<p></p>)}
                </div>

                {/* Doctor Summary Info */}
                <div className='text-center pt-10'>
                    <div className='items-center'>
                        <p className='text-3xl pb-2'>👨🏻‍⚕️</p>
                    </div>
                    <h1 className="text-black text-3xl pb-1">{data.full_name}</h1>
                    <h2 className="text-black font-light text-sm">{data.speciality_name}</h2>
                    {data.sub_speciality_name && (
                        <h3 className="text-black pt-1 text-xl font-semi-bold">{data.sub_speciality_name}</h3>
                    )}
                </div>


                {/* ------------------- Doctor Rating  -- TOP 5 TO 20 PERCENT ------------------- */}
                <div className='hidden'>
                    <div className='grid grid-cols-[1fr_135px_1fr] mb-[25px] mt-[25px]'>
                        <div class="left-laurel-branch flex justify-end">
                            <img
                                className='h-[150px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'
                                src="/img/doctor-profile/left-laurel-findr-it-rating.png"
                            />
                        </div>
                        <div class="flex items-center justify-center">
                            <h1 className='text-8xl'>{ratings.overall}</h1>
                        </div>
                        <div class="right-laurel-branch flex justify-start">
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
                            <p className='text-xl'><strong>{data.doctor_first_name}</strong> está dentro del 20%
                                de los cardiólogos mejor valorados en <strong>{data.healthcare_centers}</strong></p>
                        </div>
                    </div>
                </div>


                {/* ------------------- Doctor Rating  -- NOT IN 20 PERCENT & UP ------------------- */}
                <div className=''>

                    <div class="flex items-center justify-center mt-[25px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M12.865 2.996a1 1 0 0 0-1.73 0L8.421 7.674a1.25 1.25 0 0 1-.894.608L2.44 9.05c-.854.13-1.154 1.208-.488 1.76l3.789 3.138c.35.291.515.75.43 1.197L5.18 20.35a1 1 0 0 0 1.448 1.072l4.79-2.522a1.25 1.25 0 0 1 1.164 0l4.79 2.522a1 1 0 0 0 1.448-1.072l-.991-5.205a1.25 1.25 0 0 1 .43-1.197l3.79-3.139c.665-.55.365-1.63-.49-1.759l-5.085-.768a1.25 1.25 0 0 1-.895-.608l-2.714-4.678Z" /></svg>
                        <h1 className='text-8xl pr-16'>{ratings.overall}</h1>
                    </div>


                </div>

                <div className='flex items-center justify-center pt-3'>
                    <p className="font-medium text-md">
                        ({data.total_reviews} reseñas)
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
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabindex="-1"
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
                            <h1 className='text-center'>{ratings.continuationRating}</h1>
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
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabindex="-1"
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
                            <h1 className='text-center'>{ratings.comunicationRating}</h1>
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
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabindex="-1"
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
                            <h1 className='text-center'>{ratings.attentionRating}</h1>
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
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabindex="-1"
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
                            <h1 className='text-center'>{ratings.knowledgeDomainRating}</h1>
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
                            <button className="pointer-events-none relative rounded border-2 border-black w-[200px] h-[9px] bg-white text-black overflow-hidden" tabindex="-1"
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
                            <h1 className='text-center'>{ratings.recomendationRating}</h1>
                        </div>
                    </div>
                </div>

                {/* DR PROFILE */}
                <div>
                    {/* ABOUT */}
                    <div className='w-full pt-12 flex flex-col items-center justify-center'>
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5 '>
                            <h1 className='text-3xl sm:text-4xl pb-2'>Sobre {data.full_name}</h1>
                            {data.about && data.about.length > 0 ?
                                (
                                    <p className=''>
                                        {data.about}
                                    </p>

                                ) : (
                                    <p className=''>Pronto más información</p>
                                )

                            }
                        </div>
                        {/* DISEASES */}
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fill-rule="evenodd" d="M7.25 5.461V6.95a62.92 62.92 0 0 0-1.084.091c-1.441.134-2.565 1.471-2.704 2.91c-.016.164.12.299.285.299h16.506a.279.279 0 0 0 .285-.3c-.14-1.438-1.263-2.775-2.704-2.909a62.813 62.813 0 0 0-1.084-.091V5.46a1.75 1.75 0 0 0-1.49-1.73l-1.22-.183a13.75 13.75 0 0 0-4.08 0l-1.22.183a1.75 1.75 0 0 0-1.49 1.73Zm6.567-.43a12.25 12.25 0 0 0-3.634 0l-1.22.183a.25.25 0 0 0-.213.247v1.393a62.913 62.913 0 0 1 6.5 0V5.461a.25.25 0 0 0-.213-.247l-1.22-.183Zm6.736 7.019a.3.3 0 0 0-.3-.3H3.747a.3.3 0 0 0-.3.3v5.925a2.996 2.996 0 0 0 2.719 2.984a62.99 62.99 0 0 0 11.668 0a2.996 2.996 0 0 0 2.719-2.984V12.05ZM9.5 15.25a.75.75 0 1 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75h1.75a.75.75 0 0 0 0-1.5h-1.75V13.5a.75.75 0 1 0-1.5 0v1.75H9.5Z" clip-rule="evenodd" /></svg>
                                <h1 className='text-3xl sm:text-4xl text-start'>Patologías que trata</h1>
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {data.diseases && data.diseases.length > 0 ? (
                                    data.diseases.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p>
                                                {d}
                                            </p>
                                        </button>
                                    ))
                                ) : (
                                    <p>Pronto más información</p>
                                )}
                            </div>
                        </div>
                        {/* PREVISION */}
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M13.16 4.407a2.25 2.25 0 0 0-2.32 0l-.517.311a9.75 9.75 0 0 1-4.115 1.354l-.325.031A1.25 1.25 0 0 0 4.75 7.347v1.644a10.25 10.25 0 0 0 3.126 7.37l3.255 3.147a1.25 1.25 0 0 0 1.738 0l3.255-3.147a10.25 10.25 0 0 0 3.126-7.37V7.347a1.25 1.25 0 0 0-1.133-1.244l-.325-.03a9.75 9.75 0 0 1-4.115-1.355l-.516-.31Z" /></svg>
                                <h1 className='text-3xl sm:text-4xl text-start'>Previsión</h1>
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {data.previsiones && data.previsiones.length > 0 ? (
                                    data.previsiones.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p>
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
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5'>
                            <div className='flex pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" d="M8.75 10a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0Z" /><path fill="#2D2D2D" fill-rule="evenodd" d="M3.774 8.877a8.038 8.038 0 0 1 8.01-7.377h.432a8.038 8.038 0 0 1 8.01 7.377a8.693 8.693 0 0 1-1.933 6.217L13.5 20.956a1.937 1.937 0 0 1-3 0l-4.792-5.862a8.693 8.693 0 0 1-1.934-6.217ZM12 5.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5Z" clip-rule="evenodd" /></svg>
                                <h1 className='text-3xl sm:text-4xl text-start '>Centros de atención</h1>
                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {(data.healthcare_centers && data.healthcare_centers.length > 0) || (data.private_practice_addresses && data.private_practice_addresses.length > 0) ? (
                                    <>
                                        {/* Healthcare centers */}
                                        {data.healthcare_centers && data.healthcare_centers.map((d, index) => (
                                            <a
                                                href={data.healthcare_center_url && data.healthcare_center_url[index] ?
                                                    (data.healthcare_center_url[index].startsWith('http') ?
                                                        data.healthcare_center_url[index] :
                                                        `https://${data.healthcare_center_url[index]}`)
                                                    : '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='cursor-pointer rounded-full p-3 bg-[#2D2D2D] text-white no-underline hover:bg-white hover:text-black transition-colors'
                                                key={`hc-${index}`}
                                            >
                                                <p>
                                                    {d}
                                                </p>
                                            </a>
                                        ))}

                                        {/* Private Attention */}
                                        {data.private_practice_addresses && data.private_practice_addresses.map((d, index) => (
                                            <button key={`pa-${index}`} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                                <p>
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
                        {/* BACKGROUND, INVESTIGATION & PROJECTS */}
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5'>
                            <div className='flex items-center pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fill-rule="evenodd" d="M12.355 3.302a1.34 1.34 0 0 0-.743 0c-.519.148-1.042.284-1.568.421C7.701 4.335 5.12 5.01 2.913 6.81l-1.04.85c-.83.677-.83 2.003 0 2.68l1.024.834a12.01 12.01 0 0 0 2.353 1.491v4.629a2.75 2.75 0 0 0 1.751 2.562l4 1.56a2.75 2.75 0 0 0 1.998 0l4-1.56a2.75 2.75 0 0 0 1.751-2.562v-4.62a11.948 11.948 0 0 0 2.337-1.484l.163-.133V16a.75.75 0 0 0 1.5 0V9c0-.5-.208-1.002-.623-1.34l-1.024-.834c-2.224-1.81-4.913-2.512-7.184-3.104c-.524-.137-1.046-.273-1.564-.42ZM8.3 12.812a.75.75 0 0 0-.598 1.376c1.278.555 2.6 1.01 3.956 1.358c.236.06.484.06.72 0a26.176 26.176 0 0 0 3.945-1.359a.75.75 0 0 0-.6-1.374c-1.197.522-2.435.95-3.705 1.277A24.828 24.828 0 0 1 8.3 12.812Z" clip-rule="evenodd" /></svg>
                                <h1 className='text-3xl sm:text-4xl text-start'>Estudios</h1>

                            </div>
                            <div className='flex justify-start items-center gap-3'>
                                {/* Background */}
                                {data.background && data.background.length > 0 ? (
                                    data.background.map((d, index) => (
                                        <button key={index} className='rounded-full p-3 bg-[#2D2D2D] text-white pointer-events-none'>
                                            <p>
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
                        <div className='w-full sm:w-3/5 md:w-3/5 xl:w-2/5 pb-5'>
                            <dic className='flex items-center pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#2D2D2D" fill-rule="evenodd" d="M14.495 3.25H8.5a.75.75 0 0 0 0 1.5h.26v5.087a7.25 7.25 0 0 1-1.256 4.078l-3.093 4.548a1.855 1.855 0 0 0 1.326 2.887l.087.01l.017.002c4.093.46 8.225.46 12.318 0l.018-.002l.086-.01a1.855 1.855 0 0 0 1.326-2.887l-3.093-4.548a7.25 7.25 0 0 1-1.256-4.078V4.75h.26a.75.75 0 0 0 0-1.5h-1.005Zm-4.666 9.3h4.342a8.75 8.75 0 0 1-.43-2.713V4.75H10.26v5.087a8.75 8.75 0 0 1-.431 2.713ZM10 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm2-1a1 1 0 1 1 2 0a1 1 0 0 1-2 0Z" clip-rule="evenodd" /></svg>
                                <h1 className='text-3xl sm:text-4xl text-start'>Investigación y Proyectos</h1>
                            </dic>
                            <div className='flex flex-row sm:min-h-fit items-start gap-2 w-full overflow-x-scroll overflow-y-hidden hide-scrollbar-desktop horizontal-scroll'>
                                {/* Investigation & Projects */}
                                {data.background && data.background.length > 0 ? (

                                    data.background.map((d, index) => (
                                        <button key={index} className='rounded-3xl p-2 h-auto w-[280px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white pointer-events-none flex-shrink-0  overflow-hidden'>
                                            <div className='h-full flex flex-col justify-between p-3'>
                                                <div className='flex items-center justify-between mb-2'>
                                                    <p className='text-lg font-semibold truncate'>Título del Proyecto</p>
                                                    <p className='text-sm whitespace-nowrap ml-2'>10-Oct-22</p>
                                                </div>
                                                <div className='flex-1 overflow-hidden'>
                                                    <p className='text-sm text-left line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. </p>
                                                </div>
                                                <div className='text-left mt-2'>
                                                    <span className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>{d}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))

                                ) : (
                                    <p>Sin información</p>
                                )}

                                <button className='rounded-3xl p-2 h-auto w-[250px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white pointer-events-none flex-shrink-0  overflow-hidden'>
                                    <div className='h-full flex flex-col justify-between p-3'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className='text-lg font-semibold truncate'>Título del Proyecto</p>
                                            <p className='text-sm whitespace-nowrap ml-2'>10-Oct-22</p>
                                        </div>
                                        <div className='flex-1 overflow-hidden'>
                                            <p className='text-sm text-left line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. </p>
                                        </div>
                                        <div className='text-left mt-2'>
                                            <span className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>Test</span>
                                        </div>
                                    </div>
                                </button>
                                <button className='rounded-3xl p-2 h-auto w-[250px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white pointer-events-none flex-shrink-0  overflow-hidden'>
                                    <div className='h-full flex flex-col justify-between p-3'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className='text-lg font-semibold truncate'>Título del Proyecto</p>
                                            <p className='text-sm whitespace-nowrap ml-2'>10-Oct-22</p>
                                        </div>
                                        <div className='flex-1 overflow-hidden'>
                                            <p className='text-sm text-left line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. </p>
                                        </div>
                                        <div className='text-left mt-2'>
                                            <span className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>Test</span>
                                        </div>
                                    </div>
                                </button>
                                <button className='rounded-3xl p-2 h-auto w-[250px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white pointer-events-none flex-shrink-0  overflow-hidden'>
                                    <div className='h-full flex flex-col justify-between p-3'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className='text-lg font-semibold truncate'>Título del Proyecto</p>
                                            <p className='text-sm whitespace-nowrap ml-2'>10-Oct-22</p>
                                        </div>
                                        <div className='flex-1 overflow-hidden'>
                                            <p className='text-sm text-left line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. </p>
                                        </div>
                                        <div className='text-left mt-2'>
                                            <span className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>Test</span>
                                        </div>
                                    </div>
                                </button>
                                <button className='rounded-3xl p-2 h-auto w-[250px] xs:w-[280px] sm:w-[300px] xl:w-[350px] bg-[#2D2D2D] text-white pointer-events-none flex-shrink-0  overflow-hidden'>
                                    <div className='h-full flex flex-col justify-between p-3'>
                                        <div className='flex items-center justify-between mb-2'>
                                            <p className='text-lg font-semibold truncate'>Título del Proyecto</p>
                                            <p className='text-sm whitespace-nowrap ml-2'>10-Oct-22</p>
                                        </div>
                                        <div className='flex-1 overflow-hidden'>
                                            <p className='text-sm text-left line-clamp-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet rhoncus malesuada. Aliquam id urna auctor mi tristique elementum. Aenean at ipsum mattis, bibendum quam eu. </p>
                                        </div>
                                        <div className='text-left mt-2'>
                                            <span className='text-[8px] xl:text-xs bg-white text-black px-2 py-1 rounded-full'>Test</span>
                                        </div>
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="fixed bottom-3 sm:bottom-20 left-1/2 w-3/4 right-auto -translate-x-1/2  sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-30 sm:w-auto">
                    <AuthReviewButton
                        client:load
                        drId={id}
                        doctorName={data.doctor_first_name}
                    />
                </div>
                <div className='pt-12'>
                    <div className='flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#2D2D2D" fill-rule="evenodd" d="M8.002 4.553a50.577 50.577 0 0 1 8.099.04l1.623.138a2.666 2.666 0 0 1 2.409 2.252l.102.669a20.665 20.665 0 0 1-.096 6.835a2.343 2.343 0 0 1-2.305 1.923H8.858c-.207 0-.41.051-.592.149l-3.911 2.102A.75.75 0 0 1 3.25 18V9.483a4.93 4.93 0 0 1 4.559-4.915l.193-.015ZM8 9.5A1.25 1.25 0 1 0 8 12a1.25 1.25 0 0 0 0-2.5Zm4 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5Zm2.75 1.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Z" clip-rule="evenodd" /></svg>
                        <h1 className='text-center font-medium text-3xl pb-5'>Reseñas</h1>
                    </div>

                </div>
                <div className='flex sm:flex-wrap overflow-y-auto gap-2 h-[40rem] relative hide-scrollbar-desktop'>
                    <div className='md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 p-[10px] w-full safari-columns'>
                        <DrReviews client:load doctorId={id} nextPage={nextPage} />
                        <div className="justify-center">
                            {/*   <button
                            className="text-white bg-black rounded-full p-3"
                            onClick={() => setNextPage(prev => ({
                                a: prev.a - 1,
                                b: prev.b - 1
                            }))}
                        >
                            VER MENOS
                        </button> */}
                            <button
                                className="text-white bg-black rounded-full p-3"
                                onClick={() => setNextPage(prev => ({
                                    a: prev.a + 0,
                                    b: prev.b + 2
                                }))}
                            >
                                VER MAS
                            </button>
                        </div>
                    </div>
                </div>
                <div className='pt-60'>

                </div>
            </div>


        </div>
    )
}

