import React from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../components/Item';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import "../App.css"

function SearchPage() {
    const location = useLocation();
    const { searchTerm, results } = location.state || { searchTerm: "", results: [] };

    return (
        <>
            <NavBar />
            <div className=" page-background">

                <div className="row justify-content-center full-heigth-container ms-2 ">
                    <div style={{ padding: '20px' }}>
                        <h2>Search Results for "{searchTerm}"</h2>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                            }}
                        >
                            {results.length > 0 ? (
                                results.map((result) => (
                                    <Item id={result.imdbID} />
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </div>
                    <Footer />
                </div>
            </div >
        </>
    );
}

export default SearchPage;
