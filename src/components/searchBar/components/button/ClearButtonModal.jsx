import { useNavigate } from 'react-router-dom';
import { navigation } from "@/components/helpers/navigation/navigate"

export const ClearButtonModal = ({
    setInputValue,
    setSelectedRegion,
    setSelectedComuna,
    setFonasaButton,
    setIsapreButton,
    setParticularButton,
    setAttentionType,
    setHealthcareCenterValue,
    setDiseaseList

}) => {

    const navigate = useNavigate();

    const handleFilterReset = (e) => {
        e.preventDefault()

        /* Reset filtros */
        setInputValue && setInputValue(""); /* setInputValue &&: Avoid to call an "undefined" output. Esto para usar el componente de foma parcial hay que validarlo antes...y no se cae  */
        setSelectedRegion && setSelectedRegion("");
        setSelectedComuna && setSelectedComuna("");
        setSelectedComuna && setFonasaButton(null);
        setIsapreButton && setIsapreButton(null);
        setParticularButton && setParticularButton(null);
        setAttentionType && setAttentionType(null);
        setHealthcareCenterValue && setHealthcareCenterValue("");
        setDiseaseList && setDiseaseList([]);

        /* Redirección URL limpia con fn navigarion (helper) */
        navigation && navigation({
            setInputValue: "",
            setSelectedRegion: "",
            setSelectedComuna: "",
            setFonasaButton: null,
            setIsapreButton: null,
            setParticularButton: null,
            setAttentionType: null,
            setHealthcareCenterValue: "",
            setDiseaseList: [],
            navigate
        });

    }

    return (
        <div className="flex justify-center items-center">
            <button
                className="cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out rounded-3xl  hover:underline hover:text-blue-700"
                onClick={handleFilterReset}
            >

               {/*  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m14.03 1.889l9.657 9.657l-8.345 8.345l-.27.27H20v2H6.747l-3.666-3.666a4 4 0 0 1 0-5.657zm-8.242 11.07l-1.293 1.294a2 2 0 0 0 0 2.828l3.08 3.08h4.68l.366-.368z" /></svg>
                </div> */}

                <p className="font-medium ml-1">
                    Limpiar filtros
                </p>

            </button>
        </div>
    )
}

