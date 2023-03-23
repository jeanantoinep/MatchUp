import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import AuthInput from "../../components/AuthInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import jwt_decode from "jwt-decode";
import logo from "../../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

//REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

// ASSETS
import { colors } from "../../../assets/colors";
import { showMessage } from "react-native-flash-message";

const MainView = styled(KeyboardAwareScrollView)`
    height: 100%;
    width: 100%;
    padding-top: 20%;
    background-color: ${colors.blue};
`;
const LogoView = styled.View`
    border: 0;
    width: 100px;
    height: 100px;
    margin: 20px 0;
`;
const Image = styled.Image`
    width: 100%;
    height: 100%;
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

const LoginBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    padding: 0 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 30px 0;
`;
const SubmitTxt = styled.Text`
    color: ${colors.white};
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
            const { data, status } = await axios.post("/login", {
                login: login,
                password: password,
            });
            if (status === 200) {
                const decoded = jwt_decode(data.token);
                const user = {
                    user: decoded.user,
                    token: data.token,
                };
                dispatch(setUser(user));
                await AsyncStorage.setItem("userInfo", JSON.stringify(user));
                await AsyncStorage.setItem("refreshToken", data.refreshToken);
                console.log(data.refreshToken);
            }
        } catch (error) {
            if (error.response.status === 401) {
                showMessage({
                    message: "Incorrect credentials.",
                    type: "warning",
                });
            }
        }
    };

    return (
        <MainView>
            <LoginView>
                <LogoView>
                    <Image source={logo} />
                </LogoView>

                <AuthInput
                    value={login}
                    onChangeText={setLogin}
                    placeholder="Email or Username"
                />
                <AuthInput
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    placeholder="Password"
                />
                <LoginBtn onPress={handleSubmit}>
                    <SubmitTxt>Login</SubmitTxt>
                </LoginBtn>
                <RegisterBtn
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                >
                    <RegisterBtnTxt>
                        Don't have an account yet ? Create one here
                    </RegisterBtnTxt>
                </RegisterBtn>
            </LoginView>
        </MainView>
    );
};

export default LoginScreen;
