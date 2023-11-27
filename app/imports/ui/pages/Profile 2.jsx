import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  Username: String,
  Firstname: String,
  Lastname: String,
  Email: {
    type: String,
    regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const Profile = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { Username, Firstname, Lastname, Email, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { Username, Firstname, Lastname, Email, quantity, condition, owner },
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Account Details</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row><TextField name="Username"/></Row>
                <Row><Col><TextField name="Firstname" label="First Name"/></Col>
                  <Col><TextField name="Lastname" label="Last Name"/></Col></Row>
                <Row><TextField name="Email"/></Row>
                <NumField name="quantity" decimal={null} />
                <SelectField name="condition" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>

  );
};

export default Profile;
