import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ItemCard from './ItemCard';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import ConfirmationPopup from './ConfirmationPopup';
import { useNavigate } from "react-router-dom";

function List({ listId }) {
  const [movies, setMovies] = useState([]);
  const [listName, setListName] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(AuthContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieInList = async () => {
      setIsLoading(true);
      const listData = await getMoviesInList(listId);
      setMovies(listData.Movies);
      setListName(listData.Name);
      setIsLoading(false);
    };

    fetchMovieInList();
  }, [listId, userData]);

  const getMoviesInList = async (id) => {
    const response = await axios.get('http://localhost:3000/lists/user/' + id, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });
    return response.data;
  };

  const handleRemoveMovie = (movieId) => {
    setMovies(movies.filter(movie => movie !== movieId));
  };

  const handleShowPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const deleteList = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/lists/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        }
      );
      setMessage("Lista deletada com sucesso");
      setTimeout(() => {
        handleClosePopUp();
        setMessage("");
        navigate('/');
      }, 500);
      
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao deletar a lista');
      }
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="text-center bg-dark text-white">
          <h5>{(!isLoading) ? listName : "isLoading..."}</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <span className="me-3">Filmes na Lista: {(!isLoading) ? movies.length : "isLoading..."}</span>
            </Col>
            <Col className="text-end">
              <Button variant="danger" onClick={handleShowPopUp}>
                <span className="fa fa-trash me-1"></span>
                Eliminar Lista
              </Button>
            </Col>
          </Row>
          {!isLoading ? (
            <Row>
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <ItemCard key={movie} id={movie} listId={listId} onRemove={handleRemoveMovie} />
                ))
              ) : (
                <Col>Lista vazia.</Col>
              )}
            </Row>
          ) : (
            <p>Loading...</p>
          )}
        </Card.Body>
      </Card>
      <ConfirmationPopup 
        show={showPopUp} 
        message={message} 
        onConfirm={deleteList} 
        onClose={handleClosePopUp} 
        bodyText={listName} 
        title={"Tem a certeza que quer apagar a lista?"} 
      />
    </Container>
  );
}

export default List;
