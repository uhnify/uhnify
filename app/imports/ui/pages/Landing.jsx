import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Row, Col, Card } from 'react-bootstrap';
import 'owl.carousel';
/* A simple static component to render some text for the landing page. */
import $ from 'jquery';

const Landing = () => {
  useEffect(() => {
    // Initialize the carousel with specific options
    $('.owl-carousel').owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 15000,
      autoplayHoverPause: true,
      center: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 3,
        },
      },
    });
  }, []);
  return (
    <>
      <Container id="landing-page" fluid className="p-0">
        <main>
          <Container fluid className="py-5">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src="/images/UHManoaLandingPage.png"
                alt="Main campus image"
                fluid
                style={{ borderRadius: '50px' }}
              />
            </div>
          </Container>
          {/* Cards section */}
          <section id="slider" className="pt-5">
            <div className="container">
              <h1 className="text-center"><b>Learn About UH Community</b></h1>
              <div className="slider">
                <div className="owl-carousel">
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/SchoolSunet.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Embrace the Aloha Spirit</b></h5>
                    <p className="text-center p-4">Dive into the heart of UH Manoa&apos;s vibrant student life, where the aloha spirit thrives in every club and event, fostering a welcoming community for all.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/Graduation.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Discover Your Passion</b></h5>
                    <p className="text-center p-4">With an array of clubs at UH Manoa, from technology to arts, find the perfect group that aligns with your interests and kick-start your personal and professional growth.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/PeopleSchool.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Cultural Celebrations</b></h5>
                    <p className="text-center p-4">Celebrate the rich cultural tapestry of UH Manoa through student-led events that honor our diverse backgrounds, traditions, and shared love for learning.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/UniverstyFrontFace.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Green and White Pride</b></h5>
                    <p className="text-center p-4">Join fellow Warriors in green and white, and immerse yourself in school spirit through sports, academic societies, and volunteer organizations that shape leaders of tomorrow.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/PeopleSchool2.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Connect and Collaborate</b></h5>
                    <p className="text-center p-4">UH Manoa&apos;s interactive platform connects you with like-minded peers, mentors, and alumni, opening doors to collaborative opportunities and lifelong friendships.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Container>

      <Container fluid style={{ maxWidth: '2000px' }}>
        <Row className="gx-5">
          {/* Each Col component should span 4 grid units */}
          <Col xs={12} md={6} lg={4}>
            <Link to="/upcoming-events" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card>
                <Card.Img src="images/StudentsAtFootball.png" alt="Events" />
                <Card.Body>
                  <Card.Title>Events</Card.Title>
                  <Card.Text>Join the community in exciting events around campus.</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Link to="/search-clubs" style={{ textDecoration: 'none', color: 'inherit' }}><Card>
              <Card.Img src="images/KumbayaCircle2.png" alt="Browse Clubs"/>
              <Card.Body>
                <Card.Title>Browse Clubs</Card.Title>
                <Card.Text>Discover clubs that match your interests and become a member.</Card.Text>
              </Card.Body>
            </Card></Link>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Link to="/my-clubs" style={{ textDecoration: 'none', color: 'inherit' }}><Card>
              <Card.Img src="images/StudentsAtCafe.png" alt="My Clubs"/>
              <Card.Body>
                <Card.Title>My Clubs</Card.Title>
                <Card.Text>View and manage your club memberships and activities.</Card.Text>
              </Card.Body>
            </Card></Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Landing;
