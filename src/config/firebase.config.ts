import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Import Firebase service account JSON directly
import serviceAccountRaw from './scrum-board-4add2-firebase-adminsdk-fbsvc-5339a460c1.json' assert { type: 'json' };

// Fix private_key formatting by replacing escaped \n with real line breaks
const serviceAccount = {
  ...serviceAccountRaw,
  private_key: (serviceAccountRaw.private_key as string).replace(/\\n/g, '\n'),
};

// Get the Realtime Database URL from .env
const databaseURL: string | undefined = process.env.PROJECT_URL;
if (!databaseURL) {
  throw new Error('PROJECT_URL environment variable is not defined');
}

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL,
});

// Get references to Database and Auth
const db: admin.database.Database = admin.database();
const auth: admin.auth.Auth = admin.auth();

export { db, auth };
