import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile.js';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';

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
