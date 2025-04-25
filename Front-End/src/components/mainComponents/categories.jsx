import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Categories() {
  const [posts, setPosts] = useState([]); // posts ko state mein store karne ke liye
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const token = "token"; // replace with actual token
      const res = await fetch("http://localhost:4300/api/v1/postAd", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": token, // Ye important hai
        },
      });

      const data = await res.json();
      // console.log(data); // to check Data
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Component mount hote hi fetchPosts() call ho jayega
  }, []); // Empty dependency array ensures it runs only once when component mounts

  return (
    <>
      <h1 className="text-center text-success" style={{ fontWeight: 'bold' }}>Explore By Categories</h1>

      <Row className="w-100 d-flex justify-content-center flex-wrap px-3  " style={{ justifyContent: 'center' }}>
        {posts.slice(0, 8).map((post, index) => (
          <Col md='3' key={index} >
            <Card className='my-3'            >

              <Card.Img variant='top' src={post.Image ? post.Image : "https://i.pinimg.com/474x/89/fd/f3/89fdf37561d764940d38b2fcd489876f.jpg"} />
              <h3 className='ms-3' >{post.Name}</h3>
            </Card>
          </Col>
        ))}
      </Row>

      <h1 className="text-center text-success" style={{ fontWeight: 'bold' }}>Latest Postings</h1>
      <div className='container '>
        <Row className=" m-3 ">
          {posts.slice()
            .reverse()
            .slice(0, 4).map((post, index) => (
              <Col className='ps-4 justify-content-center' key={index} md={6}>
                <Card
                  className='my-3'style={{padding :'0px'}}>
                  {/* Use the post.Image here */}
                  <Card.Img
                    variant="top"
                    src={post.Image ? post.Image : "https://i.pinimg.com/474x/89/fd/f3/89fdf37561d764940d38b2fcd489876f.jpg"}
                    className="w-100"
                    style={{
                      height: '400px',           // Fixed height for consistency
                      objectFit: 'cover',        // Crops the image without distortion
                      borderTopLeftRadius: '0.5rem',
                      borderTopRightRadius: '0.5rem'
                    }}
                  />

                  <Card.Body>
                    <Card.Title>{post.Name}</Card.Title> {/* Replace with actual post data */}
                    <Card.Text>{post.Description}</Card.Text> {/* Replace with actual post data */}

                    <Button onClick={() => {
                      localStorage.setItem("carPost", JSON.stringify(post)); // For reload persistence
                      navigate('/carDetails', { state: post }); // Pass the data to MoreDetails
                    }} variant="success">
                      More Details
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

