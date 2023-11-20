import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container fluid>
      <Row className="min-vh-100">

        <Col md={4} className="signup-call-to-action-section ">
          <div className="signup-call-to-action">
            <h1>One Of Us?</h1>
            <p className="font-color-white">If you already have an account, just sign in. Time to socialize</p>
            <Button variant="outline-light" href="/signin" className="form-controlsignup">Sign In</Button>
          </div>
        </Col>

        <Col md={8} className="signin-form-section">
          <div className="signin-call-to-action"><h1>Register your account</h1></div>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <input className="form-controltextbox" name="email" placeholder="E-mail address" />
            <input className="form-controltextbox" name="password" placeholder="Password" type="password" />
            <ErrorsField />
            <Button variant="primary" type="submit" className="form-controlsubmit">
              Submit
            </Button>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
