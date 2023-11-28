import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { motion as m } from 'framer-motion';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <m.Container
      initial={{ x: '-100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%', position: 'absolute', width: '100%', opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      id="sign-in"
      fluid
    >
      <Row className="min-vh-100">
        <Col md={8} className="signin-form-section">
          <Form onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <Form.Group id="form-email" controlId="formBasicEmail">
              <Form.Control
                className="form-controltextbox"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group id="form-password" controlId="formBasicPassword">
              <Form.Control
                className="form-controltextbox"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="form-controlsubmit">
              Submit
            </Button>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </Col>
        <Col md={4} className="signup-call-to-action-section ">
          <div className="signup-call-to-action">
            <h1>New Here?</h1>
            <p className="font-color-white">Sign up and discover a great amount of new opportunities!</p>
            <Button variant="outline-light" href="/signup" className="form-controlsignup">Sign Up</Button>
          </div>
        </Col>
      </Row>
    </m.Container>
  );
};

export default SignIn;
