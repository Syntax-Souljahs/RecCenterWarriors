import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfilesAdmin from '../components/ProfilesAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const AdminPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { profiles, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Profiles.collection.find({}).fetch();
    return {
      profiles: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col><h2>Profiles</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Year</th>
                <th>Major</th>
                <th>Email</th>
                <th>Interests</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => <ProfilesAdmin key={profile.firstName} profile={profile} collection={Profiles.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminPage;
