import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Instagram, Twitter, Facebook, Linkedin } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 dark-green-navbar">
    <Container>
      <Row xs={1} md={1} lg={3}>
        <Col>
          <Row className="pb-3">
            <Image className="pt-3" src="images/UmifyLOGO.png" width="300" height="250" />
          </Row>
          <Row>
            <Button variant="outline-primary" id="homepagebutton" href="https://uhnify.github.io/" width="100" height="100">
              UHnify Homepage
            </Button>
          </Row>

        </Col>
        <Col className="text-center text-white">
          <Row className="text-center text-white">
            <h5>Description</h5>
          </Row>
          <Row>
            <p>
              UHnify: The Ultimate Student Club Experience for UH Manoa - A platform revolutionizing student
              connections at the University of Hawaii at Manoa. Empowering students with interactive tools, UHnify
              fosters club engagement, personalized experiences, and streamlined club management. Powered by Meteor
              and MongoDB, UHnify offers a unified ecosystem, making university life more vibrant and connected.
            </p>
          </Row>
        </Col>
        <Col className="text-center text-white">
          <h5>Contact Us</h5>
          <p><strong>Email:</strong> Unify@hawaii.edu</p>
          <p><strong>Phone:</strong> (808) 956-8111</p>
          <Button variant="outline-primary" id="chatbotbutton">
            Unify chatbot
          </Button>
          <Row className="text-center text-white pt-3">
            <h5>Follow Us</h5>
          </Row>
          <Facebook className="px-2" size={50} />
          <Instagram className="px-2" size={50} />
          <Twitter className="px-2" size={50} />
          <Linkedin className="px-2" size={50} />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
