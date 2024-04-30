import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorites/Favorites';

const formSchema = new SimpleSchema({
  name: String,
  description: String,
  category: {
    type: String,
    allowedValues: ['Cardio', 'Strength', 'Flexibility', 'Hypertrophy'],
  },
  difficulty: {
    type: String,
    allowedValues: ['Beginner', 'Intermediate', 'Advanced'],
  },
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddFavorite = ({ name, description, category, difficulty, owner }) => {
  const submit = (data, formRef) => {
    Favorites.collection.insert(
      { name, description, category, difficulty, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Favorite added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  let fRef = null;
  return (
    <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
      <SubmitField value="Add to favorites" />
      <HiddenField name="owner" value={owner} />
      <HiddenField name="name" value={name} />
      <HiddenField name="description" value={description} />
      <HiddenField name="category" value={category} />
      <HiddenField name="difficulty" value={difficulty} />
      <ErrorsField />
    </AutoForm>
  );
};

AddFavorite.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default AddFavorite;
