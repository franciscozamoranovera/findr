import { supabase } from "@/components/api/supabase/supabase"

export const Logout = () => {
    return (
        <>
            <button
                className="rounded-full bg-[#2D2D2D] text-white py-6 px-14"
                onClick={() => {supabase.auth.signOut()}}
            >
                Cerrar Sesión
            </button>
        </>
    )
}

