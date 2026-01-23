import { supabase } from "@/components/api/supabase/supabase"
import { useState, useEffect } from "react"

export const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setIsLoggedIn(!!session); //true if session exist, false if it don't
        }

        checkSession();

        //Listen changes in the session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsLoggedIn(!!session)
        })

        return subscription.unsubscribe()

    }, [])


    return (
        <>
            {
                isLoggedIn ? (
                    <button
                        className="rounded-full bg-[#2D2D2D] text-white py-1 px-1  sm:py-1 sm:px-3 md:py-1 md:px-3 lg:py-2 lg:px-4  hover:bg-white hover:text-black"
                        onClick={() => { supabase.auth.signOut() }}
                    >
                        <p className="text-sm sm:text-sm md:text-md lg:text-md">
                            Cerrar Sesión
                        </p>
                    </button>
                ) : (
                    []
                )

            }
        </>
    )
}

