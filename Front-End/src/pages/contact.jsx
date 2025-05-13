import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.css';

const SERVICE_ID = 'service_iq9ja9i';
const TEMPLATE_ID = 'template_b1grm94';
const PUBLIC_KEY = 'dY92STVe2URsxbn20';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <img style={{ width: '100%' }} className='mb-3' src="/images/Contact.jpeg" alt="Contact Us" />
      <h1 className='text-center' style={{ fontWeight: '700', margin: '60px 0px' }}>
        Contact For Any Query
      </h1>
      
      {/* Contact Cards */}
      <Row className='w-100 ps-4'>
        <Col className='my-5' md={4}>
          <Card style={{ backgroundColor: '#A6CDC6' }}>
            <CardBody className='p-3'>
              <a style={{ textDecoration: 'none', color: 'black' }} href="https://maps.app.goo.gl/xu4RW7YADnGyZbK29">
                <h2 className='ps-5'>
                  <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-location-dot" />
                  &nbsp;&nbsp;Gulberg III , Lahore
                </h2>
              </a>
            </CardBody>
          </Card>
        </Col>
        <Col className='my-5' md={4}>
          <Card style={{ backgroundColor: '#A6CDC6' }}>
            <CardBody className='p-3'>
              <a style={{ textDecoration: 'none', color: 'black' }} href="mailto:evs@gmail.com">
                <h2 className='ps-5'>
                  <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-envelope-open" />
                  &nbsp;&nbsp;evs@gmail.com
                </h2>
              </a>
            </CardBody>
          </Card>
        </Col>
        <Col className='my-5' md={4}>
          <Card style={{ backgroundColor: '#A6CDC6' }}>
            <CardBody className='p-3'>
              <h2 className='ps-5'>
                <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-envelope-open" />
                &nbsp;&nbsp;+12345678998
              </h2>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Form Section */}
      <Row className='w-100 mb-3 ps-2'>
        <Col md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.1636874852597!2d74.33457157544996!3d31.49218427422683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2sus!4v1745014000964!5m2!1sen!2sus"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
        <Col md={6}>
          <div className="mt-4">
            <p>
              For any inquiries, assistance, or feedback, please fill out our contact form below. Our team is{" "}
              <strong>committed to responding promptly</strong> to ensure your experience with PakClassified is exceptional.
            </p>
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className='py-3'
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className='py-3'
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  className='py-3'
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  isInvalid={!!errors.subject}
                />
                <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  className='py-3'
                  rows={4}
                  placeholder="Leave a message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 py-3">
                Send Message
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}


// import React, { useState } from 'react';
// import { Card, CardBody, Col, Row, Form, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const GETFORM_ENDPOINT = 'https://getform.io/f/ayvkxppb'; // ← paste your endpoint here

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(fd => ({ ...fd, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!validate()) return;

//     // build FormData for getform.io
//     const payload = new FormData();
//     Object.entries(formData).forEach(([key, val]) => payload.append(key, val));

//     try {
//       const res = await fetch(GETFORM_ENDPOINT, {
//         method: "POST",
//         body: payload,
//       });

//       if (res.ok) {
//         toast.success("Message sent successfully!");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//         setErrors({});
//       } else {
//         toast.error("Failed to send message.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error sending message.");
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <img style={{ width: '100%' }} className='mb-3' src="/images/Contact.jpeg" alt="Contact Us" />
//       <h1 className='text-center' style={{ fontWeight: '700', margin: '60px 0px' }}>
//         Contact For Any Query
//       </h1>
//       <Row className='w-100 ps-4 ' >
//         <Col className='my-5' md={4} >
//           <Card style={{ backgroundColor: '#A6CDC6' }} >
//             <CardBody className='p-3' >
//               <a style={{ textDecoration: 'none',color:'black' }} href="https://maps.app.goo.gl/xu4RW7YADnGyZbK29">
//                 <h2 className='ps-5'> <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-location-dot" />  &nbsp;&nbsp;Gulberg III , Lahore </h2>
//               </a>
//             </CardBody>
//           </Card>
//         </Col>
//         <Col className='my-5 ' md={4} >
//           <Card style={{ backgroundColor: '#A6CDC6' }} >
//             <CardBody className='p-3' >
//               <a style={{ textDecoration: 'none',color:'black'  }} href="https://email.evs@gmail.com">
//                 <h2 className='ps-5'>  <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-envelope-open" />  &nbsp;&nbsp;evs@gmail.com </h2>
//               </a>
//             </CardBody>
//           </Card>
//         </Col>
//         <Col className='my-5 ' md={4} >
//           <Card style={{ backgroundColor: '#A6CDC6' }}  >
//             <CardBody className='p-3' >
//               <h2 className='ps-5'>  <FontAwesomeIcon className='text-success p-2' style={{ border: '2px solid green', borderRadius: '30%', fontSize: '16px' }} icon="fa-solid fa-envelope-open" />  &nbsp;&nbsp;+12345678998 </h2>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//       <Row className='w-100 mb-3 ps-2'>
//         <Col md={6}>
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.1636874852597!2d74.33457157544996!3d31.49218427422683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2sus!4v1745014000964!5m2!1sen!2sus"
//             width="100%"
//             height="450"
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </Col>
//         <Col md={6}>
//           <div className="mt-4">
//             <p>
//               For any inquiries, assistance, or feedback, please fill out our contact form below. Our team is{" "}
//               <strong>committed to responding promptly</strong> to ensure your experience with PakClassified is exceptional.
//             </p>
//             <Form noValidate onSubmit={handleSubmit}>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       className='py-3'
//                       type="text"
//                       placeholder="Your Name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       isInvalid={!!errors.name}
//                     />
//                     <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Control
//                       className='py-3'
//                       type="email"
//                       placeholder="Your Email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       isInvalid={!!errors.email}
//                     />
//                     <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Group className="mb-3">
//                 <Form.Control
//                   type="text"
//                   className='py-3'
//                   placeholder="Subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   isInvalid={!!errors.subject}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Control
//                   as="textarea"
//                   className='py-3'
//                   rows={4}
//                   placeholder="Leave a message here"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   isInvalid={!!errors.message}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
//               </Form.Group>

//               <Button variant="success" type="submit" className="w-100 py-3">
//                 Send Message
//               </Button>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// }
