import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from './LoadingSpinner';

const ClubRandom = () => {
  // Fetch clubs and set up subscription
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: subscription.ready(),
    };
  }, []);

  // Function to get a random club
  const getRandomClub = (clubsArray) => {
    if (clubsArray.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * clubsArray.length);
    return clubsArray[randomIndex];
  };

  // Get one random club from the list
  const randomClub = ready ? getRandomClub(clubs) : null;

  return ready ? (
    <Container className="py-3">
      {randomClub ? (
        <Container className="random-club-container">
          <Row noGutters>
            <Col md={6}>
              <Image src={randomClub.image} alt={randomClub.name} fluid />
            </Col>
            <Col md={6}>
              <h2>{randomClub.name}</h2>
              <p>{randomClub.description}</p>
              <p>Meeting Time: {randomClub.meetingTime}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>No clubs available.</p>
      )}
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ClubRandom;
