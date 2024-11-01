import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "./ConfirmationPopup";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import "../App.css";

function BotaoLista({ list, fetchUserLists }) {
    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);
    const { userData } = useContext(AuthContext);
    const [message, setMessage] = useState("")

    const handleClick = (path) => {
        navigate(path);
    };

    const handleShowPopUp = () => {
        setShowPopUp(true);
    }

    const handleClosePopUp = () => {
        setShowPopUp(false);
    }

    const deleteList = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/lists/${list._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            );
            fetchUserLists();
            setMessage("Lista deletada com sucesso");
            setTimeout(() => {
                handleClosePopUp();
                setMessage("")
              }, 1000);
            
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erro ao deletar a lista');
            }
        }
    }

    return (
        <div className="container-fluid">
            <button
                type="button"
                className="btn btn-secondary btn-sm text-start w-75"
                onClick={() => handleClick(`/list/${list._id}`)}
            >
                {list.ListName}
            </button>
            <button type="button" className="btn btn btn-danger btn-sm text-right w-20" onClick={handleShowPopUp}>
                <span className="fa fa-trash me-1"></span>
                Eliminar</button>
            <>
                <ConfirmationPopup show={showPopUp} message={message} onConfirm={deleteList} onClose={handleClosePopUp} bodyText={list.ListName} title={"Tem a certeza que quer apagar a lista?"} />
            </>
        </div>

    );
}

export default BotaoLista;