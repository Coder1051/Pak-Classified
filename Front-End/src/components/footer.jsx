import './css/footer.css';
// import './css/footer.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, InputGroup, Row, Form } from 'react-bootstrap';
import SignUpModal from './mainComponents/signUp';
import { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const footerRef = useRef(null);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  // IntersectionObserver to animate only when footer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = footerRef.current.querySelectorAll('.fade-up');
            children.forEach(el => el.classList.add('fade-in'));
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer className='text-white foota' ref={footerRef}>
      <Row className="foot p-3 w-100">
        <Col md={3} className="my-4">
          <h2 className='my-3 fade-up'>Company</h2>
          <p className='L fade-up delay-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, laborum eaque? Culpa reiciendis voluptas sit inventore voluptates ipsa hic amet.
          </p>
        </Col>
        <Col md={3} className="my-4">
          <h2 className='my-3 fade-up'>Quick Links</h2>
          <p className='L fade-up delay-1'>
            <Link to="about" className="nav-link animated-link">
              <FontAwesomeIcon icon="angle-right" className='me-2' /> About Us
            </Link>
          </p>
          <p className='L fade-up delay-2'>
            <Link to="contact" className="nav-link animated-link">
              <FontAwesomeIcon icon="angle-right" className='me-2' /> Contact Us
            </Link>
          </p>
          <p className='L fade-up delay-3'>
            <Link to="privacy" className="nav-link animated-link">
              <FontAwesomeIcon icon="angle-right" className='me-2' /> Privacy Policy
            </Link>
          </p>
          <p className='L fade-up delay-4'>
            <Link to="term&conditions" className="nav-link animated-link">
              <FontAwesomeIcon icon="angle-right" className='me-2' /> Terms & Conditions
            </Link>
          </p>
        </Col>
        <Col md={3} className="my-4">
          <h2 className='my-3 fade-up'>Contacts</h2>
          <a href="https://maps.app.goo.gl/jhJcThT7FreXUGsV9" className="text-decoration-none fade-up delay-1">
            <p className='L'><FontAwesomeIcon icon="location-dot" className='me-2' /> Ferozpur Road, Gulberg III, Lahore</p>
          </a>
          <a href="tel:+923446171151" className="text-decoration-none fade-up delay-2">
            <p className='L'><FontAwesomeIcon icon="phone" className='me-2' /> +92 344 6171151</p>
          </a>
          <p className='L fade-up delay-3'>
            <FontAwesomeIcon icon="envelope" className='me-2' /> www.evslearning.com
          </p>
          <div className='mt-3 fade-up delay-4'>
            <FontAwesomeIcon icon="fa-brands fa-twitter" className='p-3 me-3 signs' />
            <FontAwesomeIcon icon="fa-brands fa-facebook-f" className='p-3 me-3 signs' />
            <FontAwesomeIcon icon="fa-brands fa-youtube" className='p-3 me-3 signYt' />
            <FontAwesomeIcon icon="fa-brands fa-linkedin-in" className='p-3 signs' />
          </div>
        </Col>
        <Col md={3} className="my-4">
          <h2 className='my-3 fade-up'>Newsletter</h2>
          <p className='L fade-up delay-1'>Subscribe to our newsletter for the latest news and updates.</p>
          <InputGroup className="mb-3 fade-up delay-2" style={{ padding: '5px' }}>
            <Form.Control
              placeholder="Your Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="signup" onClick={() => setShow(true)} className='bg-success text-white animated-button' style={{ margin: '2px' }}>
              Sign Up
            </InputGroup.Text>
            <SignUpModal show={show} handleClose={() => setShow(false)} />
          </InputGroup>
        </Col>
        <div className="footer-divider px-3 fade-up delay-3" />
        <p className='mt-3 fade-up delay-4 text-center'>
          &copy; GS Graphics. Designed by <Link className='text-white animated-link' to="/GBCodz">GB CODz</Link>
        </p>
      </Row>
    </footer>
  );
};

export default Footer;
