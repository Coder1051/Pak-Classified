import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditProfileModal({ show, onHide, user, onSave }) {
    const [formData, setFormData] = useState({ ...user });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const token = "token"; // replace this with actual token if needed

            const res = await fetch(`http://localhost:4300/api/v1/user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                },
                body: JSON.stringify(formData),
            });

            const updatedUser = await res.json();
            onSave(updatedUser); // Update local state in Dashboard
            onHide();
            window.location.reload();
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={formData.name || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={formData.email || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control name="contact" value={formData.contact || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control name="dateOfbirth" value={formData.dateOfbirth || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control name="image" value={formData.image || ''} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="success" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
