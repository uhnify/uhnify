import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';

/** Renders a card with club information. */
const Club = ({ club, onAddToProfile, onViewDetails }) =>
// Limit the description to a specific number of characters
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <Card className="club-card2"> {/* Add class for styling */}
      <Card.Header className="club-card-header"> {/* Add class for styling */}
        <Image src={club.image} className="club-card-image" alt={club.name} /> {/* Add class for image styling */}
        <div className="club-card-title-area"> {/* Div for title and meeting time */}
          <Card.Title className="club-card-title">{club.name}</Card.Title>
          <Card.Subtitle className="club-card-meeting-time">{club.meetingTime}</Card.Subtitle>
          <Card.Subtitle className="club-card-meeting-time py-2">Club ID Number: {club.clubID}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body className="club-card-body2"> {/* Add class for body styling */}
        <div className="club-card-categories"> {/* Div for categories */}
          {club.categories && club.categories.map(category => (
            <span key={category} className="club-category-tag">{category}</span>
          ))}
        </div>
        <Button type="button" onClick={() => onViewDetails(club)} className="mt-3 club-card-detail-link">
          View Details
        </Button>
        <Button onClick={onAddToProfile} className="mt-3 club-card-remove-link"> Add to My Clubs</Button>
      </Card.Body>
    </Card>
  );

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
  onAddToProfile: PropTypes.func,
  onViewDetails: PropTypes.func.isRequired,
};

// DefaultProps
Club.defaultProps = {
  onAddToProfile: () => {},
};

export default Club;
