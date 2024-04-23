import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, year, major, interests } = data;
    Profiles.collection.update(
      { _id },
      { $set: { firstName, lastName, year, major, interests } },
      (profileError) => {
        if (profileError) {
          swal('Error', profileError.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
        }
      },
    );
  };

  return ready ? (
    <Container id="edit-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', color: 'ivory' }}>Edit Your Profile</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="username" placeholder="Username" disabled="true" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="edit-form-firstName" name="firstName" placeholder="First Name" /></Col>
                  <Col><TextField id="edit-form-lastName" name="lastName" placeholder="Last Name" /></Col>
                </Row>
                <Row>
                  <Col><SelectField id="edit-form-year" name="year" placeholder="year" /></Col>
                  <Col><TextField id="edit-form-major" name="major" placeholder="Major" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="email" placeholder="email" disabled="true" /></Col>
                  <Col />
                </Row>
                <Row>
                  <Col><SelectField id="edit-form-interests" name="interests" placeholder="General Health/Fitness" /></Col>
                </Row>
                <ErrorsField />
                <SubmitField id="edit-form-submit" value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
