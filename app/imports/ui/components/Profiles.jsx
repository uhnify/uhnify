import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';

/** Renders a large card with profile information */
const ProfileCard = ({ profile }) => {
  const removeItem = (docID, collection) => {
    collection.remove(docID);
  };
  return (
    <Card className="profile-card" style={{ width: '100%' }}> {/* Adjust width as needed */}
      <Card.Header className="profile-card-header d-flex flex-column align-items-center">
        <Image src={profile.picture || '/images/default-profile.png'} width={100} alt="Profile Picture" />
        <div className="mt-2"> {/* Adds margin-top for spacing */}
          <p className="text-black"><strong>First Name:</strong> {profile.firstName || 'N/A'}</p>
          <p className="text-black"><strong>Last Name:</strong> {profile.lastName || 'N/A'}</p>
          <Button variant="danger" onClick={() => removeItem(profile._id)} className="px-2">Delete</Button>

          <Card.Subtitle>{profile.title}</Card.Subtitle>
          <Card.Text>{profile.bio}</Card.Text>
        </div>
      </Card.Header>

      {/* <Card.Body className="profile-card-body"> */}
      {/*  <h5>Clubs</h5> */}
      {/*  <ListGroup variant="flush"> */}
      {/*    {clubs.map(club => ( */}
      {/*      <ListGroup.Item key={club._id}>{club.name}</ListGroup.Item> */}
      {/*    ))} */}
      {/*  </ListGroup> */}
      {/*  <h5>Events</h5> */}
      {/*  <ListGroup variant="flush"> */}
      {/*    {events.map(event => ( */}
      {/*      <ListGroup.Item key={event._id}>{event.title}</ListGroup.Item> */}
      {/*    ))} */}
      {/*  </ListGroup> */}
      {/*  <h5>Interests</h5> */}
      {/*  <div> */}
      {/*    {interests.map(interest => ( */}
      {/*      <span key={interest._id} className="interest-tag">{interest.name}</span> */}
      {/*    ))} */}
      {/*  </div> */}
      {/*  /!* Add any additional user actions or links here *!/ */}
      {/* </Card.Body> */}
    </Card>
  );
};

// Define propTypes for ProfileCard
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string,
    UH_ID: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
