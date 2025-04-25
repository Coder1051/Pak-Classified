import React from 'react'
import { Row , Col } from 'react-bootstrap'

const AdCategory = () => {
    return (
        <>
            <img src="/images/adCategory.jpeg" alt="adCategory" style={{ width: '100%' }} />
            <h1 className='text-success text-center my-3' style={{ fontWeight: '700' }}  >Hatchback</h1>
            <div className="card">
                <Row style={{ width: '100%', margin: '20px auto' }}>
                    <Col md={3} >
                        <img src="/images/2.jpg" className="card-img-top  w-100" style={{ height: '200px ', objectFit: 'cover', objectPosition: 'center' }} alt="Post Image" />
                    </Col>
                    <Col md={8} className="card-body">
                        <h5 className="card-title">
                            Ghufran's Car
                            {/* {post.title} */}
                        </h5>
                        <p className="card-text">
                            This is my First Post.
                            {/* {post.body.substring(0, 100)}... */}
                        </p>
                        <button className="btn btn-primary">Read More</button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdCategory
