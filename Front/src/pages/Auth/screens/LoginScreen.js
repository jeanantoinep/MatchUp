import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import AuthInput from "../components/AuthInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

//REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

// ASSETS
import { colors } from "../../../../assets/colors";

const MainView = styled(KeyboardAwareScrollView)`
    height: 100%;
    width: 100%;
    padding-top: 20%;
    background-color: ${colors.blue};
`;
const LogoView = styled.View`
    border: 1px solid ${colors.red};
    width: 100px;
    height: 100px;
`;
const LoginView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterBtn = styled.TouchableOpacity`
    border-bottom: 1px solid ${colors.red};
    display: flex;
    align-items: center;
    padding: 5px 0;
`;
const RegisterBtnTxt = styled.Text`
    color: ${colors.red};
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
`;
const SubmitTxt = styled.Text`
    color: #bdb9c7;
    margin: 20px 0;
    font-size: 20px;
    /* font-family: "Roboto_700Bold"; */
`;

const LoginScreen = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * handleSubmit : sends login info to the server and sets user
     */
    const handleSubmit = async () => {
        try {
            const response = await axios.post("/login", {
                email: login,
                password: password,
            });
            console.log(response);
            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainView>
            <LoginView>
                <LogoView>
                    <Text>LOGO</Text>
                </LogoView>

                <AuthInput value={login} onChangeText={setLogin} placeholder="Email or Username" />
                <AuthInput
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    placeholder="Password"
                />
                <TouchableOpacity onPress={handleSubmit}>
                    <SubmitTxt>Submit</SubmitTxt>
                </TouchableOpacity>
                <RegisterBtn
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                >
                    <RegisterBtnTxt>Don't have an account yet ? Create one here</RegisterBtnTxt>
                </RegisterBtn>
            </LoginView>
        </MainView>
    );
};

export default LoginScreen;
