import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import EditProfileModal from '../components/mainComponents/editInfoModel';
import EditPostModal from '../components/mainComponents/EditPostModal';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const Navigate = useNavigate();

    // Local storage se user ko la rha hai
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

    // Data fectch karny k liye
    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");
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


    // Post koUpdate karny k liye
    const updatePost = (updatedPost) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            )
        );
        setShowEditModal(false);
    };

    // Post Delete karny k liye
    const deletePost = async (post) => {
        if (!post || !post._id) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:4300/api/v1/postAd/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": token,
                },
            });

            if (res.ok) {
                setPosts(prev => prev.filter(p => p._id !== post._id));
            } else {
                throw new Error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
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
                            <Button variant="primary" className="ms-3 mb-3" onClick={() => {
                                localStorage.removeItem("user");
                                // window.location.reload();
                                Navigate('/');
                            }}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                            </Button>
                        </div>
                        <EditProfileModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            user={user}
                            onSave={(updatedUser) => {
                                setUser(updatedUser);
                                localStorage.setItem("user", JSON.stringify(updatedUser));
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
                                        <Button className="me-3 mb-3" onClick={() => {
                                            localStorage.setItem("carPost", JSON.stringify(post));
                                            navigate('/carDetails', { state: post });
                                        }} variant="success">
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
        </>
    );
}



// import React, { useEffect, useState } from 'react';
// import { Card, Col, Row, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import EditProfileModal from '../components/mainComponents/editInfoModel';
// import EditPostModal from '../components/mainComponents/EditPostModal';

// export default function Dashboard() {
//     const [showModal, setShowModal] = useState(false); // Edit Model Show
//     const navigate = useNavigate();
//     const [posts, setPosts] = useState([]); // posts ko state mein store karne ke liye
//     const [user, setUser] = useState(null);
//     const [selectedPost, setSelectedPost] = useState(null); //For selected Post
//     const [showEditModal, setShowEditModal] = useState(false); // postEditModel k liye hai
//     const [delPost, setDelPost] = useState(false);


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

//     const fetchPosts = async () => {
//         try {
//             const token = "token"; // replace with actual token
//             const res = await fetch("http://localhost:4300/api/v1/postAd", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Auth-Token": token, // Ye important hai
//                 },
//             });

//             const data = await res.json();
//             console.log(data); // to check Data
//             setPosts(data);
//         } catch (error) {
//             console.error("Error fetching posts:", error);
//         }
//     };

//     useEffect(() => {
//         fetchPosts(); // Component mount hote hi fetchPosts() call ho jayega
//     }, []);

//     const updatePost = async (formData) => {
//         try {
//             const response = await fetch(`http://localhost:4300/api/v1/postAd/${formData._id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Auth-Token": token, // ✅ This matches backend requirement
//                 },
//                 body: JSON.stringify(formData)
//             });
//             localStorage.setItem("token", response.Header);
//             console.log("Sending token:", token);

//             if (!response.ok) {
//                 throw new Error("Failed to update post");
//             }

//             fetchPosts(); // refresh updated data
//         } catch (error) {
//             console.error("Error updating post:", error);
//         }
//     };

//     const token = localStorage.getItem("token"); // ✅ Put this outside of function if needed

//     const deletePost = async (post) => {
//         if (!post || !post._id) {
//             console.error("Invalid post:", post);
//             return;
//         }

//         try {
//             const token = localStorage.getItem("token");

//             const res = await fetch(`http://localhost:4300/api/v1/postAd/${post._id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Auth-Token": token,
//                 },
//             });

//             if (!res.ok) {
//                 throw new Error("Failed to delete post");
//             }

//             console.log("Post deleted successfully");
//             fetchPosts(); // Refresh after delete
//         } catch (error) {
//             console.error("Error deleting post:", error);
//         }
//     };
//     <EditPostModal
//         show={showEditModal}
//         handleClose={() => setShowEditModal(false)}
//         postData={selectedPost}
//         onUpdate={updatePost} // ✅ Correct prop name
//     />

//     return (
//         <>
//             <img src="/images/Dashboard.jpg" className="w-100" alt="Dashboard" />
//             <Row className="w-100 p-3">
//                 <Col md={3} className="px-2">
//                     <Card>
//                         <div className="text-center my-2">
//                             <img
//                                 src={user?.image || "/images/profile.jpg"}
//                                 alt="Profile"
//                                 style={{ borderRadius: '50%', width: '100%', padding: '0px 60px', objectFit: 'cover', objectPosition: 'center', overflow: 'hidden' }}
//                             />
//                             <h2 className="text-success my-2">{user?.name || ''}</h2>
//                         </div>
//                         <Card className="mx-3 mb-3"></Card>
//                         <div>
//                             <p className="px-3"><strong>Email :</strong> {user?.email || ''}</p>
//                             <p className="px-3"><strong>Contact Number :</strong> +{user?.contact || ''}</p>
//                             <p className="px-3"><strong>Date Of Birth :</strong> {user?.dateOfbirth || ''}</p>
//                         </div>
//                         <div className="d-flex flex-wrap pb-3">
//                             <Button
//                                 variant="success"
//                                 className="ms-3 mb-3"
//                                 onClick={() => setShowModal(true)}
//                             >
//                                 Edit Info
//                             </Button>
//                             <Button
//                                 variant="primary"
//                                 className="ms-3 mb-3"
//                                 onClick={() => {
//                                     localStorage.removeItem("user");
//                                     window.location.reload();
//                                 }}
//                             >
//                                 <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
//                             </Button>
//                         </div>
//                         <EditProfileModal
//                             show={showModal}
//                             onHide={() => setShowModal(false)}
//                             user={user}
//                             onSave={(updatedUser) => {
//                                 setUser(updatedUser);
//                                 localStorage.setItem("user", JSON.stringify(updatedUser));
//                             }}
//                         />


//                     </Card>
//                 </Col>

//                 {
//                     user ? (
//                         <Col md={9} >
//                             <h1 className="text-success my-2">Posted Advertisements</h1>
//                             {posts.map((post, index) => (
//                                 <Card className='mb-3' key={index} >
//                                     <Row>
//                                         <Col md={4}>
//                                             <img src={post.Image ? post.Image : "/images/12.jpg"} alt="Car" className="w-100 p-3" />
//                                         </Col>
//                                         <Col md={8} className="p-3">

//                                             <h3>{post.Name || "N/A"}</h3>
//                                             <p>{post.Description || "N/A"} </p>
//                                             <p><strong>Price: </strong>{post.Price || "N/A"} $ </p>
//                                             <p><strong>City Area: </strong>{post.CityArea || "N/A"}</p>
//                                             <Button
//                                                 variant="danger"
//                                                 className="me-3 mb-3"
//                                                 onClick={() => deletePost(post)} // ✅ pass full post object
//                                             >
//                                                 Delete
//                                             </Button>
//                                             <Button
//                                                 variant="success"
//                                                 className="me-3 mb-3"
//                                                 onClick={() => {
//                                                     setSelectedPost(post);
//                                                     setShowEditModal(true);
//                                                 }}
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button className="me-3 mb-3" onClick={() => {
//                                                 localStorage.setItem("carPost", JSON.stringify(post)); // For reload persistence
//                                                 navigate('/carDetails', { state: post }); // Pass the data to MoreDetails
//                                             }} variant="success">
//                                                 View More
//                                             </Button>
//                                         </Col>
//                                     </Row>
//                                 </Card>
//                             ))}
//                         </Col>
//                     ) : (
//                         <Col md={9} >
//                             <h1 className="text-success my-2">Posted Advertisements</h1>
//                             <h2 className='text-danger my-3' >No Ads Found!</h2>

//                         </Col>
//                     )
//                 }

//                 <EditPostModal
//                     show={showEditModal}
//                     handleClose={() => setShowEditModal(false)}
//                     postData={selectedPost}
//                     onSave={updatePost}
//                 />
//             </Row>
//         </>
//     );
// }
