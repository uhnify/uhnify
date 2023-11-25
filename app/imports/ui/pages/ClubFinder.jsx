import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Row, Container, Col, Form } from 'react-bootstrap';
import Club from '../components/Club.jsx'; // Import the Club component
import { Clubs } from '/imports/api/club/Club.js'; // Import the Clubs collection

const ClubFinder = ({ clubs }) => (
  <Container className="py-3">
    <Col>
      <h2>Filter</h2>
      <Form>
        {/* Add more filters as necessary */}
        <Form.Check label="sports" />
        <Form.Check label="games" />
      </Form>
    </Col>
    <Row className="justify-content-center">
      <Col className="text-center">
        <h2>Clubs</h2>
      </Col>
    </Row>
    <Row xs={1} md={2} lg={3} className="g-4">
      {clubs.map(club => (
        <Col key={club._id}>
          <Club club={club} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('clubs.all');
  return {
    clubs: subscription.ready() ? Clubs.collection.find().fetch() : [],
  };
})(ClubFinder);
