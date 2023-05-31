import { createContext, useContext, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'

import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'

import Constants from 'expo-constants'

// import { makeRedirectUri } from "expo-auth-session";

import { auth } from '../../services/firebase'

export const AuthContext = createContext({ user: null, signIn: () => {}, signOut: () => {}, loading: false })

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.firebaseWebClientId,
        iosClientId: Constants.manifest.extra.firebaseIosClientId,
        expoClientId: Constants.manifest.extra.firebaseWebClientId,
    // TODO: Implementar a nova metodologia de redirecionamento
    // redirectUri: makeRedirectUri({
    //   scheme: 'linksme'
    // }) your-scheme://expo-development-client/?url=https://u.expo.dev/your-eas-build-project-id?channel-name=your-channel-name
    })

    function signIn() {
        setLoading(true)
        promptAsync()
    }
    function signOut() {
        setUser(null)
        setToken('')
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { accessToken, idToken } = response.authentication
            setToken(accessToken)
            // TODO: Salvar accessToken no Storage Local para uso futuro
            const credentials = GoogleAuthProvider.credential(idToken, accessToken)
            signInWithCredential(auth, credentials).then(result  => {
                setUser(result.user)
                setLoading(false)
            })
        }
    }, [response, token])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}