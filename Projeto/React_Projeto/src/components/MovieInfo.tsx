import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import AddToList from "./AddToList";

function MovieInfo({ id }) {
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true);
            const movieData = await getMovie(id);
            setMovie(movieData);
            await fetchComments(id);
            setIsLoading(false);
        };

        fetchMovie();
    }, [id]);

    const getMovie = async (id) => {
        const response = await axios.get('http://localhost:3000/movies/?plot=full&i=' + id);
        return response.data.movie;
    };

    const fetchComments = async (id) => {
        const response = await axios.get('http://localhost:3000/comments/' + id);
        setComments(response.data.Comments);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="bg-dark p-2 rounded cursor-pointer transition-all d-flex flex-column w-100">
                            <div className="bg-dark p-1 rounded mb-2" style={{ maxWidth: '250px' }}>
                                {!isLoading ? (
                                    <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            <AddToList movieId={id} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h3 className="text-start mt-2">{!isLoading ? movie.Title : 'Loading...'}</h3>
                        <div className="d-flex flex-column justify-content-between bg-dark p-2 rounded text-white mt-2" style={{ backgroundColor: '#333' }}>
                            <div className="text-box mb-2">
                                <p className="m-0">DESCRIÇÃO</p>
                                {!isLoading ? movie.Plot : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-12">
                        <div className="text-box bg-dark p-2 rounded text-white" style={{ backgroundColor: '#333' }}>
                            <p className="m-0">INFORMAÇÕES:</p>
                            <ul className="list-group list-group-flush">
                                {!isLoading && (
                                    <>
                                        <li className="list-group-item bg-dark text-white">Ano: {movie.Year}</li>
                                        <li className="list-group-item bg-dark text-white">Tipo: {movie.Type}</li>
                                        <li className="list-group-item bg-dark text-white">Gênero: {movie.Genre}</li>
                                        <li className="list-group-item bg-dark text-white">Duração: {movie.Runtime}</li>
                                        <li className="list-group-item bg-dark text-white">Rated: {movie.Rated}</li>
                                        <li className="list-group-item bg-dark text-white">Realizador: {movie.Director}</li>
                                        <li className="list-group-item bg-dark text-white">Atores: {movie.Actors}</li>
                                        <li className="list-group-item bg-dark text-white">Argumentistas: {movie.Writer}</li>
                                        <li className="list-group-item bg-dark text-white">Lançamento: {movie.Released}</li>
                                        <li className="list-group-item bg-dark text-white">Pais de Origem: {movie.Country}</li>
                                        <li className="list-group-item bg-dark text-white">Premios: {movie.Awards}</li>
                                        <li className="list-group-item bg-dark text-white">Metascore: {movie.Metascore}</li>
                                        <li className="list-group-item bg-dark text-white">Imdb Score: {movie.imdbRating}</li>
                                        <li className="list-group-item bg-dark text-white">Nº votos no Imdb: {movie.imdbVotes}</li>
                                        <li className="list-group-item bg-dark text-white">Box Office: {movie.BoxOffice}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {!isLoading ? (
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="text-box bg-dark p-2 rounded text-white" style={{ backgroundColor: '#333' }}>
                                <p className="m-0">COMENTARIOS:</p>

                                <ul className="list-group list-group-flush">
                                    {isLoggedIn && (
                                        <li className="list-group-item bg-dark text-white">
                                            <CommentForm movieid={movie.imdbID} refreshComments={() => fetchComments(id)} />
                                        </li>
                                    )}
                                    {comments.length > 0 ? (
                                        comments.map((comment, index) => (
                                            <li className="list-group-item bg-dark text-white" key={index}>
                                                <Comment comment={comment} refreshComments={() => fetchComments(id)} />
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item bg-dark text-white">No comments found</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div><p>Loading...</p></div>
                )}
            </div>
        </>
    );
}

export default MovieInfo;
