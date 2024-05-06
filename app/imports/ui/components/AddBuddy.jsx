import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Requests } from '../../api/requests/Requests';
import { Buddies } from '../../api/buddies/buddies';

const formSchema = new SimpleSchema({
  buddy: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddBuddy = ({ buddy, owner }) => {
  const submit = (data, formRef) => {
    Buddies.collection.insert(
      { buddy, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Request added successfully', 'success');
          formRef.reset();
        }
      },
    );
    Requests.collection.remove(
      { _id: Requests.collection.findOne({ owner })._id },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Request removed successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  let fRef = null;
  return (
    <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
      <SubmitField value="Accept" />
      <HiddenField name="owner" value={owner} />
      <HiddenField name="buddy" value={buddy} />
      <ErrorsField />
    </AutoForm>
  );
};

AddBuddy.propTypes = {
  buddy: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddBuddy;
