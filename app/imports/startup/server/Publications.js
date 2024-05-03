import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';
import { Exercises } from '../../api/exercises/Exercises';
import { Favorites } from '../../api/favorites/Favorites';
import { Requests } from '../../api/requests/Requests';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ username: username });
  }
  return this.ready();
});

Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Requests.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Requests.collection.find({ buddy: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(BuddyProfiles.userPublicationName, () => BuddyProfiles.collection.find());

Meteor.publish(Exercises.userPublicationName, () => Exercises.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
