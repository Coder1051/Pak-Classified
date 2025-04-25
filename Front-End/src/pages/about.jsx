import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { faFontAwesome } from '@fortawesome/free-regular-svg-icons'

const About = () => {
  return (
    <>
      <img style={{ width: '100%' }} className='mb-3' src="/images/about us.jpeg" alt="About Us" />
      <Row className='w-100 px-2 my-3 ' >
        <Col md={6} >
          <Row className='px-3 ' >
            <Col style={{ padding: '0px 0px' }} >
              <img src="https://plus.unsplash.com/premium_photo-1661891539075-24b4e473f67f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D" className='' style={{ width: '100%', height: '250px' }} alt="Car-1" />
              <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNhcnxlbnwwfHwwfHx8MA%3D%3D" className='' style={{ width: '100%', height: '250px' }} alt="Car-1" />
            </Col>
            <Col style={{ padding: '0px 0px' }} className='pt-5' >
              <img src="https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNhcnxlbnwwfHwwfHx8MA%3D%3D" className='' style={{ width: '100%', height: '250px' }} alt="Car-" />
              <img src="https://images.unsplash.com/photo-1511125357779-27038c647d9d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D" className='' style={{ width: '100%', height: '250px' }} alt="Car-" />
            </Col>
          </Row>
        </Col>

        <Col md={6} >
          <h1 style={{ fontWeight: '700', fontFamily: 'Sans-serif' }} className='mb-5' >
            PakClassified is a comprehensive online platform where users can browse, buy, sell, and compare cars
          </h1>
          <p style={{ fontWeight: '500' }}  className='mb-5'>
            Welcome to PakClassified, your premier destination for all things automotive in Pakistan. Our platform is designed to offer a seamless
            experience for users looking to browse, buy, sell, and compare cars. Whether you are a car enthusiast or a first-time buyer,
            PakClassified is committed to making your car shopping journey smooth and hassle-free.
          </p>
          <ul className='mb-5' >
            <li>  Customer Support</li>
            <li>  Technical Assistance</li>
            <li>  Feedback and Suggestion</li>
          </ul>
        </Col>
      </Row>


    </>
  )
}

export default About
