import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import EditProfileModal from '../components/mainComponents/editInfoModel';
import EditPostModal from '../components/mainComponents/EditPostModal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cookieUser = Cookies.get("user");
        if (cookieUser) {
            try {
                const parsedUser = JSON.parse(cookieUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from cookies", error);
            }
        }
    }, []);

    const fetchPosts = async () => {
        try {
            const token = Cookies.get("token");
            const res = await fetch("http://localhost:4300/api/v1/postAd", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": token,
                },
            });

            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const updatePost = (updatedPost) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            )
        );
        setShowEditModal(false);
        toast.success("Post updated successfully!");
    };


    const deletePost = async (post) => {
        if (!post || !post._id) return;

        try {
            const token = Cookies.get("token");
            const res = await fetch(`http://localhost:4300/api/v1/postAd/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": token,
                },
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to delete post");
            }

            setPosts(prev => prev.filter(p => p._id !== post._id));
            toast.success("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error.message);
            toast.error("Delete failed: " + error.message);
        }
    };

    const handleLogout = () => {
        Cookies.remove("user");
        Cookies.remove("token");
        navigate('/');
    };

    return (
        <>
            <img src="/images/Dashboard.jpg" className="w-100" alt="Dashboard" />
            <Row className="w-100 p-3">
                <Col md={3} className="px-2">
                    <Card>
                        <div className="text-center my-2">
                            <img
                                className='mb-3'
                                src={user?.image || "/images/profile.jpg"}
                                alt="Profile"
                                style={{ borderRadius: '50%', width: '100%', padding: '0px 60px', objectFit: 'cover', objectPosition: 'center' }}
                            />
                            <Card className="mx-3 mb-3"></Card>
                            <h2 className="text-success my-2">{user?.name || ''}</h2>
                        </div>
                        <div>
                            <p className="px-3"><strong>Email:</strong> {user?.email || ''}</p>
                            <p className="px-3"><strong>Contact Number:</strong> +{user?.contact || ''}</p>
                            <p className="px-3"><strong>Date Of Birth:</strong> {user?.dateOfbirth || ''}</p>
                        </div>
                        <div className="d-flex flex-wrap pb-3">
                            <Button variant="success" className="ms-3 mb-3" onClick={() => setShowModal(true)}>
                                Edit Info
                            </Button>
                            <Button variant="primary" className="ms-3 mb-3" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                            </Button>
                        </div>
                        <EditProfileModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            user={user}
                            onSave={(updatedUser) => {
                                setUser(updatedUser);
                                Cookies.set("user", JSON.stringify(updatedUser));
                            }}
                        />
                    </Card>
                </Col>
                <Col md={9}>
                    <h1 className="text-success my-2">Posted Advertisements</h1>
                    {user ? (
                        posts.length > 0 ? posts.map((post, index) => (
                            <Card className='mb-3' key={index}>
                                <Row>
                                    <Col md={4}>
                                        <img src={post.Image || "/images/12.jpg"} alt="Car" className="w-100 p-3" />
                                    </Col>
                                    <Col md={8} className="p-3">
                                        <h3>{post.Name || "N/A"}</h3>
                                        <p>{post.Description || "N/A"}</p>
                                        <p><strong>Price:</strong> {post.Price || "N/A"} $</p>
                                        <p><strong>City Area:</strong> {post.CityArea || "N/A"}</p>
                                        <Button variant="danger" className="me-3 mb-3" onClick={() => deletePost(post)}>
                                            Delete
                                        </Button>
                                        <Button variant="success" className="me-3 mb-3" onClick={() => {
                                            setSelectedPost(post);
                                            setShowEditModal(true);
                                        }}>
                                            Edit
                                        </Button>
                                        <Button
                                            className="me-3 mb-3"
                                            onClick={() => {
                                                Cookies.set("carPost", JSON.stringify(post));
                                                navigate('/carDetails', { state: post });
                                            }}
                                            variant="success"
                                        >
                                            View More
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        )) : (
                            <h2 className="text-danger">No Ads Found!</h2>
                        )
                    ) : (
                        <h2 className="text-danger">Please login to view posted ads.</h2>
                    )}
                </Col>
                <EditPostModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    postData={selectedPost}
                    onUpdate={updatePost}
                />
            </Row>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </>
    );
}

