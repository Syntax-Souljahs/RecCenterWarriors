import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class FavoritesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FavoritesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      exerciseId: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
  }

  // Method to add a new exercise to the collection
  addFavorite(exerciseId, owner) {
    return this.collection.insert({ exerciseId, owner });
  }

  // Method to remove an exercise from the collection
  removeFavorite(exerciseId) {
    this.collection.remove({ _id: exerciseId });
  }
}

/**
 * The singleton instance of the ExercisesCollection.
 * @type {ExercisesCollection}
 */
export const Favorites = new FavoritesCollection();
