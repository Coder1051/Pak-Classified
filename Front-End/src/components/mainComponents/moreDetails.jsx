import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

export default function MoreDetails() {
    const Navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Get user from cookies instead of localStorage
    useEffect(() => {
        const storedUser = Cookies.get("user"); // Read user from cookies
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from cookies", error);
            }
        }
    }, []);

    const location = useLocation();
    const post = location.state || JSON.parse(localStorage.getItem("carPost"));

    if (!post) {
        return <h3 className='text-center text-danger'>No Data found!</h3>;
    }

    console.log("Received Post:", post); // To check the data received or not

    return (
        <>
            <img src="/images/carDetails.jpeg" alt="car Details" className='w-100 mb-4' />
            <Row className='g-0'>
                <Col md={7} className='my-3'>
                    <div>
                        <Row className='w-100'>
                            <Col md={8}>
                                <Row className='w-100 px-3 pt-2'>
                                    <Col md={4} className='mt-2'>
                                        <img src={post.Image} alt="Car Image" style={{ width: '100%' }} />
                                    </Col>
                                    <Col md={8} className='mt-3'>
                                        <h3>{post.Name}</h3>
                                        <Row className='w-100'>
                                            <Col className='my-3' style={{ fontSize: '19px' }}>
                                                <p><FontAwesomeIcon className='text-success' icon="fa-solid fa-location-dot" /> {post.CityArea || 'N/A'}</p>
                                            </Col>
                                            <Col className='my-3' style={{ fontSize: '19px' }}>
                                                <p><FontAwesomeIcon className='text-success' icon="fa-solid fa-money-bill" /> {post.Price || 'N/A'}<strong>$</strong></p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className='px-3'>
                            <h1>Car Description</h1>
                            <p>{post.Description || 'No Description listed'}</p>
                            <h3>Features</h3>
                            <ul className="p-0" style={{ listStyle: 'none' }}>
                                {post.Features
                                    ? post.Features.split(/\n|,/).map((feature, index) => (
                                        <li key={index}><FontAwesomeIcon className="me-2 text-success" icon='fas fa-check' />{feature.trim()}</li>
                                    ))
                                    : <p>No features available</p>
                                }
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='my-3 px-5'>
                    <Card className='px-5 pt-3' style={{ backgroundColor: '#A3D1C6' }}>
                        <h4>Advertisement Summary</h4>
                        <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post?.OwnerName || 'N/A'}</p>
                        <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post.Category || 'N/A'}</p>
                        <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post.CityArea || 'N/A'}</p>
                        <p><FontAwesomeIcon icon="fas fa-angle-right" /> <strong>Price</strong>: {post.Price || 'N/A'}<strong>$</strong></p>
                        <p><FontAwesomeIcon icon="fas fa-angle-right" /> <strong>Contact</strong>: {post?.OwnerContact || 'N/A'}</p>
                    </Card>
                    <Button
                        variant="none"
                        style={{ fontWeight: 'bold' }}
                        className="ms-3 text-success my-3"
                        onClick={() => Navigate(-1)}
                    >
                        <FontAwesomeIcon icon="fas fa-angle-left" /> Back
                    </Button>
                </Col>
            </Row>
        </>
    );
}



// import { Button, Card, Col, Row } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// export default function MoreDetails() {
//     const Navigate = useNavigate();

//     const [user, setUser] = useState(null);

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

//     const location = useLocation();
//     const post = location.state || JSON.parse(localStorage.getItem("carPost"));

//     if (!post) {
//         return <h3 className='text-center text-danger'>No Data found!</h3>;
//     }

//     console.log("Received Post:", post);// to check the data recieved or not

//     return (
//         <>
//             <img src="/images/carDetails.jpeg" alt="car Details" className='w-100 mb-4' />
//             <Row className='g-0'>
//                 <Col md={7} className='my-3'>
//                     <div>
//                         <Row className='w-100'>
//                             <Col md={8}>
//                                 <Row className='w-100 px-3 pt-2'>
//                                     <Col md={4} className='mt-2'>
//                                         <img src={post.Image} alt="Car Image" style={{ width: '100%' }} />
//                                     </Col>
//                                     <Col md={8} className='mt-3'>
//                                         <h3>{post.Name}</h3>
//                                         <Row className='w-100'>
//                                             <Col className='my-3' style={{ fontSize: '19px' }}>
//                                                 <p><FontAwesomeIcon className='text-success' icon="fa-solid fa-location-dot" /> {post.CityArea || 'N/A'}</p>
//                                             </Col>
//                                             <Col className='my-3' style={{ fontSize: '19px' }}>
//                                                 <p><FontAwesomeIcon className='text-success' icon="fa-solid fa-money-bill" /> {post.Price  || 'N/A'}<strong>$</strong></p>
//                                             </Col>
//                                         </Row>
//                                     </Col>
//                                 </Row>
//                             </Col>
//                         </Row>
//                         <div className='px-3'>
//                             <h1>Car Description</h1>
//                             <p>{post.Description || 'No Description listed'} </p>
//                             <h3>Features</h3>
//                             <ul className="p-0" style={{ listStyle: 'none' }}>
//                                 {post.Features
//                                     ? post.Features.split(/\n|,/).map((feature, index) => (
//                                         <li key={index}><FontAwesomeIcon className="me-2 text-success" icon='fas fa-check' />{feature.trim()}</li>
//                                     ))
//                                     : <p>No features available</p>
//                                 }
//                             </ul>
//                         </div>
//                     </div>
//                 </Col>
//                 <Col md={4} className='my-3 px-5'>
//                     <Card className='px-5 pt-3' style={{ backgroundColor: '#A3D1C6' }}>
//                         <h4>Advertisement Summary</h4>
//                         <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post?.OwnerName || 'N/A'}</p>
//                         <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post.Category || 'N/A'}</p>
//                         <p><FontAwesomeIcon icon="fas fa-angle-right" /> {post.CityArea || 'N/A'}</p>
//                         <p><FontAwesomeIcon icon="fas fa-angle-right" /> <strong>Price</strong>: {post.Price || 'N/A'}<strong>$</strong></p>
//                         <p><FontAwesomeIcon icon="fas fa-angle-right" /> <strong>Contact</strong>: {post?.OwnerContact || 'N/A'}</p>
//                     </Card>
//                     <Button
//                         variant="none"
//                         style={{ fontWeight: 'bold' }}
//                         className="ms-3 text-success my-3"
//                         onClick={() => Navigate(-1)}
//                     >
//                         <FontAwesomeIcon icon="fas fa-angle-left" /> Back
//                     </Button>

//                 </Col>
//             </Row>
//         </>
//     );
// }


