import React from 'react';
import { Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <h1 className="d-flex justify-content-center">Welcome to UHnify</h1>
    <Image fluid src="images/ManoaImage.png" />
  </>

);

export default Landing;
