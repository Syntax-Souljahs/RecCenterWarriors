import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
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
    return (<Navigate to="/" />);
  }

  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="text-center mb-4">
            <h2>Login to your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <TextField
                      id="signin-form-email"
                      name="email"
                      placeholder="E-mail or Username"
                      label="Email/Username" // Change the label here
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      id="signin-form-password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      label="Password" // No change needed here
                    />
                  </Col>
                </Row>
                <ErrorsField />
                <SubmitField id="signin-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light" className="mt-3">
            <Link to="/signup" style={{ color: 'white' }}>Click here to Register</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
