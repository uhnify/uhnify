import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/events/Events';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventID: SimpleSchema.Integer,
  clubID: SimpleSchema.Integer,
  title: String,
  description: {
    type: String,
    optional: true,
  },
  date: Date,
  location: String,
  createdBy: String,
  image: String,

});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddClub page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, date, meetingTime, location, createdBy, image, eventID, clubID } = data;
    const owner = Meteor.user().username;

    Events.collection.insert(
      { title, description, date, meetingTime, location, createdBy, owner, image, eventID, clubID },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="add-events" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Start Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <NumField id="eventID" name="eventID" />
                <NumField id="clubID" name="clubID" />
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
  );
};

export default AddEvent;
