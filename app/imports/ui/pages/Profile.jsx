import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
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

/* Renders the AddStuff page for adding a document. */
const Profile = () => {

  // On submit, insert the data.
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
      profile: userProfile
    };
  }, []);
  console.log(profile); // Log to check the structure of the profile data
  // Transform profile data to match form field names
  // Check if the profile data is not ready and show loading spinner
  if (!ready || !profile) {
    return <LoadingSpinner />; // or some other indication that data is loading
  }
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
                <SubmitField value="Submit" />
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
