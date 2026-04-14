import { BrowserRouter } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';

export const IndexSearchBar = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => { setVisible(true); }, []);

    return (
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease-in' }}>
            <BrowserRouter>
                <SearchBar hideNavBar={true} />
            </BrowserRouter>
        </div>
    );
};
