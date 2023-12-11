import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventCardAdmin = ({ event, collection }) => {
  const removeItem = (docID) => {
    console.log(`remove eventItem to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
    <Card className="event-card"> {/* Add class for styling */}
      <Card.Header className="event-card-header"> {/* Add class for styling */}
        {/* Use event image or a default one */}
        <Image src={event.image || 'images/default-event.jpg'} width={75} alt={event.title} className="event-card-image" />
        <div className="event-card-title-area"> {/* Div for title and date */}
          <Card.Title className="event-card-title">{event.title}</Card.Title>
          <Card.Subtitle className="event-card-date">{event.date.toDateString()}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body className="event-card-body"> {/* Add class for body styling */}
        <Card.Text className="event-card-description">{event.description}</Card.Text>
        {/* Conditionally render Edit link based on user's permission */}
        <Link to={`/edit/event/${event._id}`} className="event-card-edit-link">Description</Link>
        <Link to={`/edit/event/${event._id}`} className="px-2">Edit</Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link variant="danger" onClick={() => removeItem(event.eventID)} className="px-2">Delete</Link>
      </Card.Body>
    </Card>
  );
};

// Define propTypes for EventCard
EventCardAdmin.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    createdBy: PropTypes.string, // Assuming createdBy is a string
    eventID: PropTypes.number, // Assuming eventID is a number as per your schema
    image: PropTypes.string, // Assuming you have an image field
    clubID: PropTypes.number, // Assuming clubID is a number as per your schema
    // Add other fields as necessary
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default EventCardAdmin;
