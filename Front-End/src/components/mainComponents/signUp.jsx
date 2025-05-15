import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUpModal({ show, handleClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        securityQuestion: '',
        SecurityAnswer: '',
        dateOfbirth: '',
        contact: '',
        image: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                securityQuestion: formData.securityQuestion,
                SecurityAnswer: formData.SecurityAnswer,
                dateOfbirth: formData.dateOfbirth,
                contact: formData.contact,
                image: formData.image
            };

            const response = await axios.post('http://localhost:4300/api/v1/user', body, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                toast.success("User registered successfully!");
                handleClose(); 
            } else {
                toast.error("Registration failed.");
            }
        }
        catch (error) {
            console.error("Signup Error:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Status Code:", error.response.status);
                toast.error(error.response.data?.message || "Validation or Server Error");
            } else {
                toast.error("Server not responding.");
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label> Email </Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label> Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter password" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">

                        <Form.Label>Security Question</Form.Label>
                        <Form.Control name="securityQuestion" type="text" placeholder="Enter security question" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Security Answer</Form.Label>
                        <Form.Control name="SecurityAnswer" type="text" placeholder="Enter security answer" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>  Date of Birth </Form.Label>
                        <Form.Control name="dateOfbirth" type="date" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>  Contact Number </Form.Label>
                        <Form.Control name="contact" type="text" placeholder="Enter contact number" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" type="text" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;
