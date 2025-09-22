
import { AttentionType } from "./attentionType/AttentionType"
import { HealthCenter } from "./healthCenter/HealthCenter"
import { DiseaseSelection } from "./diseasesSelection/input/DiseaseSelection"



export const SecondaryFilters = ({attentionType, setAttentionType, healthcareCenterValue, setHealthcareCenterValue, diseaseSelectionValue, setDiseaseSelection, diseasesList, setDiseaseList}) => {


    return (
        <>
            <div className="bg-[#a7a7a7] rounded-2xl w-[90%] max-w-3xl mx-auto px-6 pb-3 max-h-80vh overflow-y-auto [&::-webkit-scrollbar]:hidden">
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

