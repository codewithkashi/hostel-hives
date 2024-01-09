import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Admin,
  Home,
  Profile,
  Stats,
  Register,
  Login,
} from "./components/imports";
import { COLORS } from "./constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { AuthContextProvider, useAuth } from "./components/utils/AuthContext";
import { getData, removeData } from "./utils/StorageHelper";
import axios from "axios";
import AlertModal from "./components/utils/Modal";
import LoadingModal from "./components/utils/LoadingModal";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
  const { loggedIn, setLoggedIn, setUser, isAdmin, setIsAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    title: "",
    onClose: () => {},
  });

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const userData = await getData("user");
      if (!userData) {
        setLoggedIn(false);
      }

      try {
        const response = await axios.post(
          "https://hostel-hives-backend.vercel.app/api/user/fetchuser",
          { id: userData.id }
        );
        setLoggedIn(true);
        if (response?.data.is_admin) {
          setIsAdmin(true);
        }
        setUser(userData);
      } catch (error: any) {
        await removeData("user");
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingModal onRequestClose={() => setLoading(false)} open={loading} />
      ) : (
        <NavigationContainer>
          {loggedIn ? (
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },

                  tabBarActiveTintColor: COLORS.primary,
                  headerShadowVisible: false,
                  headerTitle: "",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                  ),
                }}
              />

              <Tab.Screen
                name="Statistics"
                component={Stats}
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerShadowVisible: false,
                  tabBarActiveTintColor: COLORS.primary,
                  headerTitle: "",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart" color={color} size={size} />
                  ),
                }}
              />
              {isAdmin && (
                <Tab.Screen
                  name="Admin"
                  component={Admin}
                  options={{
                    headerStyle: {
                      backgroundColor: COLORS.lightWhite,
                    },
                    headerShadowVisible: false,
                    tabBarActiveTintColor: COLORS.primary,
                    headerTitle: "",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="person" color={color} size={size} />
                    ),
                  }}
                />
              )}
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerShadowVisible: false,
                  tabBarActiveTintColor: COLORS.primary,
                  headerTitle: "",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                  },
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
      <AlertModal
        onRequestClose={alert.onClose}
        open={alert.open}
        title={alert.title}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
});
