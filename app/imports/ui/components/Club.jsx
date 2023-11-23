import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a card with club information. See pages/ListClubs.jsx. */
const Club = ({ club, onAddToProfile }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={club.image} width={75} />
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
      <Link to={`/edit/${club._id}`}>Edit</Link>
      <Button onClick={onAddToProfile}>Add to My Clubs</Button>
    </Card.Body>
  </Card>

);

// Require a document to be passed to this component.
Club.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    meetingTime: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string), // Adding categories to PropTypes
  }).isRequired,
  onAddToProfile: PropTypes.func, // Adding PropType for onAddToProfile
};

export default Club;
