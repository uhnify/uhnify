import React from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import ClubCarousel from '../components/ClubCarousel';

const Profilez = () => {
  // Fetches and tracks the profile data for the current user
  const { ready, profile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Fetches the current user's profile data
    const userProfile = Profiles.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: subscription.ready(), // Checks if the subscription is ready
      profile: userProfile, // Holds the fetched profile data
    };
  }, []);

  if (!ready || !profile) {
    return <LoadingSpinner />; // or some other indication that data is loading
  }
  // use this to pass into schema because userId doenst work

  return ready ? (
    <Container id="profile-page" className="py-3">
      <Row className="justify-content-center mb-4">
        <Col>
          <Image src="/images/Header.png" fluid alt="Banner" className="rounded-banner" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {/* Left Card for Information (Name, Email, Title) */}
        <Col md={4}>
          <Card className="card-container bio">
            <Card.Body className="d-flex justify-content-center flex-column">

              <div className="text-display w-75 text-center">Firstname: {profile.firstName || 'N/A'}</div>
              <div className="text-display w-75 text-center">Lastname: {profile.lastName || 'N/A'}</div>
              <div className="text-display w-75 text-center">Email: {profile.email || 'N/A'}</div>
              <div className="text-display w-75 text-center">Title: {profile.title || 'N/A'}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Center Card with Profile Picture */}
        <Col md={4}>
          <Card className="card-container bio">
            <Card.Body className="text-center">
              <img src={profile.picture} alt="Profile" className="profile-picture rounded-circle" />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Card for Bio */}
        <Col md={4}>
          <Card className="bio card-container">
            <Card.Body>
              {/* Display Bio Information */}
              <div className="text-display">Bio: {profile.bio || 'N/A'}</div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
      <ClubCarousel />
    </Container>
  ) : <LoadingSpinner />;
};

export default Profilez;
