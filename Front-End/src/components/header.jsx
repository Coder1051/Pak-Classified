import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './mainComponents/login';
import SignUpModal from './mainComponents/signUp';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export default function Header() {
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(Cookies.get("user") || "{}");
        if (storedUser && storedUser.name) {
            setUser(storedUser);
        }
    }, []);

    const LoginSuccess = () => {
        const storedUser = JSON.parse(Cookies.get("user") || "{}");
        setUser(storedUser);
        setModalShow(false);
        toast.success("Login successful!");
    };

    const handleLogout = () => {
        toast.success("Logged out successfully!");
        Cookies.remove("user");
        Cookies.remove("token");
        setUser(null);
        navigate('/');
    };

    return (
        <>
            {
                user ? (
                    <div className='heading-1'>
                        <div className="d-flex bg-success p-3 justify-content-between align-items-center">
                            <h4 className='text-white' style={{ marginLeft: '80px' }}>
                                Welcome, {user.name || "User"}
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
                                        to="/admin/dashboard"
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
                                        onClick={handleLogout}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> &nbsp;
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
            <ToastContainer />
        </>
    );
}

