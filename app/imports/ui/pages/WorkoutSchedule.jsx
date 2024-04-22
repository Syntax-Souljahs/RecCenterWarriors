import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { workoutschedule } from '../../api/profile/Workout Schedule';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const WorkoutSchedule = () => {
  const insertWorkoutSchedule = (workoutSchedule) => {
      const schedule = {
        monday: formData.mondayWorkout,
        tuesday: formData.tuesdayWorkout,
        wednesday: formData.wednesdayWorkout,
        thursday: formData.thursdayWorkout,
        friday: formData.fridayWorkout,
        saturday: formData.saturdayWorkout,
        sunday: formData.sundayWorkout,
        year: formData.year,
      };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', color: 'ivory' }}>Set Your Workout Schedule</h2>
          </Col>
          <AutoForm schema={workoutschedule}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <SelectField label="Monday" name="mondayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Tuesday" name="tuesdayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Wednesday" name="wednesdayWorkout" placeholder="Workout">                    options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Thursday" name="thursdayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Friday" name="fridayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Saturday" name="saturdayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField label="Sunday" name="sundayWorkout" placeholder="Workout">
                      options={['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull']}
                    </SelectField>
                  </Col>
                </Row>
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
export default WorkoutSchedule;
