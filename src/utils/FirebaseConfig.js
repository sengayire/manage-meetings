// Initialize Firebase
// TODO: Make sure you have these environment variables in your .env file.
const { FIREBASE_API_KEY } = process.env || {};
const { FIREBASE_PROJECT_ID } = process.env || {};
const { FIREBASE_DATABASE_NAME } = process.env || {};
const { FIREBASE_BUCKET } = process.env || {};

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID,
  databaseURL: `https://${FIREBASE_DATABASE_NAME}.firebaseio.com`,
  storageBucket: `${FIREBASE_BUCKET}.appspot.com`,
};

export default config;
