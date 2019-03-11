import { AsyncStorage } from "react-native";

const isLoggedIn = async () => {
  const uid = await AsyncStorage.getItem("uid");
  if (!uid) {
    return false;
  }
  return true;
};

export { isLoggedIn };
