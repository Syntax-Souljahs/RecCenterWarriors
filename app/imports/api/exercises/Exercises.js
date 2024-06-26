import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ExercisesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ExercisesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
      image_url: String,
      video_url: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.PublicationName = `${this.name}.publication.user`;
  }

  // Method to add a new exercise to the collection
  addExercise(name, description, category, difficulty, image_url, video_url) {
    return this.collection.insert({ name, description, category, difficulty, image_url, video_url });
  }

  // Method to remove an exercise from the collection
  removeExercise(exerciseId) {
    this.collection.remove({ _id: exerciseId });
  }
}

/**
 * The singleton instance of the ExercisesCollection.
 * @type {ExercisesCollection}
 */
export const Exercises = new ExercisesCollection();
