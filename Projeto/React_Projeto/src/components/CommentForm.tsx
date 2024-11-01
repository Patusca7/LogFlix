import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function CommentForm({ movieid, refreshComments }) {
  const [comment, setComment] = useState('');
  const { userData } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const token = userData.token;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/comments',
        {
          "imdbID": movieid,
          "comment": comment
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setComment('');
      setMessage('Comentario Submetido')
      refreshComments();
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao submeter comentário');
      } 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-primary mt-1">
          Submit
        </button>
      </div>
      <p>{message}</p>
    </form>
  );
}

export default CommentForm;
