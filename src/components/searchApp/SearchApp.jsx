/* COMPONENT OBJECTIVES:
    1. Manage the filter results routes.

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchBar } from "../searchBar/SearchBar";
import { SearchResults } from "../searchResults/SearchResults";



export const SearchApp = () => {
    return (
        /* Routing managed by react-router-dom, show:
            1. SearchBar (nav)
            2. Display SearchResults component using routes.
        */
        <BrowserRouter>
            <SearchBar client:load />
            <Routes>
                <Route path="/search" element={<SearchResults/>} />
            </Routes>
        </BrowserRouter>
    )
}
