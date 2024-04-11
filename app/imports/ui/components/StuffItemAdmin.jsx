import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const StuffItemAdmin = ({ stuff, collection }) => {
  const deleteProfile = (profileName) => {
    console.log(`${profileName} profile was deleted`); // later add as parameter reason for deletion, and later add ban button
    collection.remove(profileName);
  };

  return (
    <tr>
      <td>{stuff.firstName}</td>
      <td>{stuff.lastName}</td>
      <td>{stuff.year}</td>
      <td>{stuff.major}</td>
      <td>{stuff.email}</td>
      <td>{stuff.interests}</td>
      <td>
        <Link to={`/edit/${stuff.firstName}`}>Edit</Link>
      </td>
      <td><Button variant="danger" onClick={() => deleteProfile(stuff.firstName)}><Trash /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    year: PropTypes.string,
    major: PropTypes.string,
    email: PropTypes.string,
    interests: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  collection: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
