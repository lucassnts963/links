import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { ref, push } from 'firebase/database'

import { database as db } from '../../services/firebase'

import { useAuth } from '../../common/context/AuthContext'
import { useLinks } from '../../common/hooks/useLinks'

WebBrowser.maybeCompleteAuthSession()

export function HomeView() {
    const [url, setUrl] = useState('')
    
    const {user, signIn, signOut, loading} = useAuth()
    
    const links = useLinks(user)


    function handleSave() {
        const urlRef = ref(db, 'users/' + user.uid + '/urls')
        push(urlRef, {
            url,
        })
        setUrl('')
    }

    return (
        <View style={styles.container}>
            {!user ? (
                <Button
                    title="Sign in with Google"
                    disabled={loading}
                    onPress={signIn}
                />
            ) : (
                <>
                    <Text style={styles.text}>{user.displayName}</Text>
                    <TextInput placeholder="https://sample.com" value={url} onChangeText={setUrl}/>
                    <Button title="Salvar" onPress={handleSave} />
                    <FlatList style={{ flex: 1 }} data={links} renderItem={({ item }) => <Text>{item[1].url}</Text>}/>
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
