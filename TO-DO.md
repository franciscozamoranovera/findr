
# TO-DO

# [X] - function getSpecialtyDiseaseDoctorName() is returning "undefined"
    1. hint: drNames are returning undefined. (Nailed).

# [X] - Create Datos Busqueda in a separate .astro file where to push data.
# [X] - Juntar todo...
    1. Issue: Is the prevision and tipoAtencion that are expected to receive an string[] in TS instead an string "".
    2. Prevision is not taking care of previous results... when selected, bring all the data regardless the primary filter.
# [X] - Separate the main filter and put it into Doctor Profile Page: COMPONENT.
    Desc: Cuando se presione "Buscar" mostrar página de resultados. (mientras estará en hide.)
    H:
        1.traspasar FINDR INPUTS (btn search) a una sola función que ejecute todo (btn buscar es el trigger): CONVERTIR EN COMPONENTE
        2.((1)primary filter + btn search): solo lógica buttons (dropdonw) and exec of showresults function in btn  + ((2)showResults + sec. filter): section que debe
        aparecer cuando se presiona btn search (ruta /seachresults)

# [X] - Create the Doctor Profile Page.
    1. Finish the design (base) and also add a view where the Dr have no review.
# [X] - Create the graph logic (google sheet)
    - https://docs.google.com/spreadsheets/d/1upKYno6QkU0R3Uqsgwhzkxji3ouN7lYQv21vonrgXTU/edit?gid=0#gid=0
# [X] - Create a doctor DB (API)
# [X] - Create the routes to connect cards and profile page.
# [X] - (CONVERT TO DROPDOWN COMUNAS & REGIONS)Load Regiones and Comunas directly from astro files...Put the data directly on buttons using JSX of Astro. Use script just for dynamic loading from API*** Check this anyways.
    HINT:
    1. Al parecer, tener scrip separados no sirve... debe estar toda la logica en uno solo...poner la data directamente en botones SOLO SERVIRÁ PARA COMUNAS Y REGIONES ...
# [X] - ORDENAR ARCHIVOS Y AGREGAR DIRECTIVAS(CREAR ISLAS). Divide components in: DatosBusqueda (to gather the inputs) + FilterInputs (Main filter bar) + ShowResults(show results with extra filters)
    TASKs: 
    1. OK - <FilterInputs title="Findr.it">
            TODO: separar filter inputs (barra principal) y agregar showResults abajo de este componente 
        </FilterInputs> 
    2. OK - Delete "Findr" component.
    4. OK - BUGs: Subspeciality and speciality are "duplicated", and are not getting assigned as expected.

# [X] - Fix Speciality and Sub speciality. If are the same name, Sub and Spe get allocated in the same datosBusqueda key.

# [X] - Make the conversion of words and add the new ones of DOCTOR SCHEMA (datosBusqueda.ts). All according to the DB

# [X] - Findr BTN: Send info when clicking.

# [X] - ShowResults: Show the results. Secondary filter issue on performing.
    Hints:
    1. Take a look to the big picture and struture the islands well
    3. RESULTS IS A PAGE! When result btn is clicked, you get re-directed to a page.
    4. ()LOCAL STORAGE:
        - results.astro: showFilter() must have the local storage
        - filterInputs.astro: filter BTN must have the LS ?? 
    5. USAR SOLID.JS : 

# [X] - Learn REACT.JS
# [] - Craete components using REACT (searchBar)

# [] - Create the pages of each doctor (link for every card <a>)

# [] - Make WEB Responsive
    1. Findr filters on phone shoud go on bottom

# [] - 
# [] - Create a review DB (API)
# [] - Probar pasar estilos en componente a directorio (forzar client:load)
# [] - Multi browser alignment. Make sure everything works exact the same way in every browser (mobile included)


