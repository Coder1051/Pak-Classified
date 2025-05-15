import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function EditPostModal({ show, handleClose, postData, onUpdate }) {
    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token") || localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:4300/api/v1/postAd/${formData._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to update post");
            }

            const updatedPost = await response.json();
            onUpdate(updatedPost);

            const storedUser = JSON.parse(Cookies.get("user") || localStorage.getItem("user") || '{}');
            const updatedUser = {
                ...storedUser,
                posts: (storedUser.posts || []).map(p => p._id === updatedPost._id ? updatedPost : p)
            };

            Cookies.set("user", JSON.stringify(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));

        } catch (error) {
            console.error("Error updating post:", error.message);
        }
    };

    useEffect(() => {
        setFormData(postData || {});
    }, [postData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="Name" value={formData.Name || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="Price" value={formData.Price || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City Area</Form.Label>
                        <Form.Control name="CityArea" value={formData.CityArea || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="Description" value={formData.Description || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Features</Form.Label>
                        <Form.Control as="textarea" rows={2} name="Features" value={formData.Features || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="Image" value={formData.Image || ''} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" variant="success" className="mt-3">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}