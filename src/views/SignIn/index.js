import { StyleSheet, View, StatusBar } from "react-native";
import { Button } from "../../common/components/atoms/Button";
import { useAuth } from "../../common/context/AuthContext";

export function SignInView() {
  const { loading, signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" disabled={loading} onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
