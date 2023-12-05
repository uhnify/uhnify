import React, { useState, useRef } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Buffer } from 'buffer';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  Firstname: String,
  Lastname: String,
  Email: {
    type: String,
    regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const Profile = () => {

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

        Meteor.call('uploadProfilePicture', Meteor.userId(), buffer, imageName, (error, result) => {
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
  const submit = (data, formRef) => {
    const { Firstname, Lastname, Email } = data;

    Meteor.call('updateUserProfile', Meteor.userId(), { Firstname, Lastname, Email }, (error) => {
      if (error) {
        swal('Error', error.reason, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
        formRef.reset();
      }
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
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
    <Container className="py-3">

      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Account Details</h2></Col>
          <Row>
            <div className="profile-picture-container d-flex flex-column align-items-center">
              {/* Display the selected image if available, otherwise the default one */}
              <img className="profile-picture" src={profile.picture} alt="Profile" />
              <Button variant="primary" className="edit-profile-picture w-50" onClick={() => fileInput.current.click()}>
                Edit Profile Picture
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </Row>
          <AutoForm
            ref={ref => { fRef = ref; }}
            schema={bridge}
            onSubmit={data => submit(data, fRef)}
            model={transformedProfile} // Autofill the form with profile data
          >
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="Firstname" label="First Name" /></Col>
                  <Col><TextField name="Lastname" label="Last Name" /></Col>
                </Row>
                <Row>
                  <TextField name="Email" />
                </Row>
                <SubmitField value="Update" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />; // Render a loading spinner while data is being fetched
};

export default Profile;
