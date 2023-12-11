import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Carousel, Button, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from './LoadingSpinner';

const ClubCarousel = () => {
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: subscription.ready(),
    };
  }, []);

  const getRandomClubs = (clubsArray, numClubs) => clubsArray.sort(() => 0.5 - Math.random()).slice(0, numClubs);
  const randomClubs = ready ? getRandomClubs(clubs, 2) : [];

  return ready ? (
    <Container className="py-5">
      <Carousel className="rounded-edge">
        {randomClubs.map((club, idx) => (
          <Carousel.Item key={idx} interval={3000}>
            <Row className="carousel-row">
              <Col
                className="carousel-background d-flex justify-content-center align-items-center"
                style={{ backgroundImage: `url(${club.image})`, minHeight: '500px' }}
              >
                {/* Background image */}
              </Col>
              <Col className="carousel-caption-container d-flex flex-column justify-content-center">
                <h3>{club.name}</h3>
                <p>{club.description}</p>
                <p>Meeting Time: {club.meetingTime}</p>
                <Link to="/search-clubs" className="btn btn-primary mt-auto">
                  <Button variant="primary" className="mt-auto">More Info</Button>
                </Link>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubCarousel;
