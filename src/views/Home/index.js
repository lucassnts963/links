import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import { ref, push } from "firebase/database";

import * as Clipboard from "expo-clipboard";

import { database as db } from "../../services/firebase";

import { TextInput } from "../../common/components/atoms/TextInput";
import { Button } from "../../common/components/atoms/Button";

import { useAuth } from "../../common/context/AuthContext";
import { useLinks } from "../../common/hooks/useLinks";
import { Header } from "../../common/components/organisms/Header";
import { ListItem } from "../../common/components/atoms/ListItem";

WebBrowser.maybeCompleteAuthSession();

export function HomeView() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState("");

  const { user } = useAuth();

  const links = useLinks(user);

  function handleSave() {
    if (url) {
      const urlRef = ref(db, "users/" + user.uid + "/urls");
      push(urlRef, {
        url,
      });
      setUrl("");
    } else {
      Alert.alert("Alerta", "Informe uma url válida!");
    }
  }

  async function getLink(url) {
    await Clipboard.setStringAsync(url);
    setCopied(url);
  }

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        placeholder="https://sample.com"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Salvar" onPress={handleSave} />
      {copied && <Text style={styles.textCopied}>Copiado: {copied}</Text>}
      <FlatList
        style={{ flex: 1, marginTop: 5, width: "100%" }}
        data={links}
        renderItem={({ item }) => (
          <ListItem
            data={{ id: item[0], ...item[1] }}
            onPress={() => getLink(item[1].url)}
          />
        )}
      />
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textCopied: {
    color: "#0ff",
  },
});
