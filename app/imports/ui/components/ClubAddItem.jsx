import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';

/** Renders a card with club information. See pages/ListClubs.jsx. */
const ClubAddItem = ({ club }) => (
  <Card className="h-100 card">
    <Card.Header>
      <Image src={club.image} width={100} />
      <Card.Title>{club.name}</Card.Title>
      <Card.Subtitle>{club.meetingTime}</Card.Subtitle>
      <Card.Subtitle>{club.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{club.description}</Card.Text>
      {/* Render the categories here */}
      {club.categories && club.categories.map(category => (
        <span key={category} className="club-category-tag">{category}</span>
      ))}
      <Button>Add to My Clubs</Button>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ClubAddItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    meetingTime: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string), // Adding categories to PropTypes
  }).isRequired,
};

export default ClubAddItem;
