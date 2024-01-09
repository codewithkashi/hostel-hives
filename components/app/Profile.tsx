import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import styles from "../styles/home.style";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import { removeData, saveData } from "../../utils/StorageHelper";
import { useIsFocused } from "@react-navigation/native";
import LoadingModal from "../utils/LoadingModal";
import AlertModal from "../utils/Modal";
import { AntDesign } from "@expo/vector-icons";
import Button from "../utils/Button";

const Profile = () => {
  const isFocused = useIsFocused();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    onClose: () => {},
  });
  const handleCopyToClipboard = () => {
    Clipboard.setString(user.hostel_id);
  };
  const { setIsAdmin, setLoggedIn } = useAuth();
  const logOut = async () => {
    try {
      setLoading(true);
      await removeData("user");
      setLoggedIn(false);
      setIsAdmin(false);
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://hostel-hives-backend.vercel.app/api/user/fetchuser",
          { id: user.id }
        );
        setUser(response?.data);
        await saveData("user", response?.data);
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
    fetchUser();
  }, [isFocused]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite, minHeight: "100%" }}
    >
      <AlertModal
        onRequestClose={alert.onClose}
        open={alert.open}
        title={alert.title}
      />
      <LoadingModal open={loading} onRequestClose={() => setLoading(false)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, paddingTop: 10 }}>
          <View style={{ ...styles.title, marginBottom: 20 }}>
            <Text style={styles.title}>Personal Information</Text>
          </View>
          <View style={styles.adminUserContainer}>
            <View style={styles.adminUserWrapper}>
              <Text style={styles.adminUserName}>Name</Text>
              <Text style={styles.adminUserName}>{user?.name}</Text>
            </View>

            <View style={styles.adminUserWrapper}>
              <Text style={styles.adminUserName}>Email</Text>
              <Text style={styles.adminUserName}>{user?.email}</Text>
            </View>
            <View style={styles.adminUserWrapper}>
              <Text style={styles.adminUserName}>Balance</Text>
              <Text
                style={{
                  ...styles.statsBalance,
                  backgroundColor:
                    user.balance > 0 ? COLORS.blueLight : COLORS.yellowLight,
                  color: user.balance > 0 ? COLORS.blueDark : COLORS.yellowDark,
                }}
              >
                {user.balance != 0 && user.balance > 0 ? "+" : "-"}
                {user?.balance}
              </Text>
            </View>
            <View style={styles.adminUserWrapper}>
              <Text style={styles.adminUserName}>Hostel ID</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    ...styles.adminUserName,
                    fontSize: 10,
                    fontWeight: "400",
                  }}
                >
                  {user.hostel_id}
                </Text>
                <TouchableOpacity
                  onPress={handleCopyToClipboard}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <AntDesign name="copy1" size={24} color={COLORS.gray2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={logOut}>
            <Button
              disabled={false}
              onPress={logOut}
              title="Sign out"
              variant="large"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
