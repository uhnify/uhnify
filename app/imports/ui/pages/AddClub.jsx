import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/club/Club';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  description: String,
  location: String,
  image: String,
  meetingTime: String,
  categories: {
    type: String,
    allowedValues: ['Academic', 'Social', 'Sports', 'Cultural', 'Other'],
    defaultValue: 'Other',
  },

});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddClub page for adding a document. */
const AddClub = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, description, image, meetingTime, location, categories } = data;
    const owner = Meteor.user().username;
    Clubs.collection.insert(
      { name, description, image, owner, meetingTime, location, categories },
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
    <Container id="add-clubs" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="name" name="name" />
                <TextField id="image" name="image" />
                <TextField id="location" name="location" />
                <LongTextField id="description" name="description" />
                <TextField id="meetingTime" name="meetingTime" />
                <SelectField name="categories" />
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

export default AddClub;
