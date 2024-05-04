import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { WorkoutSchedule } from '../../api/profile/WorkoutSchedule';
/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const WorkoutSchedulePage = () => {
  const schema = WorkoutSchedule.schema;
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (data) => {
    console.log(data);
    const { mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout, owner } = data;
    console.log(mondayWorkout);
    WorkoutSchedule.collection.insert(
      { mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout, owner },
      (profileError) => {
        if (profileError) {
          swal('Error', profileError.message, 'error');
        } else {
          swal('Success', 'Workout Schedule added successfully', 'success');
        }
      },
    );
  };
  let fRef = null;
  /* Display the signup form. Redirect to add page after successful registration and login. */
  return (
    <Container id="workout-schedule-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', color: 'ivory' }}>Set Your Workout Schedule</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <SelectField id="workout-mondayWorkout" label="Monday" name="mondayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-tuesdayWorkout" label="Tuesday" name="tuesdayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-wednesdayWorkout" label="Wednesday" name="wednesdayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-thursdayWorkout" label="Thursday" name="thursdayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-fridayWorkout" label="Friday" name="fridayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-saturdayWorkout" label="Saturday" name="saturdayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField id="workout-sundayWorkout" label="Sunday" name="sundayWorkout" placeholder="Workout" />
                  </Col>
                </Row>
                <ErrorsField />
                <HiddenField name="owner" value={Meteor.userId()} />
                <SubmitField id="workout-submit" value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
export default WorkoutSchedulePage;
