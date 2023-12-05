import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/events/Events';
import { EventClubs } from '../../api/events/EventClubs';

const ListEventsCalendar = () => {
  const { ready, events } = useTracker(() => {
    const subscription = Meteor.subscribe(EventClubs.userPublicationName);
    const rdy = subscription.ready();
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

  return ready ? (
    <Container>
      <div>
        <h1>Event Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={formattedEvents}
          headerToolbar={{
            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'dayGridMonth,dayGridWeek,dayGridDay', // will normally be on the right. if RTL, will be on the left
          }}
        />
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListEventsCalendar;
