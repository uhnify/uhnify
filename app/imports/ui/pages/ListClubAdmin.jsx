import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Clubs } from '../../api/club/Club';
import ClubItemAdmin from '../components/ClubItemAdmin';
import { Events } from '../../api/events/Events'; // Adjust the path as necessary
import EventCardAdmin from '../components/EventsAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Club documents. Use <ClubItemAdmin> to render each row. */
const ListClubAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { clubs, events, ready } = useTracker(() => {
    // Get access to Club documents.
    const clubSubscription = Meteor.subscribe(Clubs.adminPublicationName);
    //
    const eventSubscription = Meteor.subscribe(Events.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = clubSubscription.ready() && eventSubscription.ready();
    // Get the Club documents
    const itemClub = Clubs.collection.find({}).fetch();
    const itemEvent = Events.collection.find({}).fetch();

    return {
      clubs: itemClub,
      events: itemEvent,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>All Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {clubs.map((club) => (<Col key={club._id}><ClubItemAdmin club={club} collection={Clubs.collection} /></Col>))}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center py-5">
        <Col>
          <Col className="text-center">
            <h2>All Events</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {events.map((event) => (<Col key={event._id}><EventCardAdmin event={event} collection={Events.collection}/></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClubAdmin;
