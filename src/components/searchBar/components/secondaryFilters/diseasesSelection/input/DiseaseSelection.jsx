import { DiseaseSelectionInput } from "./input/DiseaseSelectionInput"


export const DiseaseSelection = ({diseaseSelectionValue, setDiseaseSelection, diseasesList, setDiseaseList}) => {
    return (
        <>
            <div className="pl-6">
                <h2>
                    Enfermedades
                </h2>
            </div>
            <DiseaseSelectionInput
                diseaseSelectionValue={diseaseSelectionValue}
                setDiseaseSelection={setDiseaseSelection}
                diseasesList={diseasesList}
                setDiseaseList={setDiseaseList}
            />
        </>
    )
}

