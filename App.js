import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
// import { makeRedirectUri } from "expo-auth-session";
import Constants from 'expo-constants'

import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { ref, set, push, onValue, get, child } from 'firebase/database'

import { auth, database as db } from './src/services/firebase'

WebBrowser.maybeCompleteAuthSession()


export default function App() {
    const [token, setToken] = useState('')
    const [user, setUser] = useState(null)
    const [url, setUrl] = useState('')
    const [data, setData] = useState([])

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.firebaseWebClientId,
        iosClientId: Constants.manifest.extra.firebaseIosClientId,
        expoClientId: Constants.manifest.extra.firebaseWebClientId,
        // redirectUri: makeRedirectUri({
        //   scheme: 'linksme'
        // }) your-scheme://expo-development-client/?url=https://u.expo.dev/your-eas-build-project-id?channel-name=your-channel-name


    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { accessToken, idToken } = response.authentication
            setToken(response.authentication.accessToken)
            // getUserInfo();


            const credentials = GoogleAuthProvider.credential(idToken, accessToken)
            signInWithCredential(auth, credentials).then(result  => {
                setUser(result.user)
            })
        }

        if (user) {
            const urlRef = ref(db, 'users/' + user.uid + '/urls')
            onValue(urlRef, (snapshot) => {
                const data = snapshot.val()
                console.log(data)
                setData(Object.entries(data))
            })
        }

    }, [response, token])

    function handleSave() {
        const urlRef = ref(db, 'users/' + user.uid + '/urls')
        push(urlRef, {
            url,
        })
        setUrl('')

    // get(child(db, `users/${user.uid}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    }

    return (
        <View style={styles.container}>
            {user === null ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={() => {
                        promptAsync()
                    }}
                />
            ) : (
                <>
                    <Text style={styles.text}>{user.displayName}</Text>
                    <TextInput placeholder="https://sample.com" value={url} onChangeText={setUrl}/>
                    <Button title="Salvar" onPress={handleSave} />
                    <FlatList style={{ flex: 1 }} data={data} renderItem={({ item }) => <Text>{item[1].url}</Text>}/>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StatusBar.currentHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
