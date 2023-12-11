import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
    const subscription2 = Meteor.subscribe(EventClubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Club documents
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);
  // Format the events for FullCalendar
  const formattedEvents = events.map((event) => ({
    title: event.title, // Set the title to "Meeting"
    start: new Date(event.date), // Use the date from your collection
    description: event.description,
    color: '#FFA500',
    eventClassNames: ['red-title-background'], // Add this line
  }));

  return (
    ready ? (
      <>
        <Container id="my-events" className="py-3">
          {events.length === 0 ? (
            <Row className="justify-content-center">
              <Col className="text-center">
                <h2>You currently have no events</h2>
              </Col>

            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col>
                <Col className="text-center">
                  <h2>My Events</h2>
                </Col>
                <Row xs={1} md={2} lg={4}>
                  {events.map((event) => (
                    <Col key={event._id}><EventCard event={event} /></Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}
        </Container>

        <Container id="event-calendar" className="calendar-container mb-5">
          <div className="calendar-header">
            <h2>Event Calendar</h2>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
          />
        </Container>
      </>
    ) : <LoadingSpinner />
  );
};

export default MyEvents;
