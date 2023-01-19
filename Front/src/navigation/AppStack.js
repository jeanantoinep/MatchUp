import { View, Text } from "react-native";
import React from "react";
import Homepage from "../pages/App/screens/Homepage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../assets/colors";

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.blue,
                    height: 80,
                },
            }}
        >
            <Tab.Screen name="Homepage1">{() => <Homepage />}</Tab.Screen>
            <Tab.Screen name="Homepage2">{() => <Homepage />}</Tab.Screen>
            <Tab.Screen name="Homepage3">{() => <Homepage />}</Tab.Screen>
        </Tab.Navigator>
    );
};

export default AppStack;
