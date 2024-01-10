import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "../styles/home.style";
import styles3 from "../styles/login.style";
import Button from "../utils/Button";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { useAuth } from "../utils/AuthContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import LoadingModal from "../utils/LoadingModal";
import AlertModal from "../utils/Modal";
import { format } from "date-fns";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [transactions, setTransactions] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user, isAdmin, loggedIn } = useAuth();
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
  }, [isFocused, refresh, user, isAdmin, loggedIn]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://hostel-hives-backend.vercel.app/api/transaction/fetchtransactions",
          { hostelId: user.hostel_id }
        );
        setTransactions(response?.data);
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
  }, [isFocused, refresh, user, isAdmin, loggedIn]);

  const [checkedUsers, setCheckedUsers] = useState([]);
  const handleAddUser = (id: number) => {
    if (checkedUsers.includes(id as never)) {
      const filtered = checkedUsers.filter((item) => item !== id);
      setCheckedUsers(filtered);
    } else {
      setCheckedUsers((prev) => [...prev, id] as never);
    }
  };
  useEffect(() => {
    setTransactions([]);
    setUsers([]);
  }, [user, loggedIn, isAdmin]);
  const closeModal = () => {
    setOpen(false);
    setPrice("");
    setDesc("");
    setCheckedUsers([]);
  };

  const createTransaction = async () => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://hostel-hives-backend.vercel.app/api/transaction/createtransaction",
          {
            id: user.id,
            amount: price,
            hostel_id: user.hostel_id,
            transaction_by: user.id,
            included_users: checkedUsers,
            items: desc,
          }
        );
        setAlert({
          open: true,
          title: "Transaction created!",
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
        closeModal();
      }
    };

    fetchUsers();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite, minHeight: "100%" }}
    >
      <LoadingModal open={loading} onRequestClose={() => setLoading(false)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={closeModal}
        >
          <AlertModal
            onRequestClose={alert.onClose}
            open={alert.open}
            title={alert.title}
          />
          <View style={stylesModal.modalContainer}>
            <View style={stylesModal.modalContent}>
              <Text style={styles.title}>Add Transaction</Text>
              <View style={styles3.inputContainer}>
                <View style={styles3.inputWrapper}>
                  <TextInput
                    value={desc}
                    onChangeText={(text) => setDesc(text)}
                    style={styles3.inputStyle}
                    placeholder="Items"
                    maxLength={30}
                  />
                </View>
              </View>
              <View style={styles3.inputContainer}>
                <View style={styles3.inputWrapper}>
                  <TextInput
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    style={styles3.inputStyle}
                    placeholder="Amount"
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 4,
                  marginTop: 12,
                }}
              >
                {users.map((u) => (
                  <CheckBox
                    disabled={u.id === user.id}
                    key={u.id}
                    containerStyle={{
                      backgroundColor: COLORS.lightWhite,
                      borderWidth: 0,
                      padding: 0,
                      margin: 0,
                    }}
                    textStyle={{
                      color: COLORS.primary,
                    }}
                    checkedColor={COLORS.primary}
                    title={u.name}
                    checked={checkedUsers.includes(u.id as never)}
                    onPress={() => handleAddUser(u.id)}
                  />
                ))}
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  gap: 6,
                  marginTop: 12,
                }}
              >
                <Button
                  title="Create"
                  onPress={createTransaction}
                  variant="small"
                  disabled={!desc || !price || checkedUsers?.length <= 1}
                />
                <Button
                  title="Cancel"
                  onPress={closeModal}
                  variant="small"
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ flex: 1, padding: SIZES.medium, paddingTop: 10 }}>
          <View
            style={{
              ...styles.title,
              marginBottom: 20,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.title}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
                checkedUsers.push(user.id as never);
              }}
            >
              <Text
                style={{
                  backgroundColor: COLORS.primary,
                  width: 31,
                  height: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  borderRadius: 6,
                }}
              >
                <Ionicons name="add" size={32} color={COLORS.gray2} />
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ minWidth: "100%" }}
          >
            <View style={{ minWidth: "100%" }}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCell }}>Amount</Text>
                <Text style={{ ...styles.tableCell }}>By</Text>
                <Text style={{ ...styles.tableCell, width: 120 }}>Items</Text>
                <Text
                  style={{
                    ...styles.tableCell,
                    width: 120,
                    textAlign: "center",
                  }}
                >
                  Date
                </Text>
                {users?.map((u) => (
                  <Text style={{ ...styles.tableCell }} key={u.id}>
                    {u.name}
                  </Text>
                ))}
              </View>
              {transactions?.map((t) => (
                <View style={styles.tableBody} key={t.id}>
                  <Text
                    style={{
                      ...styles.tableCell,
                      backgroundColor:
                        125 > 0 ? COLORS.blueLight : COLORS.yellowLight,
                      color: 125 > 0 ? COLORS.blueDark : COLORS.yellowDark,
                      borderRadius: 5,
                    }}
                  >
                    {t.amount}
                  </Text>
                  <Text
                    style={{
                      ...styles.tableCell,
                      color: COLORS.primary,
                    }}
                  >
                    {t.trasnaction_user_detials?.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.tableCell,
                      color: COLORS.primary,
                      width: 120,
                    }}
                  >
                    {t?.items}
                  </Text>
                  <Text
                    style={{
                      ...styles.tableCell,
                      color: COLORS.primary,
                      width: 120,
                      textAlign: "left",
                    }}
                  >
                    {format(new Date(t.created_at), "dd.MM HH:mm a")}
                  </Text>
                  {users?.map((u) => (
                    <Text
                      key={u.id}
                      style={{
                        ...styles.tableCell,
                        borderRadius: 5,
                        backgroundColor:
                          t.transaction_by === u.id
                            ? COLORS.blueLight
                            : COLORS.yellowLight,
                        color:
                          t.transaction_by === u.id
                            ? COLORS.blueDark
                            : COLORS.yellowDark,
                      }}
                    >
                      {t.included_users.includes(u.id)
                        ? `${
                            t.transaction_by === u.id && t.per_head > 0
                              ? "+" + (t.amount - t.per_head)
                              : "-" + t.per_head
                          }`
                        : "0"}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    alignItems: "center",
  },
});
