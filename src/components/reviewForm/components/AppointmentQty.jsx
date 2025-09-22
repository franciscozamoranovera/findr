import { useState } from "react"


export const AppointmentQty = () => {

    const [appointmentQty, setAppointmentQty] = useState("");

    console.log(appointmentQty)

    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setAppointmentQty(appointmentQty === value ? null : value);
    }

    return (

        <div className="p-2">

            <button
                className={` ${appointmentQty === "1° visita" ? "border-blue-700" : "border-transparent"} bg-blue-100 text-blue-900 px-4 py-2 rounded border transition-colors mb-2 mr-3`}
                onClick={handleOnClick}
                type="button"
                value="1° visita"


            >1° visita
            </button>
            <button
                className={` ${appointmentQty === "2° visita" ? "border-blue-700" : "border-transparent"} bg-blue-100 text-blue-900 px-4 py-2 rounded border transition-colors mb-2 mr-3`}
                onClick={handleOnClick}
                type="button"
                value="2° visita"


            >2° visita
            </button>
            <button
                className={` ${appointmentQty === "3° visita" ? "border-blue-700" : "border-transparent"} bg-blue-100 text-blue-900 px-4 py-2 rounded border transition-colors mb-2 mr-3`}
                onClick={handleOnClick}
                type="button"
                value="3° visita"


            >3° visita
            </button>
            <button
                className={` ${appointmentQty === "4° visita" ? "border-blue-700" : "border-transparent"} bg-blue-100 text-blue-900 px-4 py-2 rounded border transition-colors mb-2 mr-3`}
                onClick={handleOnClick}
                type="button"
                value="4° visita"


            >4° visita
            </button>
            <button
                className={` ${appointmentQty === "más de 5 visitas" ? "border-blue-700" : "border-transparent"} bg-blue-100 text-blue-900 px-4 py-2 rounded border transition-colors mb-2 mr-3`}
                onClick={handleOnClick}
                type="button"
                value="más de 5 visitas"


            >más de 5 visitas
            </button>

            <input
                type="hidden"
                name="appointmentQty"
                value={appointmentQty}
                onChange={handleOnClick}

            />

        </div>
    )
}
