import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const results = await search(searchTerm);
        navigate('/search', { state: { searchTerm, results } });
    };

    const search = async (term) => {
        if (term.length > 0) {
            const response = await axios.get(`http://localhost:3000/movies/search?s=${term}`);
            const data = response.data.Search;
            return data;
        } else {
            return [];
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={searchTerm}
                        onChange={handleInputChange} // Add onChange handler here
                    />
                    <button type="submit" className="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <title>Botão de Pesquisa</title>
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
