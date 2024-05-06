import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Requests } from '../../api/requests/Requests';

const formSchema = new SimpleSchema({
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const RemoveRequest = ({ owner }) => {
  const submit = (data, formRef) => {
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
      <SubmitField id="deny-buddy" value="Deny" />
      <HiddenField name="owner" value={owner} />
      <ErrorsField />
    </AutoForm>
  );
};

RemoveRequest.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default RemoveRequest;
