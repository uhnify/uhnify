import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Instagram, Twitter, Facebook, Linkedin } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer">
    <Container>
      <Row className="justify-content-between">
        <Col lg={4} className="mb-3 mb-lg-0 text-center text-lg-start">
          <Image src="images/UmifyLOGO.png" fluid alt="footerLogo" className="pb-3" />
          <Button className="w-100 footer-button" href="https://uhnify.github.io/">
            UHnify Homepage
          </Button>
        </Col>
        <Col lg={4} className="mb-3 mb-lg-0 text-white text-center">
          <h5>Description</h5>
          <p>
            UHnify: The Ultimate Student Club Experience for UH Manoa - A platform revolutionizing student connections at the University of Hawaii at Manoa. Empowering students with interactive tools, UHnify fosters club engagement, personalized experiences, and streamlined club management. Powered by Meteor and MongoDB, UHnify offers a unified ecosystem, making university life more vibrant and connected.
          </p>
        </Col>
        <Col lg={4} className="text-white text-center">
          <h5>Contact Us</h5>
          <p><strong>Email:</strong> Unify@hawaii.edu</p>
          <p><strong>Phone:</strong> (808) 956-8111</p>
          <br />

          <h5 className="pt-3">Follow Us</h5>
          <div className="social-icons pt-3">
            <Facebook size={30} />
            <Instagram size={30} />
            <Twitter size={30} />
            <Linkedin size={30} />
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
