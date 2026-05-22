
import { AttentionType } from "./attentionType/AttentionType"
import { HealthCenter } from "./healthCenter/HealthCenter"
import { DiseaseSelection } from "./diseasesSelection/input/DiseaseSelection"



export const SecondaryFilters = ({attentionType, setAttentionType, healthcareCenterValue, setHealthcareCenterValue, diseaseSelectionValue, setDiseaseSelection, diseasesList, setDiseaseList}) => {

    return (
        <>
            <div className="bg-[#a7a7a7] rounded-2xl w-[400px] max-w-[calc(100vw-2rem)] mx-auto max-h-full flex flex-col">

                {/* Non-scrollable header — AttentionType lives here so iOS touch events are unaffected by overflow containers */}
                <div className="px-6 pt-3 shrink-0">
                    <div className="flex justify-center p-2">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Filtros secundarios
                        </h1>
                    </div>
                    <AttentionType
                        attentionType={attentionType}
                        setAttentionType={setAttentionType}
                    />
                </div>

                {/* Scrollable section — dropdowns open downward and are clipped by this div, not the action bar */}
                <div className="overflow-y-auto flex-1 px-6 pb-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/30 [&::-webkit-scrollbar-thumb]:rounded-full">
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
