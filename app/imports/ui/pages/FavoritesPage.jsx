import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Favorites } from '../../api/favorites/Favorites';
import { Exercises } from '../../api/exercises/Exercises';
import FavoriteCard from '../components/FavoriteCard';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const FavoritesPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, favorites } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Favorites.userPublicationName);
    const subscription2 = Meteor.subscribe(Exercises.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription1.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    const favoriteItems = Favorites.collection.find({}).fetch();
    const exerciseItems = Exercises.collection.find({}).fetch();
    return {
      favorites: favoriteItems,
      exercises: exerciseItems,
      ready: rdy1, rdy2,
    };
  }, []);
  /* Test data until we have a populated exercise collection */

  return (ready ? (
    <Container id="favorites-page">
      <Row className="justify-content-center text-center">
        <Col xs={6}>
          <h1>Your Favorite Exercises</h1>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {favorites.map((exercise) => <FavoriteCard key={favorites.exerciseId} exercise={exercise} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FavoritesPage;
