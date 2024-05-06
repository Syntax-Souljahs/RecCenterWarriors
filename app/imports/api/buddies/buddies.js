import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class BuddiesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'BuddiesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      buddy: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RequestsCollection.
 * @type {RequestsCollection}
 */
export const Buddies = new BuddiesCollection();
