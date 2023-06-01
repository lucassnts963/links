import { createContext, useContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";

import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

import Constants from "expo-constants";

// import { makeRedirectUri } from "expo-auth-session";

import { auth } from "../../services/firebase";
import { getToken, saveToken } from "../utils/token";
import { Alert } from "react-native";

export const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  loading: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Constants.manifest.extra.firebaseWebClientId,
    iosClientId: Constants.manifest.extra.firebaseIosClientId,
    expoClientId: Constants.manifest.extra.firebaseWebClientId,
    // TODO: Implementar a nova metodologia de redirecionamento
    // redirectUri: makeRedirectUri({
    //   scheme: 'linksme'
    // }) your-scheme://expo-development-client/?url=https://u.expo.dev/your-eas-build-project-id?channel-name=your-channel-name
  });

  function signIn() {
    setLoading(true);
    promptAsync();
  }

  function signOut() {
    saveToken("")
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        Alert.alert(`Error ao fazer logout! ${error}`);
      });
  }

  async function handleSignIn() {
    const token = await getToken();

    if (!token && response?.type === "success") {
      const { accessToken } = response.authentication;
      const credentials = GoogleAuthProvider.credential(undefined, accessToken);
      signInWithCredential(auth, credentials).then((result) => {
        setUser(result.user);
        setLoading(false);
      });

      saveToken(accessToken);
    } else {
      const credentials = GoogleAuthProvider.credential(_, token);
      signInWithCredential(auth, credentials).then((result) => {
        setUser(result.user);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    handleSignIn().catch((error) => {
      setError(error);
    });
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
