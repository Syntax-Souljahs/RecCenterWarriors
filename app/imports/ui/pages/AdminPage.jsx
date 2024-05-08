import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfilesAdmin from '../components/ProfilesAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */

const AdminPage = () => {
  const { profiles, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    const rdy = subscription.ready();
    const items = Profiles.collection.find({}).fetch();
    return {
      profiles: items,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container id="view-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={9}>
          <Col><h2>Profiles</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Year</th>
                <th>Major</th>
                <th>Email</th>
                <th>Username</th>
                <th>Interests</th>
                <th>Edit Profile</th>
                <th>Delete Profile</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <ProfilesAdmin key={profile._id} profile={profile} collection={Profiles.collection} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminPage;
