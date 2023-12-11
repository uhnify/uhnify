import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';

/** Renders a card with club information. */
/** Renders a card with club information. */
const Club2 = ({ club, onRemoveFromProfile, onViewDetails }) => {
  // Define a maximum character length
  const MAX_DESCRIPTION_LENGTH = 200;

  // Truncate the description if it exceeds the maximum length
  const truncatedDescription = club.description.length > MAX_DESCRIPTION_LENGTH
    ? `${club.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
    : club.description;

  return (
    <Card className="club-card">
      <Card.Header className="club-card-header">
        <Image src={club.image} className="club-card-image" alt={club.name} />
        <div className="club-card-title-area">
          <Card.Title className="club-card-title">{club.name}</Card.Title>
          <Card.Subtitle className="club-card-meeting-time">{club.meetingTime}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body className="club-card-body">
        <Card.Text className="club-card-description">{truncatedDescription}</Card.Text>
        <div className="club-card-categories mb-5">
          {club.categories && club.categories.map(category => (
            <span key={category} className="club-category-tag">{category}</span>
          ))}
        </div>
        <div className="club-card-buttons">
          <Button type="button" onClick={() => onViewDetails(club)} className="mt-3 club-card-detail-link">
            View Details
          </Button>
          <Button onClick={() => onRemoveFromProfile(club.clubID)} className="mt-3 club-card-remove-link">
            Remove from My Clubs
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// PropTypes
Club2.propTypes = {
  club: PropTypes.shape({
    clubID: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    meetingTime: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onRemoveFromProfile: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default Club2;
