import {TouchableOpacity as ReactNativeButton, StyleSheet, Text} from 'react-native'

export function Button({title, ...props}) {
    return (
      <ReactNativeButton style={styles.button} {...props}>
        <Text style={styles.text}>{title}</Text>
      </ReactNativeButton>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#00f',
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff'
    }
})