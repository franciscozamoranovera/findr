
import { useState, useEffect } from "react";
import { supabase } from "../api/supabase/supabase"


export const DrReviews = ({ doctorId }) => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchDrReviews = async () => {

            const { data: reviews, error } = await supabase
                .from("reviews")
                .select("diseases, written_review, created_at, is_anonymous, user_email, appointment_reason")
                .eq("doctor_id", doctorId)

            if (error) {
                console.error('Error fetching reviews:', error)
                return
            }

            setReviews(reviews)
            console.log('Reviews del doctor:', reviews)
        }

        fetchDrReviews()

    }, [])

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

    //TODO:
    /* 
        1. ordenar desde el más reciente
        3. traspasar a una view para poder tener un rating (tener ojo con no llamar tantas API, conectar tablas/views)
    */

    /* NOTES:
    1. style={{whiteSpace: 'pre-line'}}  : maneja los saltos de línea o puntos a parte
    2. 
*/
    return (
        <>
            {reviews.map((data, i) => (

                <div className="bg-white p-4 m-2 rounded-3xl" key={i}>
                    <div className="flex items-center p-1">
                        <div className="pr-3">👨🏻‍⚕️</div>
                        <div className="">
                            {data.is_anonymous ? (
                                <h4 className="text-sm">Anonimo</h4>
                            ) : (
                                <h4 className="text-sm">{maskEmailName(data.user_email)}</h4>
                            )}
                        </div>
                        {/* <div className="">✅</div> */}
                    </div>
                    <div className="flex items-center justify-between p-1">
                        <div className="">⭐️⭐️⭐️⭐️⭐️</div>
                        <div className="text-xs">
                            <p>• {getRelativeTime(data.created_at)}</p>
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
            ))}
        </>
    )
}

