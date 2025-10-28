
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
                .select("doctor_first_name, full_name, speciality_name, sub_speciality_name, diseases, total_reviews, promedio_general, promedio_atencion, promedio_comunicacion, promedio_continuidad, promedio_conocimiento, promedio_recomendacion, healthcare_centers")
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


                {/* Doctor Rating  -- TOP 5 TO 20 PERCENT */}
                <div>
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


                {/* Doctor Rating  -- NOT IN 20 PERCENT */}
                <div>
                    <div>

                    </div>
                </div>

                <div className='flex items-center justify-center pt-3'>
                    <p className="font-medium text-md">
                        ({data.total_reviews} reseñas)
                    </p>
                </div>


                <div>

                </div>

                
                <div class="fixed bottom-1 sm:bottom-20 left-auto right-auto sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-30 sm:w-auto">
                    <AuthReviewButton
                        client:load
                        drId={id}
                        doctorName={data.doctor_first_name}
                    />
                </div>
                <div className='flex sm:flex-wrap overflow-y-auto gap-2 h-[40rem] relative hide-scrollbar-desktop'>
                    <div className='md:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6 p-[10px] w-full safari-columns'>
                        <DrReviews client:load doctorId={id} />
                    </div>
                </div>
            </div>


        </div>
    )
}

