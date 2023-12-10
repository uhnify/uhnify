import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Events } from '../../api/events/Events';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Events.schema);

/* Renders the EditEventAdmin page for editing a single document. */
const EditEventAdmin = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditEventAdmin', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Event documents.
    const subscription = Meteor.subscribe(Events.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Events.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditEventAdmin', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { title, description, date, meetingTime, location, createdBy, image, eventID, clubID } = data;
    Events.collection.update(_id, { $set: { title, description, date, meetingTime, location, createdBy, image, eventID, clubID } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Event</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <NumField id="eventID" name="eventID" />
                <TextField id="title" name="title" />
                <TextField id="image" name="image" />
                <TextField id="location" name="location" />
                <LongTextField id="description" name="description" />
                <DateField id="date" name="date" />
                <TextField id="createdBy" name="createdBy" />
                <SubmitField id="submit" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEventAdmin;
