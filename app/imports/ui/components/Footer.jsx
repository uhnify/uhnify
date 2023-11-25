import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Instagram, Twitter, Facebook, Linkedin } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer">
    <Container>
      <Row className="row-cols-1 row-cols-lg-3">
        <Col className="text-center text-lg-start">
          <Image src="images/UmifyLOGO.png" fluid alt="footerLogo" className="pb-3"/>
          <Button className="w-100 footer-button" href="https://uhnify.github.io/">
            UHnify Homepage
          </Button>
        </Col>
        <Col className="text-white text-center">
          <h5>Description</h5>
          <p>
            UHnify: The Ultimate Student Club Experience for UH Manoa - A platform revolutionizing student connections at the University of Hawaii at Manoa. Empowering students with interactive tools, UHnify fosters club engagement, personalized experiences, and streamlined club management. Powered by Meteor and MongoDB, UHnify offers a unified ecosystem, making university life more vibrant and connected.
          </p>
        </Col>
        <Col className="text-white text-center">
          <h5>Contact Us</h5>
          <p><strong>Email:</strong> Unify@hawaii.edu</p>
          <p><strong>Phone:</strong> (808) 956-8111</p>
          <Button className="footer-button" href="#">
            Unify chatbot
          </Button>
          <div className="social-icons pt-3">
            <Facebook size={30}/>
            <Instagram size={30}/>
            <Twitter size={30}/>
            <Linkedin size={30}/>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
