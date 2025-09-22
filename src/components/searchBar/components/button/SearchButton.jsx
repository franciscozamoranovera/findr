import { useNavigate } from 'react-router-dom';
import { navigation } from "@/components/helpers/navigation/navigate";

export const SearchButton = (props/* {selectedRegion, selectedComuna, inputValue, setIsOpen, setIsSecFiltersOpen, fonasaButton, isapreButton, particularButton, attentionType} */) => {

    const navigate = useNavigate();

    const onHandleSubmit = (e) => {
      e.preventDefault();
  
      navigation({
        ...props,
        navigate,
        closeModals: () => {
          props.setIsOpen(false);
          props.setIsSecFiltersOpen(false);
        },
      });
    };
    /* const navigate = useNavigate();

    const onHandleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (inputValue) params.set("SDDsearch", inputValue);
        if (selectedRegion) params.set("region", selectedRegion);
        if (selectedComuna) params.set("comuna", selectedComuna);
        if (fonasaButton || isapreButton || particularButton) params.set("prevision", fonasaButton || isapreButton || particularButton)
        if (attentionType) params.set("attentiontype", attentionType);

        navigate(`/search?${params.toString()}`);

        setIsOpen(false);
        setIsSecFiltersOpen(false);

    } */


    return (
        <>
            <button id="submit-finder-btn" className="relative flex items-center h-[50px] w-[125px] rounded-lg bg-black text-white hover:bg-[rgba(0,102,255,1)] transition-colors duration-200 ease-in-out"
                type="submit"
                onClick={onHandleSubmit}
            >
                <div className="flex items-center justify-center w-1/2 h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48" id="magnifier" fill="white">
                        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0a9 9 0 1 1 .001-18.001A9 9 0 0 1 19 28z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                </div>

                <div className="flex items-center justify-center w-1/3 h-full">
                    Buscar
                </div>

            </button>
        </>

    )
}
