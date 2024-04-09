import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      year: {
        type: String,
        allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Faculty'],
        defaultValue: 'Freshman',
      },
      major: String,
      email: String,
      interests: {
        type: String,
        allowedValues: ['General Health/Fitness', 'Bodybuilding/Aesthetics', 'Powerlifting', 'Crossfit', 'Other'],
        defaultValue: 'General Health/Fitness',
      },
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
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
