
export const navigation = ({
    inputValue,
    selectedRegion,
    selectedComuna,
    fonasaButton,
    isapreButton,
    particularButton,
    attentionType,
    healthcareCenterValue,
    diseasesList,
    navigate,
    closeModals,

}) => {

    const params = new URLSearchParams();

    if (inputValue) params.set("SDDsearch", inputValue);
    if (selectedRegion) params.set("region", selectedRegion);
    if (selectedComuna) params.set("comuna", selectedComuna);
    if (fonasaButton || isapreButton || particularButton) params.set("prevision", fonasaButton || isapreButton || particularButton)
    if (attentionType) params.set("attentiontype", attentionType);
    if (healthcareCenterValue) params.set("healthcareCenter", healthcareCenterValue);
    if (diseasesList && diseasesList.length > 0) params.set("diseaseSelection", diseasesList)

    navigate(`/search?${params.toString()}`)

    if (typeof closeModals === "function") {
        closeModals();
      }

}