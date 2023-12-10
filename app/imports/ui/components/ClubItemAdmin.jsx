import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Club (Admin) table. See pages/ListClubAdmin.jsx. */
const ClubItemAdmin = ({ club, collection }) => {
  const removeItem = (docID) => {
    console.log(`remove eventItem to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
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
        <Link to={`/edit/${club._id}`} className="px-2">Edit</Link>
        <Link to={`/edit/${club._id}`} className="px-2">Delete</Link>
        <Button variant="danger" onClick={() => removeItem(club._id)} className="px-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ClubItemAdmin.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    meetingTime: PropTypes.string,
    owner: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  collection: PropTypes.object.isRequired,
};

export default ClubItemAdmin;
