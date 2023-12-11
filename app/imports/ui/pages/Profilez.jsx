import React from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

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
          <Card className="card-container">
            <Card.Body>
              <div className="text-display">Firstname: {profile.firstName || 'N/A'}</div>
              <div className="text-display">Lastname: {profile.lastName || 'N/A'}</div>
              <div className="text-display">Email: {profile.email || 'N/A'}</div>
              <div className="text-display">Title: {profile.title || 'N/A'}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Center Card with Profile Picture */}
        <Col md={4}>
          <Card className="card-container">
            <Card.Body className="text-center">
              <img src={profile.picture} alt="Profile" className="profile-picture rounded-circle" />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Card for Bio */}
        <Col md={4}>
          <Card>
            <Card.Body>
              {/* Display Bio Information */}
              <div className="text-display">Bio: {profile.bio || 'N/A'}</div>
            </Card.Body>
          </Card>
        </Col>

      </Row>{/* New Row for small cards */}
      <Row className="justify-content-center pt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Col key={index} xs={12} sm={6} md={2} className="pb-3">
            <Card className="small-card">
              <Card.Body className="text-center">
                <Card.Title>Card {index + 1}</Card.Title>
                <Card.Text>
                  Some details
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profilez;
