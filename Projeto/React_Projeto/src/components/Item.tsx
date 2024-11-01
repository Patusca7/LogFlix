import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Item({ id }) {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getMovie(id);
            setMovie(movieData);
        };

        fetchMovie();
    }, [id]);

    const handleMovie = (id) => {
        navigate('/movie/' + id);
    };

    const getMovie = async (id) => {
        const response = await axios.get('http://localhost:3000/movies/?plot=full&i=' + id);
        return response.data.movie;
    }


    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <button type="button" className="btn btn-dark p-1 rounded cursor-pointer transition-all" onClick={() => handleMovie(id)} style={{ minWidth: '140px', width: '160px' }}>
                <img src={movie.Poster} className="img-fluid rounded mb-2" alt="Playlist" />
                <h4 className="text-white text-truncate mb-2">{movie.Title} </h4>
                <p className="text-white small mb-0">{movie.Director}</p>
            </button >
        </>
    );
}

export default Item;
