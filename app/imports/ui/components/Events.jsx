import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a card with event information */
const EventCard = ({ event }) => (
  <Card className="h-100">
    <Card.Header>
      {/* Replace with event.image if you have images for events */}
      <Image src= 'images/codingWorkshop.png' width={75} />
      <Card.Title>{event.title}</Card.Title>
      <Card.Subtitle>{event.date.toDateString()}</Card.Subtitle>
      <Card.Subtitle>{event.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{event.description}</Card.Text>
      <Link to={`/edit/event/${event._id}`}>Edit</Link>
      {/* Adjust the link as needed for your routing */}
    </Card.Body>
  </Card>
);

// Define propTypes for EventCard
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    _id: PropTypes.string,
    // Add other fields as necessary
  }).isRequired,
};

export default EventCard;
