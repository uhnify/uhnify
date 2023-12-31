import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ClubDetailsModal = ({ show, handleClose, club }) => {
  // Conditional rendering based on if club data is available
  const modalContent = club ? (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{club.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'black' }}><b><i>Meeting Time: </i></b>{club.meetingTime}</p>
        <p style={{ color: 'black' }}><b><i>Location: </i></b>{club.location}</p>
        <p style={{ color: 'black' }}>{club.description}</p>
        {/* Add more details as needed */}
      </Modal.Body>
    </>
  ) : (
    // Display a loading spinner or a placeholder message if club is null
    <Modal.Body>Loading...</Modal.Body>
  );

  return (
    <Modal show={show} onHide={handleClose}>
      {modalContent}
      <Modal.Footer>
        <Button className="mt-3 club-card-remove-link" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ClubDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired, // this is a boolean right
  handleClose: PropTypes.func.isRequired,
  club: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    meetingTime: PropTypes.string,
    location: PropTypes.string,

  }),
};

ClubDetailsModal.defaultProps = {
  club: {},
};

export default ClubDetailsModal;
