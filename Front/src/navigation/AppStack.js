import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../assets/colors";
import HomepageStack from "./HomepageStack";
import ProfileStack from "./ProfileStack";
import logo from "../../assets/logo.png";
import notification from "../../assets/notification.png";
import profile from "../../assets/profile.png";
import styled from "styled-components/native";
import ProfilePage from "../pages/App/profile/ProfilePage";
import NotificationStack from "./NotificationStack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccesstoken } from "../utils/refreshAccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

import { logout, setUser } from "../store/userSlice";
import { showMessage } from "react-native-flash-message";

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
const Tab = createBottomTabNavigator();

const AppStack = () => {
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.user.userToken);

    const addAuthToRequest = (config) => {
        if (userToken) {
            config.headers = {
                Authorization: `Bearer ${userToken}`,
            };
        }
        return config;
    };

    axios.interceptors.request.use(addAuthToRequest, (err) =>
        Promise.reject(err)
    );
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response.status === 401 &&
                error.response.data.error === "JWT token is expired" &&
                !originalRequest._retry
            ) {
                const access_token = await refreshAccesstoken();
                if (!access_token) {
                    await AsyncStorage.removeItem("userInfo");
                    await AsyncStorage.removeItem("refreshToken");
                    dispatch(logout());
                    axios.interceptors.request.clear();
                    showMessage({
                        message: "You have been disconnected please log in",
                        type: "info",
                    });
                    return Promise.reject(error);
                }
                const decoded = jwt_decode(access_token);
                const user = {
                    user: decoded.user,
                    token: access_token,
                };
                dispatch(setUser(user));
                await AsyncStorage.setItem("userInfo", JSON.stringify(user));
                axios.interceptors.request.clear();
                axios.interceptors.request.use(
                    (config) => {
                        if (access_token) {
                            config.headers = {
                                Authorization: `Bearer ${access_token}`,
                            };
                        }
                        return config;
                    },
                    (err) => Promise.reject(err)
                );
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.blue,
                    height: 75,
                },
                tabBarHideOnKeyboard: true,
            }}
            initialRouteName="Games"
        >
            {/* notifications */}
            <Tab.Screen
                options={{
                    tabBarIcon: (props) => (
                        <View>
                            <Image
                                style={styles.tinyLogo}
                                source={notification}
                            />
                        </View>
                    ),
                }}
                name="Notifications"
            >
                {() => <NotificationStack />}
            </Tab.Screen>

            {/* games */}
            <Tab.Screen
                options={{
                    tabBarIcon: (props) => (
                        <View>
                            <Image style={styles.tinyLogo} source={logo} />
                        </View>
                    ),
                }}
                name="Games"
            >
                {() => <HomepageStack />}
            </Tab.Screen>
            {/* Profile */}
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: (props) => (
                        <View>
                            <Image style={styles.tinyLogo} source={profile} />
                        </View>
                    ),
                }}
            >
                {() => <ProfilePage />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default AppStack;
