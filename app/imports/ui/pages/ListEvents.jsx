import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events/Events'; // Adjust the path as necessary
import EventCard from '../components/Events';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a card containing all of the Events documents. Use <Event> to render each card. */
const ListEvents = () => {
  // useTracker connects Meteor data to React components.
  const { ready, events } = useTracker(() => {
    // Get access to Events documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="list-events-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Up Coming Events</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {events.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListEvents;
