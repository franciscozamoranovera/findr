
import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase"



export const DrReviews = ({ doctorId, nextPage }) => {
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        const fetchDrReviews = async () => {

            const { data: reviews, error } = await supabase
                .from("reviews_overall_rating")
                .select("diseases, written_review, created_at, is_anonymous, user_email, appointment_reason, promedio_general")
                .eq("doctor_id", doctorId)
                .order('created_at', {ascending: false})
                .range(nextPage.a, nextPage.b)


            if (error) {
                console.error('Error fetching reviews:', error)
                return
            }


            setReviews(reviews)

            console.log('Reviews del doctor:', reviews)
        }

        fetchDrReviews()

    }, [nextPage])

    // HIDE USER EMAIL %
    const maskEmailName = (email) => {
        const [name, domain] = email.split('@');

        return name.substring(0, 7) + '***@' + domain;
    }

    //RELATIVE DATE FORMAT
    const getRelativeTime = (dateString) => {
        //current date
        const now = new Date();

        //Convert created_at to string
        const date = new Date(dateString);

        //Math to calculate difference of time
        const diffTime = Math.abs(now - date)

        //Convert ms to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 1) return "Hace unas horas"
        if (diffDays === 1) return "Hace 1 día"
        if (diffDays < 7) return `Hace ${diffDays} días`
        if (diffDays < 14) return "Hace 1 semana"
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
        return `Hace ${Math.floor(diffDays / 365)} años` //se ejecuta cuando hayan pasado +365 días

        /* 
        más precisa... usar esta (para semana, días, meses y años):

        if(diffDays >= 365) {
        const years = Math.floor(diffDays/365);
        if(years === 1) return "Hace 1 año";
        return `Hace ${years} años`;
  }
        
        */
    }

    /* Helper */
    const toString = (num) => {
        const count = num.toString();

        if (count === "0.0") return 0;

        if (!count.includes(".")) {
            return count + ".0";
        } else return count;
    };



    return (
        <>


            {reviews.length > 0 ? (

                reviews
                    .sort((a, b) =>
                        new Date(b.created_at) - new Date(a.created_at))
                    .map((data, i) => (

                        <div className="bg-white p-4 rounded-3xl w-full break-inside-avoid " key={i}>

                            <div className="flex items-center p-1">
                                <div className="pr-3">🙋🏻‍♂️</div>
                                <div className="">
                                    {data.is_anonymous ? (
                                        <h4 className="text-sm">Anonimo</h4>
                                    ) : (
                                        <h4 className="text-sm">{maskEmailName(data.user_email)}</h4>
                                    )}
                                </div>
                                {/* <div className="verified">✅</div> */}
                            </div>

                            <div className="flex items-center p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#000000" d="M17.562 21.56a1.003 1.003 0 0 1-.465-.115L12 18.765l-5.097 2.68a1 1 0 0 1-1.451-1.054l.973-5.676l-4.123-4.02a1 1 0 0 1 .554-1.705l5.699-.828l2.548-5.164a1.042 1.042 0 0 1 1.794 0l2.548 5.164l5.699.828a1 1 0 0 1 .554 1.706l-4.123 4.019l.973 5.676a1 1 0 0 1-.986 1.169Z" /></svg>
                                <div className="pr-1 pl-0.5">{toString(data.promedio_general)}</div>
                                <div className="text-xs">
                                    <p className="font-normal"> • {getRelativeTime(data.created_at)}</p>
                                </div>
                            </div>

                            <div className="p-2" style={{ whiteSpace: 'pre-line' }}>
                                <p>
                                    {data.written_review}
                                </p>
                            </div>

                            <div className="p-1 mb-1 border-black border rounded-xl w-fit">
                                <p className="text-xs">{data.appointment_reason}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-1">
                                {data.diseases.map((diseases, i) => (
                                    <ul className="bg-gray-400 p-2 rounded-xl w-fit" key={i}>
                                        <li className="text-sm">{diseases}</li>
                                    </ul>
                                ))}
                            </div>

                        </div >

                    ))
            ) : (
                <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm">
                    <p className="text-center text-gray-600 font-medium">Todavía no tiene reseñas</p>
                </div>

            )}

        </>
    )
}

