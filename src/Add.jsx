import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addUser } from './allApis.js/allApi';
import { toast } from 'react-toastify';

const base_url = 'http://localhost:3000'; // Define base_url if not already defined

function Add() {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        userId: '',
        id: '',
        title: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddUser = async () => {
        console.log("User data:", user);
        const { userId, id, title } = user;

        // Input validation
        if (!userId || !id || !title) {
            toast.warn('Invalid inputs');
            return;
        }

        try {
            const result = await addUser(user); // Add user via API
            console.log("API Response:", result);

            if (result && result.status === 201) {
                toast.success('User Added');
                handleClose();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error("Error during API call:", error);
            toast.error('An unexpected error occurred');
        }
    };

    return (
        <>
            <div>
                <button onClick={handleShow} className="btn btn-danger m-3">Add</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingInput" label="userId" className="mb-3">
                        <Form.Control
                            type="text"
                            onChange={(e) => setUser({ ...user, userId: e.target.value })}
                            placeholder="userId"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="id" className='mb-3'>
                        <Form.Control
                            type="number"
                            onChange={(e) => setUser({ ...user, id: e.target.value })}
                            placeholder="id"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="title" className="mb-3">
                        <Form.Control
                            type="text"
                            onChange={(e) => setUser({ ...user, title: e.target.value })}
                            placeholder="title"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;