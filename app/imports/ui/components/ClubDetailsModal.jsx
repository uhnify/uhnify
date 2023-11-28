import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ClubDetailsModal = ({ show, handleClose, club }) => {
  // Conditional rendering based on if club data is available
  const modalContent = club ? (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{club.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClubDetailsModal;
