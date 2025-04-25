import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import PostAdModal from './mainComponents/PostAdModal';
import "./css/navbar.css";
import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

function Navigation() { 
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [postCreated, setPostCreated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from localStorage", error);
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
            const token = localStorage.getItem("token");
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
            // refreshPosts();  // ✅ Trigger re-fetch in Dashboard
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
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setShowModal(true);
        } else {
            setShowWarning(true);
        }
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
                    <p>Only Admin can perform this function.</p>
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



// Gpt 
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom';
// import PostAdModal from './mainComponents/PostAdModal';
// import "./css/navbar.css";
// import { useState, useEffect } from "react";
// import { Modal, Button } from 'react-bootstrap';

// function Navigation() {
//     const [user, setUser] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [showWarning, setShowWarning] = useState(false);
//     const [postCreated, setPostCreated] = useState(false);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//             } catch (error) {
//                 console.error("Error parsing user from localStorage", error);
//             }
//         }
//     }, []);

//     const createPost = async (post) => {
//         if (!post) {
//             console.error("Invalid post:", post);
//             return;
//         }

//         const dataToSend = {
//             Name: post.name,
//             Image: post.image,
//             Description: post.description,
//             Features: post.features,
//             Price: parseFloat(post.price),
//             StartOn: post.startDate,
//             EndOn: post.endDate,
//             Category: post.category,
//             CityArea: post.cityArea,
//             Type: post.type,
//             OwnerName: post.OwnerName,
//             OwnerContact: post.OwnerContact,
//         };

//         try {
//             const token = localStorage.getItem("token");
//             const res = await fetch(`http://localhost:4300/api/v1/postAd`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Auth-Token": token,
//                 },
//                 body: JSON.stringify(dataToSend),
//             });

//             if (!res.ok) throw new Error("Failed to create post");
//             const result = await res.json();
//             console.log("Post Created successfully:", result);
//             setPostCreated(true); // ✅ trigger a refresh
//             setShowModal(false); // ✅ close modal
//         } catch (error) {
//             console.error("Error creating post:", error);
//         }
//     };

//     // ✅ Watch for postCreated and perform any needed refresh
//     useEffect(() => {
//         if (postCreated) {
//             console.log("Post creation detected. Refreshing data...");

//             // TODO: If you're listing posts somewhere, you can trigger a function here to fetch them again
//             // For example: fetchPosts();

//             setPostCreated(false); // Reset trigger
//         }
//     }, [postCreated]);

//     const handlePostClick = () => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setShowModal(true);
//         } else {
//             setShowWarning(true);
//         }
//     };

//     return (
//         <>
//             <Navbar expand="lg" className="bg-body-tertiary nav-wrapper">
//                 <Link to="/" className="brand-link">Pak Classified</Link>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto nav-links">
//                         <Link className='nav-item' to="home" style={{ fontSize: '18px' }}>Home</Link>
//                         <Link className='nav-item' to="about">About</Link>
//                         <NavDropdown title="Categories" className='nav-item-dropdown'>
//                             <Link to="categories" className='dropdown-link'>Categories</Link>
//                             <Link to="adcategory" className='dropdown-link'>Ads Category</Link>
//                         </NavDropdown>
//                         <Link className='nav-item' to="contact">Contact</Link>
//                         <span className='post-btn' onClick={handlePostClick}>Post Advertisement</span>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>

//             {/* ✅ Post Modal if user is logged in */}
//             {user && (
//                 <PostAdModal show={showModal} handleClose={() => setShowModal(false)} createPost={createPost} />
//             )}

//             {/* ❌ Show warning if user not logged in */}
//             <Modal show={showWarning} onHide={() => setShowWarning(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Access Denied</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Only Admin can perform this function.</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowWarning(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default Navigation;

