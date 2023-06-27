import { createContext, useContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";

import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { makeRedirectUri } from "expo-auth-session";

import Constants from "expo-constants";

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
    androidClientId: Constants.manifest.extra.firebaseAndroidClientId,
    iosClientId: Constants.manifest.extra.firebaseIosClientId,
    // expoClientId: Constants.manifest.extra.firebaseWebClientId,
    redirectUri: makeRedirectUri({
      scheme: "linksme",
    }), // linksme://expo-development-client/?url=https://u.expo.dev/2cd27dc5-4aca-4be9-9041-91a1ab86e4bf?channel-name=main
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
