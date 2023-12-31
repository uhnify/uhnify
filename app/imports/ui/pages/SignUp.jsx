import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fName: '',
    lName: '',
  });
  // Add state for club interests
  const [clubInterests, setClubInterests] = useState({
    academic: false,
    arts: false,
    sports: false,
    social: false,
    cultural: false,
    creativity: false,
  });

  // Handle change for checkboxes
  const handleCheckboxChange = (event) => {
    setClubInterests({ ...clubInterests, [event.target.id]: event.target.checked });
  };
  const schema = new SimpleSchema({
    email: String,
    password: String,
    fName: String,
    lName: String,
    academic: { type: Boolean, optional: true },
    arts: { type: Boolean, optional: true },
    sports: { type: Boolean, optional: true },
    social: { type: Boolean, optional: true },
    cultural: { type: Boolean, optional: true },
    creativity: { type: Boolean, optional: true },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = async (doc) => {
    // Combine formData from the first step with the data from the second step
    const finalData = { ...formData, ...doc, ...clubInterests };
    const { email, password, fName, lName } = finalData;

    try {
      await Accounts.createUser({ email, username: email, password });
      await swal('Success', 'Registration successful!', 'success');
      Meteor.call('createUserProfile', Meteor.userId(), email, fName, lName, (error) => {
        if (error) {
          swal('Error', error.reason, 'error');
        } else {
          setRedirectToRef(true);
        }
      });
    } catch (err) {
      await swal('Error', err.reason, 'error');
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
          {currentStep === 1 && (
            <>
              <div className="signin-call-to-action"><h1>Register your account</h1></div>
              <AutoForm schema={bridge} model={formData} onChangeModel={setFormData}>
                <TextField name="email" placeholder="Email" />
                <TextField name="password" placeholder="Password" type="password" />
                <Button variant="primary" onClick={handleNext} className="form-controlsubmit">
                  Next
                </Button>
              </AutoForm>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="signin-call-to-action"><h1>Register your account</h1></div>
              <AutoForm schema={bridge} model={formData} onChangeModel={setFormData}>
                <TextField name="fName" placeholder="First Name" label="First Name" />
                <TextField name="lName" placeholder="Last Name" label="Last Name" />
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handlePrevious} className="form-controlsubmit">
                    Previous
                  </Button>
                  <Button variant="secondary" onClick={handleNext} className="form-controlsubmit">
                    Next
                  </Button>
                </div>
              </AutoForm>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="signin-call-to-action"><h1 className="mb-5">What are your interests?</h1></div>
              <AutoForm schema={bridge} model={formData} onSubmit={data => submit(data)}>
                <div className="tag-container">
                  <input type="checkbox" id="tag1" className="tag-checkbox" onChange={handleCheckboxChange} />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag1" className="tag-label">Academic</label>

                  <input type="checkbox" id="tag2" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag2" className="tag-label">Arts</label>

                  <input type="checkbox" id="tag3" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag3" className="tag-label">Sports</label>

                  <input type="checkbox" id="tag4" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag4" className="tag-label">Social</label>

                  <input type="checkbox" id="tag5" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag5" className="tag-label">Cultural</label>

                  <input type="checkbox" id="tag6" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag6" className="tag-label">Creativity</label>

                  <input type="checkbox" id="tag7" className="tag-checkbox" />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="tag7" className="tag-label">Creativity</label>
                </div>
                <div className="d-flex justify-content-between mt-5">
                  <Button variant="secondary" onClick={handlePrevious} className="form-controlsubmit">
                    Previous
                  </Button>
                  <Button variant="primary" type="submit" className="btn-sm form-controlsubmit">
                    Submit
                  </Button>
                </div>
              </AutoForm>
            </>
          )}
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
