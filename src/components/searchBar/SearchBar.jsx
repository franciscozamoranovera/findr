/* COMPONENT OBJECTIVES:
    1. Display the filters, divided between primary and secondary filters.
    2. Primary Filter: Search by Region, Comuna & Disease, Dr Name or Dr. Speciality/Sub.
    3. Secondary Filter: Search (combined w/Primary) by Attention Type, Healthcare Center, Diseases (+1).
*/

/* IDEAS TO IMPROVE THE COMPONENT:
    1. Evaluate whether Subdivide the whole component into components...
*/


import { RegionComuna } from "./components/dropdown/RegionComuna"
import { SpecialtyDeseaseDrnameInput } from "./components/input/SpecialtyDeseaseDrnameInput"
import { SearchButton } from "./components/button/SearchButton"
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { regions } from "@/data/regionsComunas";
import { PrevisionButtons } from "./components/prevision/PrevisionButtons";
import { SecondaryFilters } from "./components/secondaryFilters/SecondaryFilters";
import { ClearButton } from "./components/button/ClearButton";



export const SearchBar = () => {

    // UTILS

    /* searchParams to persist the search data of searchBar (if web is reloaded, the data do not get lost)*/
    const [searchParams, setSearchParams] = useSearchParams();


    // HANDLE MODALS

    /* Main filter modal */
    const [isOpen, setIsOpen] = useState(false);

    /* Secondary filter modal */
    const [isSecFilterOpen, setIsSecFiltersOpen] = useState(false);


    // HANDLE PRIMARY SEARCH FILTERS

    /* Region dropdown list */
    const [selectedRegion, setSelectedRegion] = useState(
        //recupera URL, util para recargar web y mantener los resultados del filtro.
        searchParams.get('region') || ""
    );

    /* Comuna list dropdown population */
    const [comunas, setComunas] = useState([]);

    /* Comuna change linked to Region */
    const [selectedComuna, setSelectedComuna] = useState(
        searchParams.get('comuna') || ""
    );

    /* SDDsearch input (Speciality and Sub speciality, Diseases, Dr Name) */
    const [inputValue, setInputValue] = useState(
        searchParams.get('SDDsearch') || ""
    );


    /* Handle Prevision buttons */
    const [fonasaButton, setFonasaButton] = useState(
        searchParams.get('prevision') || null
    );
    const [isapreButton, setIsapreButton] = useState(
        searchParams.get('prevision') || null
    );
    const [particularButton, setParticularButton] = useState(
        searchParams.get('prevision') || null
    );


    //  HANDLE SECONDARY SEARCH FILTERS

    /* Attention Type filter buttons */
    const [attentionType, setAttentionType] = useState(
        searchParams.get('attentiontype') || null
    );

    /* HealthcareCenter input */
    const [healthcareCenterValue, setHealthcareCenterValue] = useState(
        searchParams.get('healthcareCenter') || ""
    );

    /* Autocomplete diseases wrapper (dropdown list) */
    const [diseaseSelectionValue, setDiseaseSelection] = useState([]);

    /* Diseases selected (combined +1) */
    const [diseasesList, setDiseaseList] = useState(() => {
        const diseaseSelectionParam = searchParams.get('diseaseSelection');

        if (diseaseSelectionParam) {
            // Si es un string, lo convertimos a array... al recargar URL
            return Array.isArray(diseaseSelectionParam) ? diseaseSelectionParam : [diseaseSelectionParam];
        }
        return [];

        /* 
        1. Usa una función de inicialización en useState para manejar la lógica de parsing
        2. Verifica si el parámetro existe antes de procesarlo.
        3. Convierte el string a array si es necesario usando Array.isArray() para verificar el tipo.
        4. Retorna un array vacío como fallback si no hay parámetro.
        */
    });

    // UTILS

    /* Populate the dropdown list Comuna according Region  */
    useEffect(() => {

        if (selectedRegion) {
            const filterRegionVal = regions.find(region => Object.keys(region)[0] === selectedRegion);
            const comunaList = Object.values(filterRegionVal)[0];
            setComunas(comunaList);
        }

    }, [selectedRegion]);


    /* Modal control. Avoid reload or scroll, just a fixed view*/
    useEffect(() => {
        if (isOpen || isSecFilterOpen) {
            document.body.style.overflow = 'hidden';
            
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen, isSecFilterOpen]);



    return (
        <>

            {!isOpen && (

                <div className="flex items-center justify-center w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4 pt-6">

                    {(inputValue || selectedRegion || selectedComuna || fonasaButton || isapreButton || particularButton) && (
                        <ClearButton
                            setInputValue={setInputValue}
                            setSelectedRegion={setSelectedRegion}
                            setSelectedComuna={setSelectedComuna}
                            setFonasaButton={setFonasaButton}
                            setIsapreButton={setIsapreButton}
                            setParticularButton={setParticularButton}

                            /* sec filters */
                            setAttentionType={setAttentionType}
                            setHealthcareCenterValue={setHealthcareCenterValue}
                            setDiseaseList={setDiseaseList}
                        />
                    )}
                    <button onClick={() => setIsOpen(true)} className="bg-[#ffffff] w-full min-w-[250px] max-w-[350px] h-[60px]  px-3 py-3 rounded-full border border-[#b9b9b9] flex flex-col items-center justify-center m-1 shadow-[0_0_10px_rgba(0,0,0,0.2)]">

                        {(inputValue || selectedRegion || selectedComuna || fonasaButton || isapreButton || particularButton) && (

                            <div className="min-w-[250px] w-full">

                                <div className="flex justify-center w-full" >
                                    {
                                        inputValue && (
                                            <div className="max-w-[350px] truncate">
                                                <p className="text-[#2e3ffc] text-sm font-semibold truncate">
                                                    {inputValue}
                                                </p>
                                            </div>
                                        )}
                                    {
                                        !inputValue && (
                                            <p className="text-[#505050] text-sm font-semibold truncate">
                                                Elige médico, especialidad o patología
                                            </p>
                                        )
                                    }

                                </div>

                                <div className="flex flex-row gap-1 justify-center m-1 ">

                                    <div className="truncate max-w-[150px]">
                                        {
                                            selectedRegion && (
                                                <p className="text-[#2e3ffc] text-xs font-semibold truncate">
                                                    {selectedRegion}
                                                </p>
                                            )}
                                        {
                                            !selectedRegion && (
                                                <p className="text-[#505050] text-xs font-semibold truncate">
                                                    Elige tu región
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div className="text-[#505050] text-xs font-bold">
                                        •
                                    </div>

                                    <div className="truncate max-w-[150px]">
                                        {
                                            selectedComuna && (
                                                <p className="text-[#2e3ffc] text-xs font-semibold truncate">
                                                    {selectedComuna}
                                                </p>
                                            )}
                                        {
                                            !selectedComuna && (
                                                <p className="text-[#505050] text-xs font-semibold">
                                                    Elige tu comuna
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        )}

                        {!(inputValue || selectedRegion || selectedComuna || fonasaButton || isapreButton || particularButton) && (
                            <div className="flex flex-row items-center justify-start relative w-full">
                                <svg
                                    className="absolute left-3"
                                    width="20"
                                    height="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    >
                                    <path fill="#2d2d2d" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208M208 352a144 144 0 1 0 0-288a144 144 0 1 0 0 288" />
                                </svg>
                                <p className="text-black text-sm text-center w-full">
                                    Médico, enfermedad o especialidad
                                </p>
                            </div>
                        )}
                    </button>

                    {(inputValue || selectedRegion || selectedComuna || fonasaButton || isapreButton || particularButton) && (
                        <div className="flex justify-center items-center">

                            {/* filter button */}
                            <button
                                className="flex justify-center items-center cursor-pointer transition-colors duration-300 ease-in-out rounded-3xl sm:w-20 hover:underline hover:text-blue-700"
                                onClick={() => setIsSecFiltersOpen(true)}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z" /></svg>

                                <p className="hidden  md:block font-medium ml-1">
                                    Filtros
                                </p>
                            </button>

                            {isSecFilterOpen && (

                                <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[100]">
                                    <div className="flex justify-end m-4">
                                        <button
                                            className="bg-black text-white px-4 py-2 rounded-full cursor-pointer text-m hover:text-black hover:bg-[#fafafa] transition-colors duration-200 ease-in-out"
                                            onClick={() => setIsSecFiltersOpen(false)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <SecondaryFilters
                                            attentionType={attentionType}
                                            setAttentionType={setAttentionType}
                                            healthcareCenterValue={healthcareCenterValue}
                                            setHealthcareCenterValue={setHealthcareCenterValue}
                                            diseaseSelectionValue={diseaseSelectionValue}
                                            setDiseaseSelection={setDiseaseSelection}
                                            diseasesList={diseasesList}
                                            setDiseaseList={setDiseaseList}
                                        />

                                        <div className="sticky bottom-0 flex justify-between w-[350px] items-center p-3 mr-4 ml-4 rounded-xl  bg-black/30 backdrop-blur-lg z-10" >
                                            <div>
                                                {/* botón local*/}
                                                <button
                                                    className="text-white underline hover:text-black cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        /* clear filters value */
                                                        setAttentionType(null);
                                                        setHealthcareCenterValue("");
                                                        setDiseaseList([]);

                                                        /* clear URL */
                                                        searchParams.delete("attentiontype")
                                                        searchParams.delete("healthcareCenter")
                                                        searchParams.delete("diseaseSelection")
                                                        setSearchParams(searchParams)

                                                    }}
                                                >
                                                    Limpiar filtro
                                                </button>

                                            </div>
                                            <div>
                                                <SearchButton
                                                    /* handle modals */
                                                    setIsOpen={setIsOpen}
                                                    setIsSecFiltersOpen={setIsSecFiltersOpen}
                                                    /* prim filters */
                                                    inputValue={inputValue}
                                                    selectedRegion={selectedRegion}
                                                    selectedComuna={selectedComuna}
                                                    fonasaButton={fonasaButton}
                                                    isapreButton={isapreButton}
                                                    particularButton={particularButton}
                                                    /* sec filters */
                                                    attentionType={attentionType}
                                                    healthcareCenterValue={healthcareCenterValue}
                                                    diseaseSelectionValue={diseaseSelectionValue}
                                                    diseasesList={diseasesList}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                    )}
                </div>
            )}


            {isOpen && (

                // MODAL PRIMARY FILTER

                /* main background */
                <div className="fixed inset-0 bg-black/55 backdrop-blur-2xl z-50" >
                    <div className="flex justify-end m-4">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-full cursor-pointer text-m hover:text-black hover:bg-[#fafafa] transition-colors duration-200 ease-in-out"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Filter Container */}
                    <div className="flex flex-col items-center">

                        <PrevisionButtons
                            fonasaButton={fonasaButton}
                            setFonasaButton={setFonasaButton}
                            isapreButton={isapreButton}
                            setIsapreButton={setIsapreButton}
                            particularButton={particularButton}
                            setParticularButton={setParticularButton}
                        />

                        <form className="flex flex-col gap-1 items-center justify-center">

                            <div className="max-h-[calc(80vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden">

                                <div className="rounded-2xl  bg-[#7f7f7f] px-3 py-3 ">

                                    <div className="flex flex-col items-center w-full ">
                                        <h2 className="text-black p-2 text-lg">
                                            Especialidad, Nombre o Patología
                                        </h2>
                                    </div>

                                    <SpecialtyDeseaseDrnameInput
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                    />

                                </div>

                                <div className="py-5 px-2">
                                    <RegionComuna
                                        selectedRegion={selectedRegion}
                                        setSelectedRegion={setSelectedRegion}
                                        selectedComuna={selectedComuna}
                                        setSelectedComuna={setSelectedComuna}
                                        comunas={comunas}
                                        setComunas={setComunas}

                                    />
                                </div>

                            </div>

                            <div className="sticky bottom-0 flex justify-between w-[325px] items-center p-3 mr-4 ml-4 rounded-xl bg-[#959595] backdrop-blur-xl z-10" >
                                <div>
                                    {/* Clear everything (prim. and sec.) from primary filter */}
                                    <ClearButton
                                        /* prim filters */
                                        setInputValue={setInputValue}
                                        setSelectedRegion={setSelectedRegion}
                                        setSelectedComuna={setSelectedComuna}
                                        setFonasaButton={setFonasaButton}
                                        setIsapreButton={setIsapreButton}
                                        setParticularButton={setParticularButton}

                                        /* sec filters */
                                        setAttentionType={setAttentionType}
                                        setHealthcareCenterValue={setHealthcareCenterValue}
                                        setDiseaseList={setDiseaseList}
                                    />
                                </div>
                                <div>
                                    <SearchButton
                                        /* handle modals */
                                        setIsOpen={setIsOpen}
                                        setIsSecFiltersOpen={setIsSecFiltersOpen}
                                        /* prim filters */
                                        inputValue={inputValue}
                                        selectedRegion={selectedRegion}
                                        selectedComuna={selectedComuna}
                                        fonasaButton={fonasaButton}
                                        isapreButton={isapreButton}
                                        particularButton={particularButton}
                                        /* sec filters */
                                        attentionType={attentionType}
                                        healthcareCenterValue={healthcareCenterValue}
                                    />
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            )}
        </>
    )
}
