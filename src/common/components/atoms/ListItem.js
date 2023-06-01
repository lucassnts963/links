import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { ref, push, set } from "firebase/database";

import { database as db } from "../../../services/firebase";
import { useAuth } from "../../context/AuthContext";

export function ListItem({ data, onPress }) {
  const { user } = useAuth();

  function handleClick() {
    Linking.openURL(data.url);
  }

  function handleDelete() {
    const urlRef = ref(db, "users/" + user.uid + "/urls/" + data.id);
    set(urlRef, null);
  }

  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <Text>{data.url.substring(0, 30)}</Text>
      <View style={styles.containerButtons}>
        <Pressable onPress={onPress}>
          <Text style={styles.textButtonCopy}>Copiar</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text style={styles.textButtonDelete}>Excluir</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  containerButtons: {
    flexDirection: "row",
    gap: 5,
    padding: 5,
  },
  textButtonCopy: {
    color: "#F70",
  },
  textButtonDelete: {
    color: "#F00",
  },
});
