import admin from 'firebase-admin';
import dotenv from 'dotenv';


dotenv.config();


import serviceAccount from './scrum-board-4add2-firebase-adminsdk-fbsvc-98535a27fd.json' with { type: 'json' };

const databaseURL: string | undefined = process.env.PROJECT_URL;
if (!databaseURL) {
  throw new Error('PROJECT_URL environment variable is not defined');
}


admin.initializeApp({
  //@ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});


const db: admin.database.Database = admin.database();
const auth: admin.auth.Auth = admin.auth();


export { db, auth };
