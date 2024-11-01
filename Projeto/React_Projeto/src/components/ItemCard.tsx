import { Container, Col, Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';

function ItemCard({ id, listId, onRemove }) {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { userData } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const getMovie = async (id) => {
        const response = await axios.get('http://localhost:3000/movies/?plot=full&i=' + id);
        return response.data.movie;
    }

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getMovie(id);
            setMovie(movieData);
        };

        fetchMovie();
    }, [id, userData]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const handleCardClick = () => {
        navigate(`/movie/${id}`);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (event) => {
        event.stopPropagation();
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/lists/movie/${listId}`, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                },
                data: { movieId: id }
            });
            onRemove(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Col md={3} className="mb-3">
            <Container>
                <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                    <Card.Img variant="top" src={movie.Poster} alt={`${movie.Type} Image`} />
                    <Card.Body>
                        <Card.Title>{movie.Title} <span className="float-end" /></Card.Title>
                        <Card.Text>
                            <strong>{"Rating: " + movie.imdbRating + "/10"}</strong>
                            <br/>
                            {movie.Runtime} 
                        </Card.Text>
                        <button type="button" className="btn btn-danger position-absolute" onClick={handleShowModal} style={{ bottom: '10px', right: '10px' }}> Remover</button>
                    </Card.Body>
                </Card>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remover o Filme da Lista</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza que deseja remover este filme?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Remover
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Col>
    );
}

export default ItemCard;