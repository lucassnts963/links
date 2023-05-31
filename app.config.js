import 'dotenv/config'

export default {
    'expo': {
        'name': 'links',
        'slug': 'links',
        'scheme': 'linksme',
        'version': '1.0.0',
        'orientation': 'portrait',
        'icon': './assets/icon.png',
        'userInterfaceStyle': 'dark',
        'splash': {
            'image': './assets/splash.png',
            'resizeMode': 'contain',
            'backgroundColor': '#ffffff'
        },
        'assetBundlePatterns': [
            '**/*'
        ],
        'ios': {
            'supportsTablet': true
        },
        'android': {
            'package': 'com.links',
            'adaptiveIcon': {
                'foregroundImage': './assets/adaptive-icon.png',
                'backgroundColor': '#ffffff'
            }
        },
        'web': {
            'favicon': './assets/favicon.png'
        },
        'extra': {
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            firebaseWebClientId: process.env.FIREBASE_WEB_CLIENT_ID,
            firebaseIosClientId: process.env.FIREBASE_IOS_CLIENT_ID
        }
    }
}
