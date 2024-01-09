import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import styles from "../styles/home.style";
import Button from "../utils/Button";
import LoadingModal from "../utils/LoadingModal";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AlertModal from "../utils/Modal";

export const Admin = () => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
          "https://hostel-hives-backend.vercel.app/api/user/fetchusers",
          { hostelId: user.hostel_id, id: user.id }
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
  }, [refresh, isFocused]);

  const changeStatus = async (status: string, id: number) => {
    try {
      setLoading(true);
      await axios.post(
        "https://hostel-hives-backend.vercel.app/api/user/changestatus",
        {
          id: user.id,
          userId: id,
          status:
            status === "P" ? "A" : status === "B" ? "A" : status === "A" && "B",
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      setRefresh((prev) => !prev);
    }
  };
  const RejectUser = async (id: number) => {
    try {
      setLoading(true);
      await axios.post(
        "https://hostel-hives-backend.vercel.app/api/user/changestatus",
        {
          id: user.id,
          userId: id,
          status: "R",
        }
      );

      setAlert({
        open: true,
        title: "Request rejected successfully!",
        onClose: () => {
          setAlert((prev) => ({ ...prev, open: false }));
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
      setRefresh((prev) => !prev);
    }
  };
  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      await axios.post(
        "https://hostel-hives-backend.vercel.app/api/user/deleteuser",
        {
          id: user.id,
          userId: id,
          status: "R",
        }
      );

      setAlert({
        open: true,
        title: "User deleted successfully!",
        onClose: () => {
          setAlert((prev) => ({ ...prev, open: false }));
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
      setRefresh((prev) => !prev);
    }
  };
  const clearTransactions = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://hostel-hives-backend.vercel.app/api/transaction/cleartransactions",
        {
          id: user.id,
          hostelId: user.hostel_id,
        }
      );
      setAlert({
        open: true,
        title: "Transaction history cleared successfully!",
        onClose: () => {
          setAlert((prev) => ({ ...prev, open: false }));
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
      setRefresh((prev) => !prev);
    }
  };
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
            <Text style={styles.title}>App Management</Text>
          </View>
          {users?.map((user) => (
            <View style={styles.adminUserContainer} key={user.id}>
              <View style={styles.adminUserWrapper}>
                <Text style={styles.adminUserName}>Name</Text>
                <Text style={styles.adminUserName}>{user.name}</Text>
              </View>

              <View style={styles.adminUserWrapper}>
                <Text style={styles.adminUserName}>Email</Text>
                <Text style={styles.adminUserName}>{user.email}</Text>
              </View>
              <View style={styles.adminUserWrapper}>
                <Text style={styles.adminUserName}>Action</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                  <TouchableOpacity
                    disabled={user.status === "R"}
                    onPress={() => changeStatus(user.status, user.id)}
                  >
                    <Text
                      style={{
                        backgroundColor: COLORS.blueLight,
                        color: COLORS.blueDark,
                        ...styles.adminActionButton,
                      }}
                    >
                      {user.status === "P"
                        ? "Approve"
                        : user.status === "B"
                        ? "Unblock"
                        : user.status === "A"
                        ? "Block"
                        : "Rejected"}
                    </Text>
                  </TouchableOpacity>

                  {user.status === "P" && (
                    <TouchableOpacity onPress={() => RejectUser(user.id)}>
                      <Text
                        style={{
                          backgroundColor: COLORS.yellowLight,
                          color: COLORS.yellowDark,
                          ...styles.adminActionButton,
                        }}
                      >
                        Reject
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => deleteUser(user.id)}>
                    <Text
                      style={{
                        backgroundColor: COLORS.yellowLight,
                        color: COLORS.yellowDark,
                        ...styles.adminActionButton,
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <Button
            disabled={false}
            title={"Clear Transactions"}
            onPress={clearTransactions}
            variant="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
