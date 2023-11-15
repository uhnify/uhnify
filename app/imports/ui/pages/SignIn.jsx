import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const signInSchema = new SimpleSchema({
    email: String,
    password: String,
  });

  const bridge = new SimpleSchema2Bridge(signInSchema);

  const submitSignIn = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="px-0">
      <Row noGutters className="min-vh-100">
        <Col md={6} className="d-flex align-items-center justify-content-center signin-section">
          <Card className="auth-card">
            <Card.Body>
              <h1 className="login__content-title">Login to Your Account</h1>
              <AutoForm schema={bridge} onSubmit={submitSignIn}>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField className="login__form-btn" />
              </AutoForm>
              <div className="sign-up-link">
                New Here? <a href="/signup">Sign Up</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center bg-teal signup-section">
          <div className="text-white text-center">
            <h1 className="image-container-title">New Here?</h1>
            <p className="image-container-text">Sign up and discover a great amount of new opportunities!</p>
            <Button variant="light" href="/signup">Sign Up</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
