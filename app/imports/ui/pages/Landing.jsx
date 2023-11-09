import React from 'react';
import { Container, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <div className="d-flex justify-content-center py-2">
      <Image src="images/ManoaCampus.png" alt="On the Beach" />
    </div>
  </Container>
);

export default Landing;
