import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Calendar from 'react-calendar';
import { Events } from '../../api/events/Events'; // Adjust the path as necessary
import LoadingSpinner from '../components/LoadingSpinner';

const ListEventsCalender = () => {
  const { events, isLoading } = useTracker(() => {
    // Fetch and sort events from EventsCollection
    const fetchedEvents = Events.collection.find({}, { sort: { date: 1 } }).fetch();
    return { events: fetchedEvents, isLoading: !Meteor.subscribe('events').ready() };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Calendar
            // Calendar-specific props, like setting value to dates of events
            value={events.map(event => new Date(event.date))}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ListEventsCalender;
