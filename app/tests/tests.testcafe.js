import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewprofilePage } from './viewprofile.page';
import { editprofilePage } from './editprofile.page';
import { exercisesPage } from './exercises.page';
import { guidePage } from './guide.page';
import { buddyupPage } from './buddyup.page';
import { workoutschedulePage } from './workoutschedule.page';
import { favoritesPage } from './favorites.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'JFoo', email: 'john@foo.com', password: 'changeme' };
const newCredentials = { username: 'BIGMAC', firstName: 'TYLER', lastName: 'CHEESE', year: 'Sophomore', major: 'Computer Science', email: 'bigmac@foo.com', interests: 'Other', password: 'changeme' };
const editCredentials = { firstName: 'PHAT', lastName: 'Losesmith', year: 'Junior', major: 'Business', interests: 'Crossfit' };
const workouts = { monday: 'Cardio', tuesday: 'Full Body', wednesday: 'Upper Body', thursday: 'Lower Body', friday: 'Core', saturday: 'Push', sunday: 'Pull' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup works with new data', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, newCredentials.username, newCredentials.firstName, newCredentials.lastName, newCredentials.year, newCredentials.major, newCredentials.email, newCredentials.interests, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the viewprofile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewProfilePage(testController);
  await viewprofilePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the editprofile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEditProfilePage(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.editUser(testController, editCredentials.firstName, editCredentials.lastName, editCredentials.year, editCredentials.major, editCredentials.interests);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Test that the guide page displays correctly
test('Test that the guide page works', async (testController) => {
  await navBar.gotoGuidePage(testController);
  await guidePage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoGuidePage(testController);
  await guidePage.isDisplayed(testController);
});

// Test that the buddyup page displays correctly
test('Test that the buddyup page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoBuddyUpPage(testController);
  await buddyupPage.isDisplayed(testController);
});

// Test that the workout schedule page displays correctly
test('Test that the workout schedule displays and the form submits data', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoWorkoutSchedulePage(testController);
  await workoutschedulePage.isDisplayed(testController);
  await workoutschedulePage.submitWorkoutSchedule(testController, workouts.monday, workouts.tuesday, workouts.wednesday, workouts.thursday, workouts.friday, workouts.saturday, workouts.sunday);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Test that exercises page displays correctly
test('Test that the exercises page displays correctly and users can add favorites', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoExercisesPage(testController);
  await exercisesPage.isDisplayed(testController);
  await exercisesPage.addFavorite(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Test that the favorites page works correctly and removes an item from favorites
test('Test that the favorites page displays and users can remove favorites', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.isDisplayed(testController);
  await favoritesPage.removeFavorite(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
