import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserWorkoutSchedule } from '../../api/profile/Workout Schedule';
/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const WorkoutSchedule = () => {
  const schema = UserWorkoutSchedule.schema;
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (data) => {
    console.log(data);
    const { mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout, year } = data;
    console.log(mondayWorkout);
    UserWorkoutSchedule.collection.insert({ mondayWorkout, tuesdayWorkout, wednesdayWorkout, thursdayWorkout, fridayWorkout, saturdayWorkout, sundayWorkout, year });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ fontFamily: 'Quicksand, sans-serif', color: 'ivory' }}>Set Your Workout Schedule</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
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
                <SubmitField value="Submit" />
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
