import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import PostAdModal from './mainComponents/PostAdModal';
import "./css/navbar.css";
import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

function Navigation() {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [postCreated, setPostCreated] = useState(false);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from cookies", error);
            }
        }
    }, []);

    const createPost = async (post) => {
        if (!post) {
            console.error("Invalid post:", post);
            return;
        }

        const dataToSend = {
            Name: post.name,
            Image: post.image,
            Description: post.description,
            Features: post.features,
            Price: parseFloat(post.price),
            StartOn: post.startDate,
            EndOn: post.endDate,
            Category: post.category,
            CityArea: post.cityArea,
            Type: post.type,
            OwnerName: post.OwnerName,
            OwnerContact: post.OwnerContact,
        };

        try {
            const token = Cookies.get("token");
            const res = await fetch(`http://localhost:4300/api/v1/postAd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": token,
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) throw new Error("Failed to create post");
            const result = await res.json();
            console.log("Post Created successfully:", result);
            setPostCreated(true);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    useEffect(() => {
        if (postCreated) {
            setPostCreated(false);
        }
    }, [postCreated]);

    const handlePostClick = () => {
        const token = Cookies.get("token");
        const storedUser = Cookies.get("user");
        console.log("Token:", token);
        console.log("User from cookie:", storedUser);

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Parsed User:", parsedUser);

                if (parsedUser.role === "admin" || parsedUser.role === "user") {
                    setShowModal(true);
                    return;
                } else {
                    console.log("User role not authorized:", parsedUser.role);
                }
            } catch (error) {
                console.error("Error parsing user:", error);
            }
        }
        setShowWarning(true);
    };



    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-wrapper">
                <Link to="/" className="brand-link">Pak Classified</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links">
                        <Link className='nav-item' to="home" style={{ fontSize: '18px' }}>Home</Link>
                        <Link className='nav-item' to="about">About</Link>
                        <NavDropdown title="Categories" className='nav-item-dropdown'>
                            <Link to="categories" className='dropdown-link'>Categories</Link>
                            <Link to="adcategory" className='dropdown-link'>Ads Category</Link>
                        </NavDropdown>
                        <Link className='nav-item' to="contact">Contact</Link>
                        <span className='post-btn' onClick={handlePostClick}>Post Advertisement</span>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {user && (
                <PostAdModal show={showModal} handleClose={() => setShowModal(false)} createPost={createPost} />
            )}

            <Modal show={showWarning} onHide={() => setShowWarning(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Access Denied</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You must be logged in as admin or user to post an advertisement.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWarning(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Navigation;
