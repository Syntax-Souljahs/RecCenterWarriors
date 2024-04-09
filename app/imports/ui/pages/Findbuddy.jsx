import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { AutoForm, SubmitField } from 'uniforms-bootstrap5'; 
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const Findbuddy = () => {
  const submit = (data, formRef) => {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { name, quantity, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  return (
    <Container id="findbuddy-page">
      <Row className="mt-5">
        <Col>
          <AutoForm schema={bridge} onSubmit={(data, formRef) => submit(data, formRef)}>
            <Card>
              <Card.Body>
                <Card.Title>Person 1</Card.Title>
                <Card.Text>
                  image<br />
                  other description
                </Card.Text>
                <SubmitField value="Find Buddy" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
        <Col>
          <AutoForm schema={bridge} onSubmit={(data, formRef) => submit(data, formRef)}>
            <Card>
              <Card.Body>
                <Card.Title>Person 2</Card.Title>
                <Card.Text>
                  image<br />
                  other description
                </Card.Text>
                <SubmitField value="Find Buddy" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Findbuddy;
