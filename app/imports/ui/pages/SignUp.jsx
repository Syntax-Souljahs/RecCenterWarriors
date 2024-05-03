import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profile';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    username: String,
    firstName: String,
    lastName: String,
    year: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Faculty'],
      defaultValue: 'Freshman',
    },
    major: String,
    email: String,
    interests: {
      type: String,
      allowedValues: ['General Health/Fitness', 'Bodybuilding/Aesthetics', 'Powerlifting', 'Crossfit', 'Other'],
      defaultValue: 'General Health/Fitness',
    },
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc, formRef) => {
    const { firstName, lastName, year, major, email, interests, username, password } = doc;
    Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        Profiles.collection.insert(
          { username, firstName, lastName, year, major, email, interests },
          (profileError) => {
            if (profileError) {
              swal('Error', profileError.message, 'error');
            } else {
              // swal('Success', 'Registration Successful', 'success');
              formRef.reset();
              setRedirectToRef(true);
            }
          },
        );
        BuddyProfiles.collection.insert(
          { username, firstName, lastName, year, major, email, interests },
          (profileError) => {
            if (profileError) {
              swal('Error', profileError.message, 'error');
            } else {
              // swal('Success', 'Registration Successful', 'success');
              formRef.reset();
              setRedirectToRef(true);
            }
          },
        );
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  let fRef = null;
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id="signup-form-username" name="username" placeholder="Username" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="signup-form-firstName" name="firstName" placeholder="First Name" /></Col>
                  <Col><TextField id="signup-form-lastName" name="lastName" placeholder="Last Name" /></Col>
                </Row>
                <Row>
                  <Col><SelectField id="signup-form-year" name="year" placeholder="year" /></Col>
                  <Col><TextField id="signup-form-major" name="major" placeholder="Major" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="signup-form-email" name="email" placeholder="E-mail Address " /></Col>
                  <Col><TextField id="signup-form-password" name="password" placeholder="Password" type="password" /></Col>
                </Row>
                <Row>
                  <Col><SelectField id="signup-form-interests" name="interests" placeholder="General Health/Fitness" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField id="signup-form-submit" value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
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
