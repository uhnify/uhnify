import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from '../components/LoadingSpinner';
import loadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

/* Renders the EditClubAdmin page for editing a single document. */
const EditClubAdmin = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditClubAdmin', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Club documents.
    const subscription = Meteor.subscribe(Clubs.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditClubAdmin', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, description, image, meetingTime, location, categories } = data;
    Clubs.collection.update(_id, { $set: { name, description, image, meetingTime, location, categories } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready?(
    <Container className="py-3">
      <Row className=" d-flex justify-content-center">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Col className="text-center"><h2>Edit Club</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField id="name" name="name" className="theme-text-field" />
                <TextField id="image" name="image" className="theme-text-field" />
                <TextField id="location" name="location" className="theme-text-field" />
                <LongTextField id="description" name="description" className="theme-text-field" />
                <TextField id="meetingTime" name="meetingTime" className="theme-text-field" />
                <SelectField name="categories" className="theme-select-field" />
                <SubmitField id="submit" value="Submit" className="submit-button" />
                <ErrorsField className="error-field" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>) : (
    <LoadingSpinner />
)
};

export default EditClubAdmin;
