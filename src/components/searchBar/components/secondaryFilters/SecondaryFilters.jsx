
import { AttentionType } from "./attentionType/AttentionType"
import { HealthCenter } from "./healthCenter/HealthCenter"
import { DiseaseSelection } from "./diseasesSelection/input/DiseaseSelection"



export const SecondaryFilters = ({attentionType, setAttentionType, healthcareCenterValue, setHealthcareCenterValue, diseaseSelectionValue, setDiseaseSelection, diseasesList, setDiseaseList}) => {


    return (
        <>
            <div className="bg-[#a7a7a7] rounded-2xl w-[400px] max-w-[calc(100vw-2rem)] mx-auto px-6 pb-3 max-h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="flex justify-center sticky top-0 bg-[#a7a7a7] p-2">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Filtros secundarios
                    </h1>
                </div>

                <div className="">

                    <AttentionType
                        attentionType={attentionType}
                        setAttentionType={setAttentionType}
                    />
                    <HealthCenter
                        healthcareCenterValue={healthcareCenterValue}
                        setHealthcareCenterValue={setHealthcareCenterValue}
                    />

                    <DiseaseSelection
                        diseaseSelectionValue={diseaseSelectionValue}
                        setDiseaseSelection={setDiseaseSelection}
                        diseasesList={diseasesList}
                        setDiseaseList={setDiseaseList}
                    />


                </div>


            </div>
        </>
    )
}
