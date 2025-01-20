# Universe
UniVerse is a comprehensive web app for students, offering tools for academic tracking, social engagement, wellness support, financial management, and career development. From managing assignments and events to accessing mental health resources and job opportunities, UniVerse simplifies campus life and empowers students to excel.

#Instructions
(1) One main instruction after pulling this repository is to create a file "apiKeys.js" which will contain your "apikeys, client IDs and URLs" in the root of your "/src" folder before starting the npm, else the api's in the app won't work and will be returning errors.
(2) Make sure to declare the APIs in this manner:
"
// apiKeys.js

const Jooble = {
  API_URL: "YOUR_API_URL",
  API_KEY: "YOUR_API_KEY",
};

const Nutritionix = {
  API_URL: "YOUR_API_URL",
  APP_ID: "YOUR_APP_ID",
  API_KEY: "YOUR_API_KEY",
};

const LiveHealthilyWidget = {
  WIDGET_SRC: "YOUR_WIDGET_SRC",
};

const GoogleOAuth = {
  CLIENT_ID: "YOUR_CLIENT_ID",
  API_KEY: "YOUR_API_KEY",
  SCOPE: "YOUR_API_SCOPE",
  DISCOVERY_DOCS: "YOUR_DISCOVERY_DOCS",
  REDIRECT_URI: "YOUR_REDIRECT_URI",
};

export { Jooble, Nutritionix, LiveHealthilyWidget, GoogleOAuth };
"

(3) Not to worry, Your API keys and secrets are safe as they're already ignore in the gitignore file, but you can still check the gitignore file to crosscheck.
Thanks!!
