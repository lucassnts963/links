import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

import Constants from 'expo-constants'


const firebaseConfig = {
    apiKey: Constants.manifest.extra.firebaseApiKey,
    authDomain: Constants.manifest.extra.firebaseAuthDomain,
    databaseURL: Constants.manifest.extra.firebaseDatabase,
    projectId: Constants.manifest.extra.firebaseProjectId,
    storageBucket: Constants.manifest.extra.firebaseStorageBucket,
    messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
    appId: Constants.manifest.extra.firebaseAppId
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }