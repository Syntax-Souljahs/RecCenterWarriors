import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class WorkoutSchedules {
  constructor() {
    // The name of this collection.
    this.name = 'UserWorkoutSchedule';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      mondayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      tuesdayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      wednesdayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      thursdayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      fridayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      saturdayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      sundayWorkout: {
        type: String,
        allowedValues: ['Cardio', 'Full Body', 'Upper Body', 'Lower Body', 'Core', 'Push', 'Pull'],
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {UserWorkoutSchedules}
 */
export const WorkoutSchedule = new WorkoutSchedules();
