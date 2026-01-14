import { supabase } from "@/components/api/supabase/supabase"

export const Logout = () => {
    return (
        <>
            <button
                className="rounded-full bg-[#2D2D2D] text-white py-1 px-1  sm:py-1 sm:px-3 md:py-1 md:px-3 lg:py-2 lg:px-4  hover:bg-white hover:text-black"
                onClick={() => { supabase.auth.signOut() }}
            >
                <p className="text-sm sm:text-sm md:text-md lg:text-md">
                    Cerrar Sesión
                </p>
            </button>
        </>
    )
}

