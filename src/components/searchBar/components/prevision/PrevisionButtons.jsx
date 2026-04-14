
export const PrevisionButtons = ({fonasaButton, setFonasaButton, isapreButton, setIsapreButton , particularButton, setParticularButton}) => {


    const handleOnClick = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setFonasaButton(fonasaButton === value ? null : value);
        setIsapreButton(isapreButton === value ? null : value);
        setParticularButton(particularButton === value ? null : value);

    }


    return (
        <>
            <div className="flex col-auto p-2 gap-3">

                <button
                    onClick={handleOnClick}
                    value="Fonasa"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`${fonasaButton === 'Fonasa' ? "bg-white text-black" : "bg-[#7f7f7f] text-white"} px-4 py-2 rounded-2xl cursor-pointer text-m hover:text-black hover:bg-[#fafafa] active:bg-[#7f7f7f] active:text-white transition-colors duration-200 ease-in-out`}
                >
                    Fonasa
                </button>


                <button
                    onClick={handleOnClick}
                    value="Isapre"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`${isapreButton === 'Isapre' ? "bg-white text-black" : "bg-[#7f7f7f] text-white"} px-4 py-2 rounded-2xl cursor-pointer text-m hover:text-black hover:bg-[#fafafa] active:bg-[#7f7f7f] active:text-white transition-colors duration-200 ease-in-out`}
                >
                    Isapre
                </button>

                <button
                    onClick={handleOnClick}
                    value="Particular"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`${particularButton === 'Particular' ? "bg-white text-black" : "bg-[#7f7f7f] text-white"} px-4 py-2 rounded-2xl cursor-pointer text-m hover:text-black hover:bg-[#fafafa] active:bg-[#7f7f7f] active:text-white transition-colors duration-200 ease-in-out`}
                >
                    Particular
                </button>
            </div>
        </>
    )
}

