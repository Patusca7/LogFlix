import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmationPopup = ({show, title, bodyText, message, onConfirm, onClose}) => {
    const body = bodyText 
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && (
                    <Alert variant="primary">
                        {message}
                    </Alert>
                )}
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    No
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationPopup;
