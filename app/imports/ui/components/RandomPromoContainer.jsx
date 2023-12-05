import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Carousel, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from './LoadingSpinner';

const ClubCarousel = () => {
  // Fetch clubs and set up subscription
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: subscription.ready(),
    };
  }, []);

  // Function to get two random clubs
  const getRandomClubs = (clubsArray, numClubs) => clubsArray.sort(() => 0.5 - Math.random()).slice(0, numClubs);

  // Get two random clubs from the list
  const randomClubs = ready ? getRandomClubs(clubs, 2) : [];

  return ready ? (
    <Container className="py-5">
      <Carousel>
        {randomClubs.map((club, idx) => (
          <Carousel.Item key={idx} interval={3000}>
            <div
              className="d-block w-100 carousel-background"
              style={{ backgroundImage: `url(${club.image})` }}
            >
              <div className="carousel-caption-container">
                <h3 className="pb-3">{club.name}</h3>
                <p>{club.description}</p>
                <p>Meeting Time: {club.meetingTime}</p>
              </div>
              <div className="carousel-button-container">
                <Button variant="primary">Join Club</Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ClubCarousel;
