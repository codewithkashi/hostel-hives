import React from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import styles from "../styles/login.style";
import GradientButton from "../utils/Button";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import AlertModal from "../utils/Modal";
import LoadingModal from "../utils/LoadingModal";
import axios from "axios";
const Register = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hostelOption, setHostelOption] = useState("join");
  const [hostelId, setHostelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiHostelID, setApiHostelID] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    onClose: () => {},
  });

  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hostel-hives-backend.vercel.app/api/user/register",
        {
          hostel_id: hostelId,
          name,
          email,
          password,
          hostel_action: hostelOption,
        }
      );
      setApiHostelID(response?.data?.hostel);
      setAlert({
        title: response?.data?.message,
        open: true,
        onClose: () => {
          navigation.navigate("Login" as never);
        },
      });
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlertModal
          onRequestClose={alert.onClose}
          open={alert.open}
          title={alert.title}
          hostelID={apiHostelID}
        />
        <LoadingModal onRequestClose={() => setLoading(false)} open={loading} />
        <View style={styles.loginContainer}>
          <View
            style={{
              ...styles.title,
              width: "100%",
            }}
          >
            <Text style={styles.title}>Create an account</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.inputStyle}
                placeholder="Name"
                textContentType="name"
                maxLength={10}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.inputStyle}
                placeholder="Email"
                textContentType="emailAddress"
                maxLength={20}
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
                maxLength={16}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.inputStyle}
                placeholder="Retype password"
                textContentType="password"
                maxLength={16}
              />
            </View>
          </View>

          <View style={{ width: "100%", paddingLeft: 10, paddingTop: 10 }}>
            <Text>Hostel options: </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="create"
                  status={hostelOption === "create" ? "checked" : "unchecked"}
                  onPress={() => setHostelOption("create")}
                />
                <Text>Create</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="join"
                  status={hostelOption === "join" ? "checked" : "unchecked"}
                  onPress={() => setHostelOption("join")}
                />
                <Text>Join</Text>
              </View>
            </View>
          </View>
          {hostelOption === "join" && (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={hostelId}
                  onChangeText={(text) => setHostelId(text)}
                  style={styles.inputStyle}
                  placeholder="Enter hostel ID"
                  maxLength={36}
                />
              </View>
            </View>
          )}
          <View style={styles.loginActionWrapper}>
            <GradientButton
              disabled={
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                password.length < 8 ||
                password !== confirmPassword ||
                (hostelOption === "join" && hostelId?.length < 36)
              }
              title={"Sign up"}
              onPress={handleRegister}
              variant="large"
            />
            <Text style={styles.loginSwitchText}>Already have an account?</Text>
            <GradientButton
              disabled={false}
              title={"Sign in"}
              onPress={() => {
                navigation.navigate("Login" as never);
              }}
              variant="large"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
