
export const AttentionType = ({ attentionType, setAttentionType }) => {

    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setAttentionType(attentionType === value ? null : value);
    }


    return (
        <>
            <div className="pl-6">
                <h2>
                    Tipo de Atención
                </h2>
            </div>
            <div className="flex items-center justify-center gap-4 p-3">

                {/* Presencial */}
                <button
                    onClick={handleOnClick}
                    value="onsite"
                    className={`${attentionType === 'onsite' ? "bg-black text-white" : "border border-black text-black"} flex flex-col items-center justify-center h-20 w-full sm:w-40 md:w-60 xl:w-80 px-4 border border-black rounded-2xl cursor-pointer hover:bg-black hover:text-white group`}
                >
                    {/* Building / hospital → Presencial */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" className="group-hover:text-white transition-colors duration-200 pointer-events-none">
                        <g fill="currentColor">
                            <path d="M8.5 5.034v1.1l.953-.55l.5.867L9 7l.953.55l-.5.866l-.953-.55v1.1h-1v-1.1l-.953.55l-.5-.866L7 7l-.953-.55l.5-.866l.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5Zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9h-.5Zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5ZM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5Z" />
                            <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1V1Zm2 14h2v-3H7v3Zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm0-14H6v1h4V1Zm2 7v7h3V8h-3Zm-8 7V8H1v7h3Z" />
                        </g>
                    </svg>
                    <p className="text-sm pointer-events-none">Presencial</p>
                </button>

                {/* Telemedicina */}
                <button
                    onClick={handleOnClick}
                    value="telemedicine"
                    className={`${attentionType === 'telemedicine' ? "bg-black text-white" : "border border-black text-black"} flex flex-col items-center justify-center h-20 w-full sm:w-40 md:w-60 xl:w-80 px-4 border border-black rounded-2xl cursor-pointer hover:bg-black hover:text-white group`}
                >
                    {/* Screen with cross → Telemedicina */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14" className="group-hover:text-white transition-colors duration-200 pointer-events-none">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 1.25H1a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5m-7 9l-1 2.5m3-2.5l1 2.5m-5 0h6" />
                            <path d="M6.302 2.986a.43.43 0 0 0-.43.43v1.207H4.666a.43.43 0 0 0-.43.43v1.395c0 .237.193.43.43.43h1.208v1.207c0 .237.192.43.43.43h1.395a.43.43 0 0 0 .43-.43V6.877h1.207a.43.43 0 0 0 .43-.43V5.053a.43.43 0 0 0-.43-.43H8.127V3.416a.43.43 0 0 0-.43-.43H6.303Z" />
                        </g>
                    </svg>
                    <p className="text-sm pointer-events-none">Telemedicina</p>
                </button>

            </div>
        </>
    )

}
