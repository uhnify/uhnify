import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';

/** Renders a card with club information. */
const Club = ({ club, onAddToProfile }) => {
  // Limit the description to a specific number of characters
  const descriptionLimit = 200; // You can change this value to your desired limit
  const shortDescription = club.description.substring(0, descriptionLimit);

  return (
    <Card className="club-card"> {/* Add class for styling */}
      <Card.Header className="club-card-header"> {/* Add class for styling */}
        <Image src={club.image} className="club-card-image" alt={club.name} /> {/* Add class for image styling */}
        <div className="club-card-title-area"> {/* Div for title and meeting time */}
          <Card.Title className="club-card-title">{club.name}</Card.Title>
          <Card.Subtitle className="club-card-meeting-time">{club.meetingTime}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body className="club-card-body"> {/* Add class for body styling */}
        <Card.Text className="club-card-description">{shortDescription}</Card.Text>
        <div className="club-card-categories"> {/* Div for categories */}
          {club.categories && club.categories.map(category => (
            <span key={category} className="club-category-tag">{category}</span>
          ))}
        </div>
        <Button onClick={onAddToProfile} className="mt-3 club-card-remove-link"> Add to My Clubs</Button>
      </Card.Body>
    </Card>
  );
};

// PropTypes to match ClubsCollection schema
Club.propTypes = {
  club: PropTypes.shape({
    clubID: PropTypes.number, // Assuming clubID is a number as per your schema
    name: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    meetingTime: PropTypes.string,
    contactInfo: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string), // Array of strings for categories
  }).isRequired,
  onAddToProfile: PropTypes.func, // Validates the onAddToProfile prop
};

// DefaultProps
Club.defaultProps = {
  onAddToProfile: () => {},
};

export default Club;
