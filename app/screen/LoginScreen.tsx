import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/authSlice";
import { login } from "../api/authApi";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      dispatch(setToken(token));
      navigation.replace("Home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder='Username'
        onChangeText={setUsername}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title='Login'
        onPress={handleLogin}
      />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
