import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Modal, Button, Pagination } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { CiFilter } from 'react-icons/ci';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';
import ClubDetailsModal from '../components/ClubDetailsModal';
import LoadingSpinner from '../components/LoadingSpinner';

const ClubFinder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 9; // You can set this to any number you prefer
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleNextPage = () => setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  // Fetch clubs and set up subscription
  const { ready, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: subscription.ready(),
    };
  }, []);

  const filteredClubs = clubs.filter(club => {
    const matchesSearchTerm = searchTerm === '' || club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || club.categories.some(category => selectedCategories.includes(category));
    return matchesSearchTerm && matchesCategories;
  });

  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    const uniqueCategories = new Set();
    clubs.forEach(club => {
      club.categories.forEach(category => {
        uniqueCategories.add(category);
      });
    });
    setCategories([...uniqueCategories]);
  }, [clubs]);
  // Combined filter logic for search term and selected categories

  const handleCloseFilterModal = () => setShowFilterModal(false);

  const handleShowDetailsModal = (club) => {
    setSelectedClub(club);
    setShowDetailsModal(true);
  };
  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const addClubToProfile = (clubId) => {
    Meteor.call('profileClubs.add', clubId, (error) => {
      if (error) {
        console.error('Error adding club to profile:', error);
      } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
  };

  const handleCategoryChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    ready ? (
      <Container id="browse-clubs-page" className="py-3">

        <div className="d-flex justify-content-start">
          <div>
            <Button variant="light" onClick={handleShowFilterModal}>
              <CiFilter /> Filter
            </Button>
          </div>
          <div className="px-4"><input
            type="text"
            placeholder="Search for clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-input mt-1"
          />
          </div>
        </div>

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

        {/* Render filtered clubs for current page */}
        <Row xs={1} md={2} lg={3}>
          {currentClubs.map(club => (
            <Col key={club._id}>
              <Club
                club={club}
                onAddToProfile={() => addClubToProfile(club._id)}
                onViewDetails={() => handleShowDetailsModal(club)}
              />
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center my-3">
          <Pagination className="custom-pagination">
            {totalPages > 1 && <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />}
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            {totalPages > 1 && <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />}
          </Pagination>
        </div>

        {/* Club Details Modal */}
        <ClubDetailsModal
          show={showDetailsModal}
          handleClose={handleCloseDetailsModal}
          club={selectedClub} // Ensure this prop is used correctly in ClubDetailsModal
        />

      </Container>
    ) : <LoadingSpinner />);
};

export default ClubFinder;
