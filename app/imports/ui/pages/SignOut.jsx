import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';

/* Styling for the sign-out message */
const signOutStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  color: '#ffffff', // White text color
  backgroundColor: 'rgba(52, 58, 64, 0.8)', // Dark background
  fontFamily: '"Lucida Console", "Courier New", monospace',
};

const SignOut = () => {
  const handleLogout = () => {
    Meteor.logout();
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Col style={signOutStyle} id="signout-page">
      <h2>You are now signed out.</h2>
      <p>Thank you for visiting. We hope to see you again soon!</p>
    </Col>
  );
};

export default SignOut;
