import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostAdModal({ show, handleClose, createPost }) {

    const initialFormState = {
        name: "",
        price: "",
        description: "",
        features: "",
        startDate: "",
        endDate: "",
        category: "",
        cityArea: "",
        type: "",
        image: "",
        OwnerName: "",
        OwnerContact: "",
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? e.target.files[0].name : value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validations
        if (!formData.name || formData.name.length < 3) {
            toast.error("Car Name must be at least 3 characters.");
            return;
        }
        if (!formData.OwnerName || formData.OwnerName.length < 3) {
            toast.error("Owner Name must be at least 3 characters.");
            return;
        }
        if (!formData.OwnerContact || formData.OwnerContact.length < 11) {
            toast.error("Owner Contact must be at least 11 digits.");
            return;
        }
        if (!formData.price || isNaN(formData.price) || formData.price < 1) {
            toast.error("Price must be a valid number.");
            return;
        }
        if (!formData.startDate || !formData.endDate) {
            toast.error("Both Start and End dates are required.");
            return;
        }

        // Create Post
        createPost(formData);
        toast.success("Advertisement posted successfully!");

        // Reset and close
        setFormData(initialFormState);
        handleClose();
        setTimeout(() => { window.location.reload() }, 3000)

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-success">Post Advertisement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Car Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" name="OwnerName" value={formData.OwnerName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Company's Contact Number</Form.Label>
                        <Form.Control type="number" name="OwnerContact" value={formData.OwnerContact} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Features</Form.Label>
                        <Form.Control as="textarea" name="features" value={formData.features} onChange={handleChange} />
                    </Form.Group>

                    <Row className="my-2">
                        <Col md="6">
                            <Form.Group>
                                <Form.Label>Starts On</Form.Label>
                                <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label>Ends On</Form.Label>
                                <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="my-2">
                        <Col>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control className="text-white bg-success" as="select" name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>City Area</Form.Label>
                                <Form.Control className="text-white bg-success" as="select" name="cityArea" value={formData.cityArea} onChange={handleChange} required>
                                    <option value="">Select City Area</option>
                                    <option value="Lahore">Lahore</option>
                                    <option value="Karachi">Karachi</option>
                                    <option value="Kasur">Kasur</option>
                                    <option value="Deer">Deer</option>
                                    <option value="Nankana Sahib">Nankana Sahib</option>
                                    <option value="Murree">Murree</option>
                                    <option value="Islamabad">Islamabad</option>
                                    <option value="Gujranwala">Gujranwala</option>
                                    <option value="Sialkot">Sialkot</option>
                                    <option value="Jhelem">Jhelem</option>
                                    <option value="Mian Channu">Mian Channu</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control className="text-white bg-success" as="select" name="type" value={formData.type} onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    <option value="Car">Car</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit"
                        className="mt-3">
                        Post Advertisement
                    </Button>
                </Form>
            </Modal.Body>
            <ToastContainer position="top-right" autoClose={3000} />
        </Modal>
    );
}

export default PostAdModal;

