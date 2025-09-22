import { HealthcareCenterInput } from "./input/HealthCareInput"


export const HealthCenter = ({healthcareCenterValue, setHealthcareCenterValue}) => {


    return (
        <>
            <div className="pl-6">
                <h2>
                    Centro de Atención
                </h2>
            </div>
            <HealthcareCenterInput
                healthcareCenterValue={healthcareCenterValue}
                setHealthcareCenterValue={setHealthcareCenterValue}
            />
        </>
    )
}

