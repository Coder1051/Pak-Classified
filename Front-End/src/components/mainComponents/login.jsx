import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Toast import
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; // ✅ import cookie library

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const LoginUser = async () => {
        try {
            const response = await axios.post("http://localhost:4300/api/v1/user/login", {
                email,
                password
            });
            // ✅ Save user to Cookies
            // Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 }); // 1 days
            // Cookies.set("token", response.data.token, { expires: 1 });

            // Save user and token to Cookies with 100 seconds expiry

            Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });
            Cookies.set("token", response.data.token, { expires: 1 });

            // ✅ Call the success handler passed from Header
            props.onLoginSuccess(response.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
            setError("Invalid email or password");
            setTimeout(() => {
                toast.error("Invalid email or password");
                // ✅ Toast on login
            }, 1000);
        }
    };

    return (
        <>
            <Modal {...props} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    <Button className='mt-3' onClick={LoginUser}>Login</Button>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}

