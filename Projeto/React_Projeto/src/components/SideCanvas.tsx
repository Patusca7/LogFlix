import React from 'react';
import "../App.css";
import { Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import AddMovieForm from '../components/AddMovieForm'
import AddListForm from '../components/AddListForm'
import BotaoLista from './BotaoLista';

function SideCanvas() {

    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    const handleClick = (path) => {
        navigate(path);
    };

    const navigate = useNavigate();
    const [showMovieForm, setShowMovieForm] = useState(false);
    const [showList, setShowList] = useState(false);
    const [listName, setListName] = useState('');
    const [messageListForm, setMessageListForm] = useState('');
    const [messageMovieForm, setMessageMovieForm] = useState('');
    const [userLists, setUserLists] = useState([]);
    const { userData, isLoggedIn } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [movie, setMovie] = useState({
        Title: '',
        Plot: '',
        Year: '',
        Type: '',
        Genre: '',
        Runtime: '',
        Rated: '',
        Director: '',
        Actors: '',
        Writer: '',
        Released: '',
        Country: '',
        Awards: '',
        Metascore: '',
        imdbRating: '',
        imdbVotes: '',
        BoxOffice: '',
        Poster: null
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userData && userData.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [userData]);


    const handleCloseMovieForm = () => {
        setShowMovieForm(false);
        setListName('');
        setMessageMovieForm('');
        setMovie({
            Title: '',
            Plot: '',
            Year: '',
            Type: '',
            Genre: '',
            Runtime: '',
            Rated: '',
            Director: '',
            Actors: '',
            Writer: '',
            Released: '',
            Country: '',
            Awards: '',
            Metascore: '',
            imdbRating: '',
            imdbVotes: '',
            BoxOffice: '',
            Poster: null
        });
    };

    const handleCloseList = () => {
        setShowList(false);
        setListName('');
        setMessageListForm('');
    };

    const handleShowList = () => setShowList(true);
    const handleShowMovieForm = () => setShowMovieForm(true);

    const handleCreateList = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/lists',
                { ListName: listName },
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            );
            setMessageListForm('Lista criada com sucesso!');
            setTimeout(() => {
                handleCloseList();
            }, 1000);
            fetchUserLists();
        } catch (error) {
            if (error.response && error.response.data) {
                setMessageListForm(error.response.data.message);
            } else {
                setMessageListForm('Não foi possível criar a lista.');
            }
        }
    };

    const fetchUserLists = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/lists/userLists',
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            );
            setUserLists(response.data.Lists);
        } catch (error) {
            console.error('Erro', error);
        }
    };

    useEffect(() => {
        if (userData && userData.token) {
            fetchUserLists();
        }
    }, [userData]);

    const handleAddMovie = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('Title', movie.Title);
            formData.append('Plot', movie.Plot);
            formData.append('Year', movie.Year);
            formData.append('Type', movie.Type);
            formData.append('Genre', movie.Genre);
            formData.append('Runtime', movie.Runtime);
            formData.append('Rated', movie.Rated);
            formData.append('Director', movie.Director);
            formData.append('Actors', movie.Actors);
            formData.append('Writer', movie.Writer);
            formData.append('Released', movie.Released);
            formData.append('Country', movie.Country);
            formData.append('Awards', movie.Awards);
            formData.append('Metascore', movie.Metascore);
            formData.append('imdbRating', movie.imdbRating);
            formData.append('imdbVotes', movie.imdbVotes);
            formData.append('BoxOffice', movie.BoxOffice);
            formData.append('Poster', movie.Poster);

            const response = await axios.post(
                'http://localhost:3000/movies',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            );
            setMessageListForm('Filme adicionado com sucesso!');
            setIsLoading(false);
            setTimeout(() => {
                handleCloseMovieForm();
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.data) {
                setMessageListForm(error.response.data.message);
            } else {
                setMessageListForm('Não foi possível adicionar o filme.');
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'Poster') {
            setMovie({
                ...movie,
                Poster: e.target.files[0]
            });
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            });
        }
    };




    return (
        <>
            <Button className="btn btn-dark me-2" onClick={handleShowCanvas}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <title>Botão que abre a Side Canvas</title>
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </Button>

            <Offcanvas show={showCanvas} onHide={handleCloseCanvas} scroll={true} backdrop={true} className="offcanvas-bg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ color: '#ffffff' }}>Logflix</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <Button variant="dark" className="button-style" onClick={() => handleClick("/")}>
                                <span className="fa fa-home me-2"></span>
                                <span>Início</span>
                            </Button>
                        </li>
                        <li>
                            <Button variant="dark" className="button-style" onClick={() => handleClick("/search")}>
                                <span className="fa fa-search me-2"></span>
                                <span>Procurar</span>
                            </Button>
                        </li>
                        <li>
                            {(isAdmin) && (
                                <Button variant="dark" className="button-style" onClick={handleShowMovieForm}>
                                    <span className="fa fa-plus-square me-2"></span>
                                    <span>Adicionar Filme</span>
                                </Button>
                            )}
                        </li>
                        <li>
                            {(isLoggedIn) && (
                                <Button variant="dark" className="button-style" onClick={handleShowList}>
                                    <span className="fa fa-plus-square me-2"></span>
                                    <span>Criar nova Lista</span>
                                </Button>
                            )
                            }
                        </li>
                    </ul>
                    <div className="lower bg-secondary rounded p-1">
                        <ul className="list-unstyled mb-0">
                            <li>
                                <span className="text-light ms-2 1.5rem" >
                                    <span className="fa fa-list me-2"></span>
                                    <span>As tuas Listas</span>
                                </span>
                            </li>
                            {(isLoggedIn) ?
                                <>
                                    {userLists.length > 0 ? (
                                        userLists.map((list, index) => (
                                            <li className="mt-2" key={index}>
                                                <BotaoLista list={list} fetchUserLists={fetchUserLists} />
                                            </li>
                                        ))
                                    ) : (
                                        <li className="ms-2 mt-2 text-light">Sem Listas</li>
                                    )}</> :
                                <p className='ms-2 mt-2 text-light'>Faça LogIn para Criar a Suas Listas</p>
                            }
                        </ul>
                    </div>
                    <AddListForm listName={listName} show={showList} message={messageListForm} setListName={setListName} handleClose={handleCloseList} handleCreateList={handleCreateList} />
                    <AddMovieForm movie={movie} show={showMovieForm} message={messageMovieForm} handleClose={handleCloseMovieForm} handleChange={handleChange} handleAddMovie={handleAddMovie} />
                </Offcanvas.Body >
            </Offcanvas >
        </>
    );
}

export default SideCanvas;
