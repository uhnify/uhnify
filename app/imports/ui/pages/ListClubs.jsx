import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import Club2 from '../components/Club2';
import ClubDetailsModal from '../components/ClubDetailsModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProfileClubs } from '../../api/profile/ProfileClubs';
/* Renders a card containing all of the Clubs documents. Use <Club> to render each card. */
const ListClub = () => {
  const onRemoveFromProfile = (clubId) => {
    // Call Meteor method to remove club from collection
    Meteor.call('profileClubs.remove', clubId, (error) => {
      if (error) {
        console.error('Error removing club from profile:', error);
      } else {
        console.log('Club removed from profile successfully');
        window.location.reload();
      }
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const handleViewDetails = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Club documents.
    const subscription = Meteor.subscribe(ProfileClubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Club documents
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="list-clubs" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4}>
            {clubs.map((club) => (<Col key={club._id}><Club2 club={club} onRemoveFromProfile={() => onRemoveFromProfile(club._id)} onViewDetails={() => handleViewDetails(club)} /></Col>))}
          </Row>
        </Col>
      </Row>
      <ClubDetailsModal
        show={showModal}
        handleClose={handleCloseModal}
        club={selectedClub}
      />
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClub;
