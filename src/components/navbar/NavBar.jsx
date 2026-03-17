import { supabase } from "../api/supabase/supabase";
import { Logout } from "../reviewForm/components/Logout";
import { useState, useEffect } from "react";

export const NavBar = () => {

    /* Logout button in bakket */
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        }

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsLoggedIn(!!session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between pl-4 pt-3  bg-transparent">

                {/* <h1 className="text-black text-4xl">fin</h1><h1 className="text-[#0066FF] text-4xl">dr</h1> */}
                <a href="/search">

                    <svg
                        viewBox="0 0 820 180"
                        xmlns="http://www.w3.org/2000/svg"
                        className="max-w-3xl w-48 sm:w-48 md:w-52 lg:w-52"

                    >
                        <defs>
                            {/*  Inner Shadow solo para "dr"  */}
                            <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feOffset dx="7" dy="7" /> {/* da profundidad al inner shadow de "dr" */}
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feComposite
                                    operator="out"
                                    in="SourceGraphic"
                                    in2="blur"
                                    result="inverse"
                                />
                                <feFlood floodColor="black" floodOpacity="0.28" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                            </filter>
                        </defs>

                        {/* "fin" negro */}
                        <text
                            x="20"
                            y="140"
                            fontFamily="'EB Garamond', serif"
                            fontSize="160"
                            fontWeight="500"
                        >
                            <tspan fill="#000000">fin</tspan>
                            <tspan
                                fill="#0066FF"
                                filter="url(#innerShadow)"
                                dx="-6" /* da separación a "dr". -10 = más separación. -1 menos. */
                            >
                                dr
                            </tspan>
                        </text>
                    </svg>
                </a>
                <div className="items-center pr-5 flex gap-10 md:gap-5 sm:gap-4 lg:gap-10 ">
                    <a
                        className=""
                    >
                        <span className="text-lg  text-gray-500 hover:text-[#2D2D2D] underline cursor-pointer ">
                            <a href="https://wa.me/56951083930?text=Hola!%20Qu%C3%A9%20tal%3F" target="_blank" rel="noopener noreferrer">
                                Soy especialista
                            </a>
                        </span>
                    </a>
                    {
                        isLoggedIn ? (
                            <div className="hidden sm:block">
                                <Logout client:load />
                            </div>
                        ) : (
                            []
                        )
                    }
                </div>
            </div >
        </>
    )
}

