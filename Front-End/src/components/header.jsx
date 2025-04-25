import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './mainComponents/login';
import SignUpModal from './mainComponents/signUp';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Toast import
import 'react-toastify/dist/ReactToastify.css';          // ✅ Toast CSS
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const LoginSuccess = (loggedInUser) => {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        setModalShow(false);
        toast.success("Login successful!"); // ✅ Toast on login
    };

    return (
        <>
            {
                user ? (
                    <div className='heading-1'>
                        <div className="d-flex bg-success p-3 justify-content-between align-items-center">
                            <h4 className='text-white' style={{ marginLeft: '80px' }}>
                                Welcome,{user.name || "User"}
                            </h4>
                            <Dropdown>
                                <Dropdown.Toggle as="div" bsPrefix="custom-dropdown-toggle">
                                    <img
                                        src={user.image ? user.image : "/images/profile.jpg"}
                                        className="rounded-circle img-fluid"
                                        style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}
                                        alt="img"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="px-2 text-center">
                                    <p style={{ cursor: 'pointer', fontSize: '18px', margin: '0px' }}>
                                        {user.name || "User"}
                                    </p>
                                    <Dropdown.Item
                                        as={Link}
                                        to="/dashboard"
                                        className="nav-link"
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '18px',
                                            textDecoration: 'none',
                                            display: 'block'
                                        }}
                                    >
                                        View Profile
                                    </Dropdown.Item>
                                    <Button
                                        variant="none"
                                        className="w-100"
                                        onClick={() => {
                                            toast.success("Logged out successfully!"); // 🔥 Show toast pehle
                                            localStorage.removeItem("user");
                                            Navigate('/')
                                        }}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />  &nbsp;
                                        Logout
                                    </Button>

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <div className='heading-2'>
                        <div className="d-flex bg-light p-3 align-items-center">
                            <h4 className='text-success' style={{ marginLeft: '80px' }}>Welcome</h4>
                            <Button variant='success' onClick={() => setModalShow(true)} className='ms-auto'>Login</Button>
                            <Login
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                onLoginSuccess={LoginSuccess}
                            />
                            <Button variant='success' onClick={() => setShow(true)} className='mx-3'>Sign Up</Button>
                            <SignUpModal show={show} handleClose={() => setShow(false)} />
                        </div>
                    </div>
                )
            }
            <ToastContainer/>
        </>
    );
}









// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Navigation from './navbar';
// import Login from './mainComponents/login';
// import SignUpModal from './mainComponents/signUp';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function Header() {
//     const [modalShow, setModalShow] = useState(false); // login modal
//     const [user, setUser] = useState(null); // 🔥 user state
//     const [show, setShow] = useState(false); // sign up modal
//     const [isOpen, setIsOpen] = useState(false);

//     // Load user from localStorage on first render
//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         if (storedUser) {
//             setUser(storedUser); // Update user state
//         }
//         console.log("User in Header:", user); // Add this line
//     }, []);


//     // 🔁 Handle login success
//     const LoginSuccess = (loggedInUser) => {
//         localStorage.setItem("user", JSON.stringify(loggedInUser));
//         setUser(loggedInUser); // Update user state
//         setModalShow(false); // Close modal
//         window.location.reload();
//     };
//     console.log("User in Header:", user)

//     return (
//         <>
//             {
//                 user ? (
//                     <div className='heading-1'>
//                         <div className="d-flex bg-success p-3 justify-content-between align-items-center">
//                             <h4 className='text-white' style={{ marginLeft: '80px' }}>
//                                 Welcome,{user.name || "User"}
//                             </h4>
//                             <Dropdown>
//                                 <Dropdown.Toggle as="div"
//                                     bsPrefix="custom-dropdown-toggle"
//                                 >
//                                     <img
//                                         src={user.image ? user.image : "/images/profile.jpg"}
//                                         className="rounded-circle img-fluid"
//                                         style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}
//                                         alt="img"
//                                     />
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu align="end" className="px-2 text-center">
//                                     <p style={{ cursor: 'pointer', fontSize: '18px', margin: '0px 0px 0px' }} >
//                                         {user.name || "User"}
//                                     </p>
//                                     <Dropdown.Item
//                                         as={Link}
//                                         to="/dashboard"
//                                         style={{
//                                             cursor: 'pointer',
//                                             fontSize: '18px',
//                                             color: 'none',  // Keeps text color consistent
//                                             textDecoration: 'none', // Removes underline
//                                             display: 'block' // Ensures full-width click area
//                                         }}
//                                         className="nav-link"
//                                         onClick={() => { }}
//                                     >
//                                         View Profile
//                                     </Dropdown.Item>
//                                     <Button
//                                         variant="none"
//                                         className="w-100 "
//                                         onClick={() => {
//                                             localStorage.removeItem("user");
//                                             window.location.reload();
//                                             toast.success("Loogged In successfully!");
//                                         }}
//                                     >
//                                         <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />  &nbsp;
//                                         Logout
//                                     </Button>
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className='heading-2'>
//                         <div className="d-flex bg-light p-3 align-items-center">
//                             <h4 className='text-success' style={{ marginLeft: '80px' }}>Welcome</h4>
//                             <Button variant='success' onClick={() => setModalShow(true)} className='ms-auto'>Login</Button>
//                             <Login
//                                 show={modalShow}
//                                 onHide={() => setModalShow(false)}
//                                 onLoginSuccess={LoginSuccess}
//                             />

//                             <Button variant='success' onClick={() => setShow(true)} className='mx-3'>Sign Up</Button>
//                             <SignUpModal show={show} handleClose={() => setShow(false)} />

//                         </div>

//                     </div>
//                 )
//             }

//             <Navigation />
//         </>
//     );
// }



