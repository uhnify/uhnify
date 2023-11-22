import React from 'react';
import { Row, Container, Col, Button, Card, Image, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Club';
import ClubAddItem from '../components/ClubAddItem';
import LoadingSpinner from '../components/LoadingSpinner';

const ClubFinder = () => {
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Club documents.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Club documents
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Col>
      <h2>Filter</h2>
      <Form>
        <Form.Check label="sports" />
        <Form.Check label="games" />
      </Form>
      </Col>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={3}>
            {clubs.map((club) => (<Col key={club._id}><ClubAddItem club={club} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ClubFinder;
