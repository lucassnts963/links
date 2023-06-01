import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.photoURL }} />
      <Text style={styles.title}>{user.displayName}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>
      <Pressable onPress={signOut}>
        <Text style={styles.logout}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  title: {
    fontSize: 32,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#ccf",
  },
  logout: {
    color: "#f00",
  },
});
