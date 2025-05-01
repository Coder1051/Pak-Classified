import { Button, Form, Col, Row, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Categories from "../components/mainComponents/categories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselX from "../components/mainComponents/carousel"
const PakistanCities = [
    "Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi",
    "Multan", "Gujranwala", "Peshawar", "Quetta", "Sialkot",
    "Bahawalpur", "Sargodha", "Sukkur", "Jhang", "Sheikhupura",
    "Mardan", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara",
    "Wah Cantonment", "Dera Ghazi Khan", "Mingora", "Mirpur Khas",
    "Chiniot", "Kamoke", "Hyderabad", "Abbottabad", "Mansehra",
    "Jacobabad", "Muzaffargarh", "Khanewal", "Jhelum", "Hafizabad",
    "Kohat", "Dera Ismail Khan", "Turbat", "Battagram", "Shikarpur", "Nankana Sahib", "Hari Pur"
];

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const token = "token"; // Replace with real token
            const res = await fetch("http://localhost:4300/api/v1/postAd", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": token,
                },
            });

            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = () => {
        const result = posts.filter(post =>
            (keyword === "" || post.Name?.toLowerCase().includes(keyword.toLowerCase())) &&
            (category === "" || post.Category === category) &&
            (city === "" || post.CityArea === city)
        );
        setFilteredPosts(result);
        setSearchPerformed(true);
    };

    return (
        <>
        <CarouselX/>
            <div className="bg-success pt-3 px-3">
                <Form>
                    <Row>
                        <Col md={3} className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Keyword"
                                className="w-75"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Select
                                className="w-75"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </Form.Select>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Form.Select
                                className="w-75"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">Select City Area</option>
                                {PakistanCities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={3} className="mb-3">
                            <Button variant="dark" className="w-100" onClick={handleSearch}>
                                <FontAwesomeIcon icon="fas fa-search" /> Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {searchPerformed ? (
                <Container className="mt-4">
                    {filteredPosts.length > 0 ? (
                        <Row className="w-100 d-flex flex-wrap px-3">
                            {filteredPosts.map((post, index) => (
                                <Col md={6} key={index} className="mb-4">
                                    <Card className="">
                                        <Card.Img
                                            className="w-100"
                                            variant='top'
                                            src={post.Image || "https://i.pinimg.com/474x/89/fd/f3/89fdf37561d764940d38b2fcd489876f.jpg"}
                                        />
                                        <Card.Body>
                                            <h3>{post.Name}</h3>
                                            <p><strong>City:</strong> {post.CityArea}</p>
                                            <p><strong>Condition:</strong> {post.Category}</p>
                                            <p>{post.Description}</p>
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
                    ) : (
                        <div className="text-center text-muted mt-3">
                            <h5 className="text-danger">No matching posts found.</h5>
                        </div>
                    )}
                </Container>
            ) : (
                <Categories />
            )}
        </>
    );
};

export default Home;



