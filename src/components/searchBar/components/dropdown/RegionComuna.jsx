
/* Regions & comuna data */
import { regions } from "@/data/regionsComunas";
const regionList = regions.map(data => Object.keys(data)[0]);


export const RegionComuna = ({ selectedRegion, setSelectedRegion, selectedComuna, setSelectedComuna,comunas, setComunas }) => {


    /* HELPERS */
    const handleRegionChange = (e) => {
        const captureRegionVal = e.target.value;
       
        if (captureRegionVal === 'Región') {

            // Reset to initial state
            setSelectedRegion("");
            setSelectedComuna("");
            setComunas([]);
            return;
        }


        setSelectedRegion(captureRegionVal);


        const filterRegionVal = regions.find(region => Object.keys(region)[0] === captureRegionVal)
        const comunaList = Object.values(filterRegionVal)[0];


        if (filterRegionVal) {
            setComunas(comunaList);
            setSelectedComuna(""); //reset "comuna" when setSelecterRegion changes.
        }

    }

    const handleComunaChange = (e) => {
        const captureComunaVal = e.target.value;
        setSelectedComuna(captureComunaVal);
    }


    return (
        <>
            <div id="region-dropdown" className="flex flex-col gap-4 items-center justify-center">
                
                <select id="region-dropdown-list" className="bg-[#555555] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent h-[50px] w-[300px] cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black"

                    value={selectedRegion}
                    onChange={handleRegionChange}
                >
                    <option
                        /* disabled */
                        value="Región"
                        className="region-dp-list"
                        id="region-dp-list">

                        Región
                    </option>

                    {regionList.map(region => {
                        return <option key={region} value={region}>{region}</option>

                    })}

                </select>

                <div id="comuna-dropdown">
                    <select id="comuna-dropdown-list" className="bg-[#555555] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-transparent w-[300px] h-[50px] pl-4 pr-4 cursor-pointer transition-colors duration-700 ease-in-out border border-transparent hover:border-black focus:border-black"
                        value={selectedComuna}
                        onChange={handleComunaChange}
                    >
                        <option
                            value="Comuna"
                            className="region-dp-list"
                            id="comuna-dp-list">

                            Comuna
                        </option>
                        {comunas.map(comuna => {
                            return <option key={comuna} value={comuna}>{comuna}</option>

                        })}

                    </select>
                </div>
            </div>
        </>

    )
}



