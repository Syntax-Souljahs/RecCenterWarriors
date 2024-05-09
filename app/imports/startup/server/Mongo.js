import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile.js';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';
import { Exercises } from '../../api/exercises/Exercises';

/* eslint-disable no-console */

const addProfile = (profile) => {
  console.log(`  Adding: ${profile.lastName} (${profile.email})`);
  Profiles.collection.insert(profile);
  BuddyProfiles.collection.insert(profile);
};

// Initialize the ProfileCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default data.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}

const addExercise = (exercise) => {
  console.log(`  Adding: ${exercise.name} (${exercise.category})`);
  Exercises.collection.insert(exercise);
};

// Initialize the ExercisesCollection if empty.
if (Exercises.collection.find().count() === 0) {
  if (Meteor.settings.defaultExercises) {
    console.log('Creating default exercises.');
    Meteor.settings.defaultExercises.forEach(exercise => addExercise(exercise));
  }

  const addBuddy = (buddy) => {
    console.log(`  Adding: ${buddy.lastName} (${buddy.email})`);
    Profiles.collection.insert(buddy);
    BuddyProfiles.collection.insert(buddy);
  };

  if (BuddyProfiles.collection.find().count() === 0) {
    if (Meteor.settings.defaultBuddies) {
      console.log('Creating default buddies.');
      Meteor.settings.defaultBuddies.forEach(buddy => addBuddy(buddy));
    }
  }
}
