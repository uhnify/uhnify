import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { EventClubs } from '../../api/events/EventClubs';
import { Events } from '../../api/events/Events';
import EventCard from '../components/Events';
/* Renders a card containing all of the Clubs documents. Use <Club> to render each card. */
const MyEvents = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Club documents.
    const subscription = Meteor.subscribe(EventClubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Club documents
    const eventItems = Events.collection.find({}).fetch();
    console.log(eventItems);
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="list-clubs" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Events</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {events.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyEvents;
