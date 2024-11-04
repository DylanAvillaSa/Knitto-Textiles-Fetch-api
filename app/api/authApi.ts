import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (username: string, password: string) => {
  if (username === "admin" && password === "admin") {
    const token = "46858360-a36fe29c51c3ca3acededd86a";
    await AsyncStorage.setItem("token", token);
    return token;
  } else {
    throw new Error("Invalid credentials");
  }
};
