import React, { useContext, useState } from 'react';
import { AuthContext } from "../auth/AuthContext";
import axios from 'axios';
import ConfirmationPopup from './ConfirmationPopup';

function Comment({ comment, refreshComments }) {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const commentId = comment._id
  let token = null;
  let userId = null;
  let userRole = "user"

  if (isLoggedIn) {
    token = userData.token;
    userId = userData.userId;
    userRole = userData.role;
  }
  const isOwner = userId === comment.userId._id;

  const handleDeleteComment = async () => {
    try {
      if (userRole === "admin") {
        const res = await axios.delete(`http://localhost:3000/comments/${commentId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        )
      } else {
        const res = await axios.delete(`http://localhost:3000/comments/user/${commentId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        )
      }
      setMessage("Comentario apagado com Sucesso")
      setTimeout(() => {
        closeConfirm();
        setMessage("")
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao deletar comentario');
      }
    }
    refreshComments();
  };

  const showConfirm = () => {
    setShow(true)
  }
  const closeConfirm = () => { setShow(false) }

  return (
    <div>
      <div className="comment card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center comment-header">
            <div>
              <h5 className="user-email mb-0 text-muted">{comment.userId.email}</h5>
            </div>
          </div>
          <div className="comment-body">
            <p className="card-text mt-3">{comment.comment}</p>
          </div>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between">
          <span className="comment-date">{comment.date.substring(11, 19) + " " + comment.date.substring(0, 10)}</span>
          {(isOwner || userRole === "admin") ? (
            <button type="button" className="btn btn-danger btn-sm" onClick={showConfirm}>
              Delete
            </button>
          ) : <></>}
        </div>
      </div>
      <ConfirmationPopup show={show} message={message} onConfirm={handleDeleteComment} onClose={closeConfirm} bodyText={comment.comment} title={"Tem a certeza que quer apagar o comentario?"} />
    </div>

  );
}

export default Comment;