import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import {Instagram, Twitter, Facebook, Linkedin } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
/** I need to center columns and push them towards the center vertical line */
const Footer = () => (
    <footer className="mt-auto py-3 dark-green-navbar">
      <Container fluid className="footer">
        <Row className="justify-content-center">
          <Col lg={2} className="footer-column">
            <h2>SOCIALS</h2>
            <hr className="heading-underline" />
            <a href="https://www.facebook.com/uhmanoa/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook className="px-2" size={45}/>
            </a>
            <a href="https://www.instagram.com/uhmanoanews/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram className="px-2" size={45}/>
            </a>
            <a href="https://twitter.com/uhmanoa?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter className="px-2" size={45}/>
            </a>
            <a href="https://www.linkedin.com/school/uhmanoa/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin className="px-2" size={45}/>
            </a>
          </Col>

          <Col lg={2} className="footer-column">
            <h2>ABOUT</h2>
            <hr className="heading-underline" />
            <div><Link to="https://uhnify.github.io/" className="footer-link">GITHUB HOMEPAGE</Link></div>
            <div><Link to="/clubdetail" className="footer-link">ABOUT US</Link></div>
            <h2 className="pt-4">HELP</h2>
            <hr className="heading-underline" />
            <a href="mailto:juncellv@hawaii.edu" className="footer-link">CONTACT</a>
          </Col>

          <Col lg={1} className="d-none d-md-block vertical-line-container">
            <div className="vertical-line"></div>
          </Col>

          <Col lg={2} className="footer-column">
            <p>  <strong>UHnify</strong>: The Ultimate Student Club Experience for UH Manoa - A platform revolutionizing student connections at the University of Hawaii at Manoa. Empowering students with interactive tools, UHnify fosters club engagement, personalized experiences, and streamlined club management. Powered by Meteor and MongoDB, UHnify offers a unified ecosystem, making university life more vibrant and connected.</p>
            <p className="pt-4"><strong>© 2023 by UHnify</strong></p>
          </Col>
        </Row>
      </Container>
    </footer>
);

export default Footer;
