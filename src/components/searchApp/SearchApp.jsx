/* COMPONENT OBJECTIVES:
    1. Manage the filter results routes.

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchBar } from "../searchBar/SearchBar";
import { SearchResults } from "../searchResults/SearchResults";
import { DoctorProfile } from '../doctorProfile/DoctorProfile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';


export const SearchApp = () => {

    /* React Query (tanstack) */
    const queryClient = new QueryClient();

    return (
        /* Routing managed by react-router-dom, show:
            1. SearchBar (nav)
            2. Display SearchResults component using routes.
        */
        <BrowserRouter>
            <QueryClientProvider client={queryClient}> {/* Involve the entire app */}
                <SearchBar client:load />
                <Routes>
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/doctor/:id" element={<DoctorProfile />} />
                </Routes>
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>}
            </QueryClientProvider>
        </BrowserRouter>
    )
}
