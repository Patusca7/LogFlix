import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

function AddToList({ movieId }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const { userData } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [message, setMessage] = useState('');
    const [listId, setListId] = useState('');

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
            setError('Erro ao encontrar as listas');
        }
    };

    useEffect(() => {
        if (showModal) {
            fetchUserLists();
        }
    }, [showModal]);

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setMessage("");
        setError("");
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setListId(value);
    };

    const addToList = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:3000/lists/' + listId,
                {
                    "movieId": movieId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`,
                    }
                }
            );
            setMessage('Adicionado com sucesso');
            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        } catch (error) {
            setError('Erro ao adicionar à lista');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addToList(event);
    };

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                Adicionar à lista
            </button>

            <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Escolha a lista</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleChange}>
                                    <option selected>Selecione a lista</option>
                                        {userLists.map(list => (
                                            <option key={list._id} value={list._id}>{list.ListName}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="floatingSelect">Listas</label>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                            {error && <p className="text-danger">{error}</p>}
                            {message != "" && <p className="text-success">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddToList;
