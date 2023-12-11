import React, { useState, useRef } from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Buffer } from 'buffer';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
// const formSchema = new SimpleSchema({
//   Firstname: String,
//   Lastname: String,
//   Email: {
//     type: String,
//     regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//   },
// });

const Profilez = () => {

  const [imagePreview, setImagePreview] = useState('');
  const fileInput = useRef(null); // Initialize fileInput with useRef

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Use the Buffer from the 'buffer' package
        const buffer = Buffer.from(e.target.result);
        const imageName = `${Meteor.userId()}-${file.name}`;

        Meteor.call('uploadProfilePicture', Meteor.userId(), buffer, imageName, (error) => {
          if (error) {
            console.error('Error uploading image:', error);
          } else {
            setImagePreview(`/images/${imageName}`);
          }
        });
      };

      reader.readAsArrayBuffer(file);
    }
  };
  // const submit = (data, formRef) => {
  //   const { Firstname, Lastname, Email } = data;
  //
  //   Meteor.call('updateUserProfile', Meteor.userId(), { Firstname, Lastname, Email }, (error) => {
  //     if (error) {
  //       swal('Error', error.reason, 'error');
  //     } else {
  //       swal('Success', 'Profile updated successfully', 'success');
  //       formRef.reset();
  //     }
  //   });
  // };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  const { ready, profile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: subscription.ready(),
      profile: userProfile,
    };
  }, []);
  console.log(profile); // Log to check the structure of the profile data
  // Transform profile data to match form field names
  // Check if the profile data is not ready and show loading spinner
  if (!ready || !profile) {
    return <LoadingSpinner />; // or some other indication that data is loading
  }
  // use this to pass into schema because userId doenst work
  const transformedProfile = {
    Firstname: profile.firstName,
    Lastname: profile.lastName,
    Email: profile.email,
  };
  return ready ? (
    <Container id="profile-page" className="py-3">
      <Row className="justify-content-center mb-4">
        <Col>
          {/* Assuming your image is placed in the public/images directory */}
          <Image src="/images/Header.png" fluid alt="Banner" className="rounded-banner" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {/* Left Card for Information */}
        <Col md={4}>
          <Card className="card-container">
            <Card.Body>
              {/* Replace text fields with simple text display */}
              <div className="text-display">Firstname: {transformedProfile.Firstname}</div>
              <div className="text-display">Lastname: {transformedProfile.Lastname}</div>
              <div className="text-display">Email: {transformedProfile.Email}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* Center Card with Profile Picture */}
        <Col md={4}>
          <Card className="card-container">
            <Card.Body className="text-center">
              <img src={imagePreview || profile.picture} alt="Profile" className="profile-picture rounded-circle" />
              <input type="file" accept="image/*" ref={fileInput} onChange={handleImageChange} style={{ display: 'none' }} />
            </Card.Body>
          </Card>
        </Col>

        {/* Right Card for the Form */}
        <Col md={4}>
          <Card>
            <Card.Body />
          </Card>
        </Col>

      </Row>{/* New Row for small cards */}
      <Row className="justify-content-center pt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Col key={index} xs={12} sm={6} md={2} className="pb-3">
            <Card className="small-card">
              <Card.Body className="text-center">
                <Card.Title>Card {index + 1}</Card.Title>
                <Card.Text>
                  Some details
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profilez;
