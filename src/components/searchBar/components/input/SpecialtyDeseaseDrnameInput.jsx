import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'react-router-dom';
import { SpecialtyDeseaseDrnameWrapper } from "./SpecialtyDeseaseDrnameWrapper";

export const SpecialtyDeseaseDrnameInput = ({ inputValue, setInputValue }) => {

    /* HANDLE SEARCH PARAMS */
    const [searchParams] = useSearchParams();

    /* HANDLE AUTOCOMPLETE WHEN DATA IS SELECTED */
    const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
    const [spanIsVisible, setSpanIsVisible] = useState(
        !!searchParams.get("SDDsearch")
    );

    const containerRef = useRef(null);
    const [displayValue, setDisplayValue] = useState(inputValue || '');

    useEffect(() => {
        if (!inputValue) setDisplayValue('');
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setDropdownIsVisible(false);
                setDisplayValue(inputValue || '');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [inputValue]);


    /* HELPERS */
    const onInputValue = ({ target }) => {
        const value = target.value;
        setDisplayValue(value);
        setDropdownIsVisible(value.length > 0);
        if (value.length === 0) setSpanIsVisible(false);
    }

    const handleValueSelection = (selectedValue) => {
        setDisplayValue(selectedValue);
        setInputValue(selectedValue);
        setDropdownIsVisible(false);
        setSpanIsVisible(true);
    }

    const onClickSpan = (e) => {
        e.preventDefault();
        setDisplayValue('');
        setInputValue('');
        setSpanIsVisible(false);
        searchParams.delete("SDDsearch");
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start ">

                <div
                    id="autocomplete-speciality-wrapper"
                    className="relative flex flex-col items-center w-auto"
                    ref={containerRef}
                >
                    <div className="relative w-[300px]">
                        <input
                            id="autocomplete-speciality-input"
                            className="bg-[#555555] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent w-full h-[50px] pl-12 pr-[40px] placeholder:italic focus:bg-[#666666] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black"
                            type="text"
                            placeholder="Med. General, Meredith Grey"
                            value={displayValue}
                            onChange={onInputValue}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            name="search"

                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" id="magnifier">
                                <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0a9 9 0 1 1 .001-18.001A9 9 0 0 1 19 28z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </span>

                        <div className={`transition-opacity duration-1000 ease-in-out ${spanIsVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={onClickSpan}
                            >
                                <span className="cursor-pointer relative w-[22px] h-[22px] hover:bg-black bg-[#6e6e6e] transition-colors duration-700 ease-in-out rounded-full flex items-center justify-center group"  >
                                    <svg className="fill-white p-[1px] cursor-pointer flex items-center justify-center" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 30 30">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className={`absolute top-full left-0 w-[300px] mt-2 z-50 transition-all duration-200 ease-out overflow-hidden ${dropdownIsVisible ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="bg-[#555555] text-white rounded-lg w-full overflow-hidden">
                            <div className="max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
                                <SpecialtyDeseaseDrnameWrapper
                                    inputValue={displayValue}
                                    onValueSelected={handleValueSelection}
                                />
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="relative flex flex-col items-center w-auto mt-2 gap-2">

                    <div className="w-full">
                        <p className="text-left text-sm">Sugeridos</p>
                    </div>

                    <div className="relative flex flex-col items-center w-auto mt-1 gap-1">

                        <button className="bg-[#515151] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent w-[250px] h-[50px] pl-4 pr-4 cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black hover:bg-[#989898]"
                            onClick={(e) => {
                                e.preventDefault();
                                setDisplayValue("Arritmia");
                                setInputValue("Arritmia");
                                setDropdownIsVisible(false);
                                setSpanIsVisible(true);
                            }}
                        >
                            Arritmia
                        </button>
                        <button className="bg-[#515151] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent w-[250px] h-[50px] pl-4 pr-4 cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black hover:bg-[#989898]"
                            onClick={(e) => {
                                e.preventDefault();
                                setDisplayValue("Cardiología");
                                setInputValue("Cardiología");
                                setDropdownIsVisible(false);
                                setSpanIsVisible(true);
                            }}
                        >
                            Cardiología
                        </button>
                        <button className="bg-[#515151] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent w-[250px] h-[50px] pl-4 pr-4 cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black hover:bg-[#989898]"
                            onClick={(e) => {
                                e.preventDefault();
                                setDisplayValue("Dermatología");
                                setInputValue("Dermatología");
                                setDropdownIsVisible(false);
                                setSpanIsVisible(true);
                            }}
                        >
                            Dermatología
                        </button>
                    </div>
                </div>

            </div>

        </>
    )



}

