import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
// eslint-disable-next-line react/prop-types
const ProfilesAdmin = ({ profile, collection }) => {
  const deleteProfile = (profiles) => {
    console.log(`${profiles.firstName} profile was deleted`); // later add as parameter reason for deletion, and later add ban button
    collection.remove(profiles._id);
  };

  return (
    <tr>
      <td>{profile.firstName}</td>
      <td>{profile.lastName}</td>
      <td>{profile.year}</td>
      <td>{profile.major}</td>
      <td>{profile.email}</td>
      <td>{profile.interests}</td>
      <td>
        <Link to={`/edit/${profile.firstName}`}>Edit</Link>
      </td>
      <td>
        <Button variant="danger" onClick={() => deleteProfile(profile)}>Delete<Trash /></Button>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
ProfilesAdmin.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    year: PropTypes.string,
    major: PropTypes.string,
    email: PropTypes.string,
    interests: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  collection: PropTypes.object.isRequired,
};

export default ProfilesAdmin;
