import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import styles from "../styles/home.style";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import LoadingModal from "../utils/LoadingModal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AlertModal from "../utils/Modal";

const Stats = () => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    onClose: () => {},
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://hostel-hives-backend.vercel.app/api/transaction/fetchusers",
          { hostelId: user.hostel_id }
        );
        setUsers(response?.data);
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

    fetchUsers();
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
            <Text style={styles.title}>Statistics</Text>
          </View>
          {users?.map((user) => (
            <View
              style={{ ...styles.statsContainer, marginVertical: 4 }}
              key={user.id}
            >
              <Text style={styles.statusText}>{user.name}</Text>
              <Text
                style={{
                  backgroundColor:
                    user.balance > 0 ? COLORS.blueLight : COLORS.yellowLight,
                  color: user.balance > 0 ? COLORS.blueDark : COLORS.yellowDark,
                  ...styles.statsBalance,
                }}
              >
                {user.balance != 0 && user.balance > 0 && "+"}
                {user?.balance}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
