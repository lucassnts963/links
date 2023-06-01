import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken() {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
}

export async function saveToken(token) {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    throw new Error(`Error ao salvar o token no Storage`);
  }
}
