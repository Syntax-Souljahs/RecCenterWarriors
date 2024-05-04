import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorites/Favorites';

const formSchema = new SimpleSchema({
  name: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const RemoveFavorite = ({ name }) => {
  const submit = (data, formRef) => {
    Favorites.collection.remove(
      { _id: Favorites.collection.findOne({ name })._id },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Favorite removed successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  let fRef = null;
  return (
    <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
      <SubmitField id="remove-favorite" value="Remove" />
      <HiddenField name="name" value={name} />
      <ErrorsField />
    </AutoForm>
  );
};

RemoveFavorite.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RemoveFavorite;
