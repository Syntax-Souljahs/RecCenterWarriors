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
    allowedValues: ['Cardio', 'Biceps', 'Triceps', 'Back', 'Shoulder', 'Calves', 'Quads', 'Glutes', 'Core', 'Chest'],
  },
  difficulty: {
    type: String,
    allowedValues: ['Beginner', 'Intermediate', 'Advanced'],
  },
  owner: String,
  image_url: String,
  video_url: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddFavorite = ({ name, description, category, difficulty, owner, image_url, video_url }) => {
  const submit = (data, formRef) => {
    Favorites.collection.insert(
      { name, description, category, difficulty, owner, image_url, video_url },
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
      <HiddenField name="image_url" value={image_url} />
      <HiddenField name="video_url" value={video_url} />
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
  image_url: PropTypes.string.isRequired,
  video_url: PropTypes.string.isRequired,
};

export default AddFavorite;
