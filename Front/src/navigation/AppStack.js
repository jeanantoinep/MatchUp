import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../assets/colors";
import HomepageStack from "./HomepageStack";

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.blue,
                    height: 80,
                },
                tabBarHideOnKeyboard: true,
            }}
        >
            {/* <Tab.Screen name="Notification">{() => <Homepage />}</Tab.Screen> */}
            <Tab.Screen name="Games">{() => <HomepageStack />}</Tab.Screen>
            {/* <Tab.Screen name="Profile">{() => <Homepage />}</Tab.Screen> */}
        </Tab.Navigator>
    );
};

export default AppStack;
