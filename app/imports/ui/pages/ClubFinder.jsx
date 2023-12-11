import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { CiFilter } from 'react-icons/ci';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';
import ClubDetailsModal from '../components/ClubDetailsModal';
import LoadingSpinner from '../components/LoadingSpinner';

const ClubFinder = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);


  const handleViewDetails = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  const handleShowDetailsModal = (club) => {
    setSelectedClub(club);
    setShowDetailsModal(true);
  };
  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  // ... code to fetch clubs ...
  const addClubToProfile = (clubId) => {
    Meteor.call('profileClubs.add', clubId, (error) => {
      if (error) {
        console.error('Error adding club to profile:', error);
      } else {
        //  notification upon successful add
        swal('Success', 'Item added successfully', 'success');
      }
    });
  };
  // Fetch clubs and set up subscription
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: subscription.ready(),
    };
  }, []);

  // Set unique categories based on fetched clubs
  useEffect(() => {
    const uniqueCategories = new Set();
    clubs.forEach(club => {
      club.categories.forEach(category => {
        uniqueCategories.add(category);
      });
    });
    setCategories([...uniqueCategories]);
    console.log('Categories set:', [...uniqueCategories]); // Debug log
  }, [clubs]);
  const handleCategoryChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };
  const filteredClubs = selectedCategories.length > 0
    ? clubs.filter(club => club.categories.some(category => selectedCategories.includes(category)))
    : clubs;

  return (ready ? (
    <Container id="browse-clubs-page" className="py-3">
      <Button variant="light" onClick={handleShowFilterModal}>
        <CiFilter /> Filter
      </Button>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Clubs by Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categories.map(category => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={(e) => handleCategoryChange(e, category)}
                className="form-check-input"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFilterModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Render filtered clubs */}
      <Row xs={1} md={2} lg={3}>
        {filteredClubs.map(club => (
          <Col key={club._id}>
            <Club
              club={club}
              onAddToProfile={() => addClubToProfile(club._id)}
              onViewDetails={() => handleShowDetailsModal(club)}
            />
          </Col>
        ))}
      </Row>
    <ClubDetailsModal
      show={showDetailsModal}
      handleClose={handleCloseDetailsModal}
      club={selectedClub}
    />
    </Container>
  ) : <LoadingSpinner />);
};

export default ClubFinder;
