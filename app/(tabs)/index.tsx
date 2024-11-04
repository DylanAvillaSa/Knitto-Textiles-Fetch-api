import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/authSlice";
import { login } from "../api/authApi";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setError(false);
  }, [username, password]);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);

      if (token) {
        setError(false);
        navigation.navigate("HomeScreen");
        dispatch(setToken(token));
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setError(true);
    }
  };

  console.log(error);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#007bff",
          opacity: "85%",
          fontSize: 16,
          fontWeight: "normal",
          alignSelf: "flex-start",
        }}>
        Login Form
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "crimson" }}>username / password incorrect</Text>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "50%",
    flexDirection: "column",
    gap: "12px",
    height: "500px",
    margin: "auto",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: "6px",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "semibold",
  },

  input: {
    opacity: "35%",
    borderRadius: "2px",
    width: "100%",
    boxShadow: "0 0 2px black",
    padding: "6px",
  },
});
