import React from 'react';
import { Container, Image, Carousel, Row, Col } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <h1 className="d-flex justify-content-center">Welcome to UHnify</h1>
    <p className="d-flex justify-content-center"> Discover, Connect, and Join Clubs at UH with Ease</p>
    <hr />
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col sm={4} lg={4} className="text-center">
          <h2 style={{ color: '#217eab' }}>Explore Clubs</h2>
          <p className="lead">Browse through the various clubs UH has to offer.</p>

        </Col>

        <Col sm={4} lg={4} className="text-center">
          <h2 style={{ color: '#217eab' }}>Explore Events</h2>
          <p className="lead">Browse through the various events UH has to offer.</p>
          {/* Insert events calendar or list here */}
        </Col>
        <Col sm={4} lg={4} className="text-center">
          <h2 style={{ color: '#217eab' }}>Get Started</h2>
          <p className="lead">Start your adventure</p>
          {/* Insert events calendar or list here */}
        </Col>
      </Row>
    </Container>
    <Container className="carousel-container">
      <Carousel className="py-4">
        <Carousel.Item>
          <Image className="d-block w-100 h-custom" src="images/AccountingClub.png" />
          <Carousel.Caption>
            <h3>Accounting Club</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100 h-custom" src="images/AccountingClub.png" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100 h-custom" src="images/AccountingClub.png" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>

  </>
);

export default Landing;
