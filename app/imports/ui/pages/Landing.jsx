import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="py-3">
      {currentUser === '' ? (
        <Row className="align-middle text-center">
          <Col xs={2} />
          <Col xs={8} className="d-flex flex-column justify-content-center">
            <h1>Welcome to Rec Center Warriors</h1>
            <h3>
              Get started by clicking <br />
              one of the buttons below <br />
              and be on your way to <br />
              finding a great workout partner!
            </h3>
          </Col>
          <Row className="align-middle">
            <Col xs={5} />
            <Col xs={1}>
              <Button as={Link} size="lg" variant="dark" to="/guide">Guide</Button>
            </Col>
            <Col xs={1}>
              <Button as={Link} size="lg" variant="dark" style={{ whiteSpace: 'nowrap' }} to="/SignUp">Sign Up</Button>
            </Col>
          </Row>
        </Row>
      ) : (
        <Row className="align-middle text-center">
          <Col xs={2}/>
          <Col xs={8}>
            <h1>Welcome back {currentUser}</h1>
          </Col>

          <section className="container">
            <div className="slider-wrapper">
              <div className="slider">
                <img id="slide-1" src="/images/exercises.jpeg" alt="exercises pic"/>
                <img id="slide-2" src="/images/buddy-up.jpeg" alt="Buddy Up pic"/>
                <img id="slide-3" src="/images/guide.jpeg" alt="Guide pic"/>
                <img id="slide-4" src="/images/workout-schedule.jpeg" alt="Workout Schedule pic"/>
                <div className="slider-nav">
                  <a href="#slide-1"></a>
                  <a href="#slide-2"></a>
                  <a href="#slide-3"></a>
                  <a href="#slide-4"></a>
                </div>
              </div>
            </div>
          </section>
          <row className="justify-content-center">
            <div style={{ color: '#ffff' }}><h2>Plan your Workouts</h2>
              <p>Join our vibrant gym community and be part of something bigger.</p>
              <p>Our workout schedule not only helps you stay organized but also provides opportunities to connect with fellow members,</p> share fitness tips, and motivate each other on your fitness journey.</div>
            <div className="landing-buttons">
              <a href = "/workout-sched">
                <button>Workout Schedule</button>
              </a>
            </div>
          </row>
          <Row className="align-items-center mt-4">
            <Col xs={7}>
              <img src="/images/exercises.jpeg" alt="Exercises" className="img-fluid"/>
            </Col>
            <Col xs={5}>
              <div style={{ color: '#ffff' }}>
                <h2>Recreation Center</h2>
                <p>Whether you're looking to build muscle, improve endurance, or simply maintain your fitness routine, our Exercises page has something for everyone.</p>
              </div>
              <div className="landing-buttons mt-4">
                <a href="/exercises">
                  <button>Exercises</button>
                </a>
              </div>
            </Col>
          </Row>


          <Col xs={6} className="mt-4">
            <Row className="align-middle text-center"><h2 style={{ color: '#ffff' }}>Find a Workout Partner</h2>
              <div style={{ color: 'lightgray' }}> Whether you're looking to build muscle, improve endurance, or simply maintain your fitness routine, our Exercises page has something for everyone.</div>
              {/* eslint-disable-next-line react/button-has-type */}
              <div className="landing-buttons mt-4">
                <a href="/buddy-up">
                  <button>Buddy up</button>
                </a>
              </div>
            </Row>
          </Col>
          <Col xs={6} className="mt-4">
            <img src="/images/buddy-up.jpeg" alt="Exercises" className="img-fluid"/>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Landing;
