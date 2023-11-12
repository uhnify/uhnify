import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a card containing all of the Clubs documents. Use <Club> to render each card. */
const ListClub = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {clubs.map((club) => (<Col key={club._id}><Club club={club} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClub;
