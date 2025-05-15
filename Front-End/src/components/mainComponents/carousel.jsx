import { Carousel, Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PostAdModal from '../mainComponents/PostAdModal';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // 👉 Import js-cookie

function CarouselX() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // 👉 Use cookies to get the user instead of localStorage
  useEffect(() => {
    const storedUser = Cookies.get("user"); 
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from cookies", error);
      }
    }
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
  
      .fade-text {
        animation: fadeIn 1.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const imageStyle = {
    width: '100%',
    height: '90vh',
    objectFit: 'cover'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  };

  const textContainerStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <Carousel fade>
      {[6, 7, 11].map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={`images/${img}.jpg`}
            alt={`slide-${img}`}
            style={imageStyle}
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div style={overlayStyle}>
            <Container style={{ height: '100%' }} className="me-5">
              <Row className="h-100 align-items-center">
                <Col lg={6} className="text-white">
                  <div className="fade-text" style={textContainerStyle}>
                    <h2 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                      Shift Into Gear: <br />
                      Your Destination <br />
                      for Car Excellence
                    </h2>
                    <p className="lead mb-5" style={{ fontSize: '1.5rem' }}>
                      Drive Your Dream: Find Your Perfect Car Today
                    </p>
                    <div className='d-flex flex-wrap'>
                      <Link className="nav-link rounded p-2 m-3 ad-post bg-success text-white" style={{ fontSize: 26 }}>
                        Select a Car
                      </Link>
                      {
                        user ? (
                          <Link onClick={() => setShowModal(true)} className="nav-link rounded p-2 m-3 ad-post bg-primary text-white" style={{ fontSize: 26 }}>
                            Post Advertisement
                          </Link>
                        ) : (
                          <Link hidden onClick={() => setShowModal(true)} className="nav-link rounded p-2 m-3 ad-post bg-primary text-white" style={{ fontSize: 26 }}>
                            Post Advertisement
                          </Link>
                        )
                      }
                      <PostAdModal show={showModal} handleClose={() => setShowModal(false)} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselX;
