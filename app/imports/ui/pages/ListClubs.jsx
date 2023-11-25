import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';
import LoadingSpinner from '../components/LoadingSpinner';

const ListClub = () => {
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const rdy = subscription.ready();
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
          <h2 className="text-center">My Clubs</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {clubs.map((club) => (
              <Col key={club._id}>
                <Club club={club} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClub;
