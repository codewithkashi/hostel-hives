import React, { useContext } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { useState } from "react";
import styles from "../styles/login.style";
import GradientButton from "../utils/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AlertModal from "../utils/Modal";
import LoadingModal from "../utils/LoadingModal";
import { AuthContext, useAuth } from "../utils/AuthContext";
import { saveData } from "../../utils/StorageHelper";
const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    onClose: () => {},
  });
  const navigation = useNavigation();
  const { loggedIn, setLoggedIn, setUser, setIsAdmin } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hostel-hives-backend.vercel.app/api/user/login",
        {
          email,
          password,
        }
      );
      await saveData("user", response?.data);
      setLoggedIn(true);
      setUser(response?.data);
      if (response?.data?.is_admin) {
        setIsAdmin(true);
      }
    } catch (error: any) {
      setAlert({
        open: true,
        title: error?.response?.data?.error || error?.error || error?.message,
        onClose: () => {
          setAlert((prev) => ({ ...prev, open: false }));
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <AlertModal
        onRequestClose={alert.onClose}
        open={alert.open}
        title={alert.title}
      />
      <LoadingModal onRequestClose={() => setLoading(false)} open={loading} />
      <View style={styles.loginContainer}>
        <View
          style={{
            ...styles.title,
            width: "100%",
          }}
        >
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputStyle}
              placeholder="Email"
              textContentType="emailAddress"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.inputStyle}
              placeholder="Password"
              textContentType="password"
            />
          </View>
        </View>

        <View style={styles.loginActionWrapper}>
          <GradientButton
            disabled={!email || !password}
            title={"Sign in"}
            onPress={handleLogin}
            variant="large"
          />
          <Text style={styles.loginSwitchText}>Don't have an account?</Text>
          <GradientButton
            disabled={false}
            title={"Sign up"}
            onPress={() => {
              navigation.navigate("Register" as never);
            }}
            variant="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
