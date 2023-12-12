import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Events } from '../../api/events/Events'; // Adjust the path as necessary
import EventCard from '../components/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { EventClubs } from '../../api/events/EventClubs';


/* Renders a card containing all of the Events documents. Use <Event> to render each card. */
const ListEvents = () => {
  // useTracker connects Meteor data to React components.
  const { ready, events } = useTracker(() => {
    // Get access to Events documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const subscription2 = Meteor.subscribe(EventClubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Event documents
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
        <Container id="list-events-page" className="py-3">
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
                  <h2>Up Coming Events</h2>
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

export default ListEvents;
