import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { updateTodos } from './allApis.js/allApi';
import { useState } from 'react';

function Edit({editTodo}) {
    const [edit,setEdit]=useState({
        userId:"",id:'',title:''
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setEdit({userId:editTodo.userId,id:editTodo.id,title:editTodo.title})
    }

    const handleChange = (e) => {
        setEdit({
            ...edit,
            [e.target.name]: e.target.value,
        })
    }

    const handleUpdate = async () => {
        try {
            console.log("Updating Todo with ID:", edit.id);
            console.log("Data being sent:", edit);
    
            const res = await updateTodos(edit, edit.id);
            if (res.status === 200) {
                toast.success('Todo updated successfully');
                handleClose();
            } else {
                toast.error('Failed to update Todo');
            }
            console.log(res);
        } catch (error) {
            console.error("Error during update:", error);
            toast.error('An error occurred');
        }
    }
    
    

    return (
        <>
            <div>
                <button className='btn' onClick={handleShow}><i className="fa-solid fa-pen-to-square" /></button>
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingInput" label="userId" className="mb-3">
                            <Form.Control type="text" name='userId' defaultValue={editTodo.userId} onChange={handleChange} placeholder="userId"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="id" className='mb-3'>
                            <Form.Control type="number" name='id' defaultValue={editTodo.id} onChange={handleChange} placeholder="id"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="title" className="mb-3">
                            <Form.Control type="text" name='title' defaultValue={editTodo.title} onChange={handleChange} placeholder="title"/>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Edit
