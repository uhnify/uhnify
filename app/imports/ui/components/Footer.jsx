import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col md={3}>
          <h5>Contact Us</h5>
          <address>
            <p>EXAMPLE</p>
            University of Hawaii at Manoa<br />
            2500 Campus Road, Honolulu, HI 96822<br />
            <a href="mailto:studenthelp@hawaii.edu">studenthelp@hawaii.edu</a><br />
            (808) 956-0000
          </address>
        </Col>
        <Col md={3}>
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>EXAMPLE</li>
            <li><a href="/">Student Portal</a></li>
            <li><a href="/">Club Directory</a></li>
            <li><a href="/">Event Calendar</a></li>
            {/* Other links */}
          </ul>
        </Col>
        <Col md={3}>
          <h5>Follow Us</h5>
          <p>EXAMPLE</p>
          {/* Social media icons */}
        </Col>
        <Col md={3}>
          <h5>Support and Feedback</h5>
          <ul className="list-unstyled">
            <li>EXAMPLE</li>
            <li><a href="/">Report an Issue</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Use</a></li>
            {/* Other legal links */}
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
