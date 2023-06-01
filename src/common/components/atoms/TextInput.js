import { TextInput as ReactNativeTextInput, StyleSheet } from 'react-native'

export function TextInput(props) {
  return (
    <ReactNativeTextInput
      style={styles.input}
      {...props}
    />
    )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginBottom: 4
  }
})