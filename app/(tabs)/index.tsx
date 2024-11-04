import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
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
      <Text>Login Form</Text>
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
      <Button
        title='Login'
        onPress={handleLogin}
      />
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
    gap: "8px",
    height: "500px",
    margin: "auto",
    alignItems: "center",
  },

  input: {
    borderRadius: "3px",
    width: "100%",
    border: ".5px solid black",
    padding: "6px",
  },
});
