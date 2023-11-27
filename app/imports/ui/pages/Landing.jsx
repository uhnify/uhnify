import React, { useEffect } from 'react';
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
      autoplayTimeout: 5000,
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
                    <h5 className="mb-0 text-center"><b>HTML CSS3 Tutorials</b></h5>
                    <p className="text-center p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/Graduation.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Wordpress Tutorials</b></h5>
                    <p className="text-center p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/PeopleSchool.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>PHP MySQL Tutorials</b></h5>
                    <p className="text-center p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/UniverstyFrontFace.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Javascript Tutorials</b></h5>
                    <p className="text-center p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.</p>
                  </div>
                  <div className="slider-card">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <Image src="/images/PeopleSchool2.png" alt="" />
                    </div>
                    <h5 className="mb-0 text-center"><b>Bootstrap Tutorials</b></h5>
                    <p className="text-center p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam temporibus quidem magni qui doloribus quasi natus inventore nisi velit minima.</p>
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
            <Card>
              <Card.Img src="images/StudentsAtFootball.png" alt="Events" />
              <Card.Body>
                <Card.Title>Events</Card.Title>
                <Card.Text>Join the community in exciting events around campus.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card>
              <Card.Img src="images/KumbayaCircle2.png" alt="Browse Clubs" />
              <Card.Body>
                <Card.Title>Browse Clubs</Card.Title>
                <Card.Text>Discover clubs that match your interests and become a member.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card>
              <Card.Img src="images/StudentsAtCafe.png" alt="My Clubs" />
              <Card.Body>
                <Card.Title>My Clubs</Card.Title>
                <Card.Text>View and manage your club memberships and activities.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Landing;
