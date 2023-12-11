import React, { useState, useRef } from 'react';
// Importing necessary components and hooks
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

// Schema for the form
const formSchema = new SimpleSchema({
  Firstname: String,
  Lastname: String,
  Bio: String,
  Title: String,
  Email: {
    type: String,
    regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const Profile = () => {
  // State and ref for handling the profile picture
  const [setImagePreview] = useState('');
  let [imagePreview] = useState('');
  const fileInput = useRef(null);

  // Handles image selection for profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview = e.target.result;

        // Finds and updates the user's profile with the new image
        const profile = Profiles.collection.findOne({ userId: Meteor.userId() });
        if (profile) {
          Profiles.collection.update(
            { _id: profile._id },
            { $set: { picture: imagePreview } },
          );
        }

        setImagePreview(imagePreview);
      };

      reader.readAsDataURL(file);
    }
  };

  // Submits the form data to update the user profile
  const submit = (data, formRef) => {
    const { Firstname, Lastname, Email, Bio, Title } = data;

    Meteor.call('updateUserProfile', Meteor.userId(), { Firstname, Lastname, Email, Bio, Title }, (error) => {
      if (error) {
        swal('Error', error.reason, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
        formRef.reset();
      }
    });
  };

  // Subscribes to user profile data and fetches it
  const { ready, profile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: subscription.ready(),
      profile: userProfile,
    };
  }, []);

  // Transform profile data to match form field names
  // Check if the profile data is not ready and show loading spinner
  if (!ready || !profile) {
    return <LoadingSpinner />; // or some other indication that data is loading
  }
  // use this to pass into schema because userId doenst work
  const transformedProfile = ({
    Firstname: profile.firstName,
    Lastname: profile.lastName,
    Email: profile.email,
    Bio: profile.bio, // Add bio field
    Title: profile.title, // Add title field
  });

  return ready ? (
    <Container className="py-3">

      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Account Details</h2></Col>
          <Row>
            <div className="d-flex flex-column align-items-center">
              {/* Display the selected image if available, otherwise the default one */
                imagePreview ? <img className="profile-picture" src={imagePreview} alt="Profile" /> : <img className="profile-picture" src={profile.picture} alt="Profile" />
              }
              <div className="mb-4 w-100 d-flex justify-content-center">
                <Button variant="primary" className="edit-profile-picture w-50" onClick={() => fileInput.current.click()}>
                  Edit Profile Picture
                </Button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </Row>
          <div className="image-wrapper">
            <AutoForm
              schema={bridge}
              onSubmit={data => submit(data)}
              model={transformedProfile} // Autofill the form with profile data
            >
              <Card>
                <Card.Body>
                  <Row>
                    <Col><TextField name="Firstname" label="First Name" /></Col>
                    <Col><TextField name="Lastname" label="Last Name" /></Col>
                    <TextField name="Bio" label="Bio" />
                    <TextField name="Title" label="Title" />
                  </Row>
                  <Row>
                    <TextField name="Email" />
                  </Row>
                  <SubmitField value="Update" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </div>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />; // Render a loading spinner while data is being fetched
};

export default Profile;
