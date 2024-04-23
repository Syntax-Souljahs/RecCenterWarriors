import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewprofilePage } from './viewprofile.page';
import { editprofilePage } from './editprofile.page';
import { guidePage } from './guide.page';
import { findABuddyPage } from './findbuddy.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'JFoo', email: 'john@foo.com', password: 'changeme' };
const newCredentials = { username: 'BIGMAC', firstName: 'TYLER', lastName: 'CHEESE', year: 'Sophomore', major: 'Computer Science', email: 'bigmac@foo.com', interests: 'Other', password: 'changeme' };
const editCredentials = { firstName: 'PHAT', lastName: 'Losesmith', year: 'Junior', major: 'Business', interests: 'Crossfit' };

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
test.only('Test that the navbar components go to all pages', async (testController) => {
  // await navBar.gotoSignInPage(testController);
  await navBar.gotoExercisesPage(testController);
  await signinPage.isDisplayed(testController);
  await navBar.gotoGuidePage(testController);
  await guidePage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.isDisplayed(testController);
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFindBuddyPage(testController);
  await findABuddyPage.isDisplayed(testController);
});
