import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const MainView = styled.View`
    margin-top: 80px;
`;

const Homepage = () => {
    const navigation = useNavigation();
    return (
        <MainView>
            <Text>Your games</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddGame")}>
                <Text>Create new game</Text>
            </TouchableOpacity>
        </MainView>
    );
};

export default Homepage;
