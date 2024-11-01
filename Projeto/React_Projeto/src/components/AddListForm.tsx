import React from 'react';
import { Modal, Button} from 'react-bootstrap';

function AddListForm({listName, show, message, setListName, handleClose, handleCreateList}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Nome da Lista"
                    className="form-control"
                />
                {message && <p className="mt-2">{message}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateList}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddListForm;