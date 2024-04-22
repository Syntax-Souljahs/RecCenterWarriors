import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewprofilePage } from './viewprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'JFoo', email: 'john@foo.com', password: 'changeme' };
const newCredentials = { username: 'BIGMAC', firstName: 'TYLER', lastName: 'CHEESE', year: 'Sophomore', major: 'Computer Science', email: 'bigmac@foo.com', interests: 'Other', password: 'changeme' };

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
