import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/Card';
import { Stuffs } from '../../api/stuff/Stuff';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Exercises = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="exercises-page">
      <Card>Some Exercise K</Card>
    </Container>
  ) : <LoadingSpinner />);
};

export default Exercises;
