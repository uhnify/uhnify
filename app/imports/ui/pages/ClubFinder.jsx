import React from 'react';
import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';
import LoadingSpinner from '../components/LoadingSpinner';
import { Modal, Button } from 'react-bootstrap';
import { CiFilter } from "react-icons/ci";
const ClubFinder = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
      <Button variant="light" onClick={handleShowModal}>
        <CiFilter /> Filter
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
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
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render filtered clubs */}
      <Row xs={1} md={2} lg={4}>
        {filteredClubs.map(club => (
          <Col key={club._id}>
            <Club club={club} onAddToProfile={() => addClubToProfile(club._id)} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ClubFinder;