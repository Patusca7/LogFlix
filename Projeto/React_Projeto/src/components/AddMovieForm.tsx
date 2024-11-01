import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddMovieForm({movie, show, message, handleClose, handleChange, handleAddMovie}) {
    return (
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Filme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título do filme"
                                name="Title"
                                value={movie.Title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlot">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Descrição do filme"
                                name="Plot"
                                value={movie.Plot}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formYear">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ano de lançamento"
                                name="Year"
                                value={movie.Year}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Filme"
                                name="Type"
                                value={movie.Type}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGenre">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Genero do filme"
                                name="Genre"
                                value={movie.Genre}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRuntime">
                            <Form.Label>Duração</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Duração do filme"
                                name="Runtime"
                                value={movie.Runtime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRated">
                            <Form.Label>Classificação</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Classificação indicativa"
                                name="Rated"
                                value={movie.Rated}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDirector">
                            <Form.Label>Diretor</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Diretor do filme"
                                name="Director"
                                value={movie.Director}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formActors">
                            <Form.Label>Atores</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Atores principais"
                                name="Actors"
                                value={movie.Actors}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWriter">
                            <Form.Label>Argumentistas</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Argumentistas"
                                name="Writer"
                                value={movie.Writer}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formReleased">
                            <Form.Label>Lançamento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Aata de lançamento"
                                name="Released"
                                value={movie.Released}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCountry">
                            <Form.Label>País de Origem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="País de origem"
                                name="Country"
                                value={movie.Country}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAwards">
                            <Form.Label>Prêmios</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Prémios recebidos"
                                name="Awards"
                                value={movie.Awards}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMetascore">
                            <Form.Label>Metascore</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pontuação do Metascore"
                                name="Metascore"
                                value={movie.Metascore}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formImdbRating">
                            <Form.Label>IMDb Score</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pontuação do IMDb"
                                name="imdbRating"
                                value={movie.imdbRating}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formImdbVotes">
                            <Form.Label>Nº votos no IMDb</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Número de votos no IMDb"
                                name="imdbVotes"
                                value={movie.imdbVotes}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBoxOffice">
                            <Form.Label>Box Office</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a bilheteria"
                                name="BoxOffice"
                                value={movie.BoxOffice}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPoster">
                            <Form.Label>Poster</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                name="Poster"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                    {message && <p className="mt-2">{message}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddMovie}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default AddMovieForm;