import React from 'react';
import { Container, Image, Carousel } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container className="w-50:">
    <Carousel className="py-4">
      <Carousel.Item>
        <Image className="d-block w-100" src="images/ManoaCampus.png" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src="images/ManoaCampus.png" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src="images/ManoaCampus.png" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Container>
);

export default Landing;
