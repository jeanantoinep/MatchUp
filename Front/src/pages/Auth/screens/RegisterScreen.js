import { Text, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { colors } from "../../../../assets/colors";

import { Picker } from "@react-native-picker/picker";
import AuthInput from "../components/AuthInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
//REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

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
const RegisterView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginBtn = styled.TouchableOpacity`
    border-bottom: 1px solid #bdb9c7;
    display: flex;
    align-items: center;
    padding: 5px 0;
`;
const LoginBtnTxt = styled.Text`
    color: #bdb9c7;
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
`;

const RegisterBtn = styled.TouchableOpacity`
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

// const Picker = styled.TouchableOpcity`
//     color: ${color.red};
//     font-size: 20px;
//     /* font-family: "Roboto_700Bold"; */
// `;

const RegisterScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const ageOptions = [
        { label: "Under 18", value: "under18" },
        { label: "18-24", value: "18-24" },
        { label: "25-34", value: "25-34" },
        { label: "35-44", value: "35-44" },
        { label: "45-54", value: "45-54" },
        { label: "55-64", value: "55-64" },
        { label: "Over 65", value: "over65" },
    ];

    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    const navigation = useNavigation();
    return (
        <MainView>
            <RegisterView>
                <LogoView>
                    <Text> LOGO</Text>
                </LogoView>
                <Text>Register Screen</Text>
                <AuthInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <AuthInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                />
                <View>
                    <Text>Select your age:</Text>
                    <Picker
                        selectedValue={age}
                        onValueChange={(itemValue) => setAge(itemValue)}
                        // STYLE ICI
                        style={{}}
                    >
                        {ageOptions.map((item) => (
                            <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        {genderOptions.map((item) => (
                            <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </Picker>
                </View>

                <AuthInput
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    placeholder="Password"
                />
                <AuthInput
                    value={checkPassword}
                    onChangeText={setCheckPassword}
                    placeholder="Confirm password"
                />
                <RegisterBtn
                // onPress={handleSubmit}
                >
                    <SubmitTxt>Register</SubmitTxt>
                </RegisterBtn>

                <LoginBtn
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    <LoginBtnTxt>
                        Already Have an Account? Login now
                    </LoginBtnTxt>
                </LoginBtn>
            </RegisterView>
        </MainView>
    );
};

export default RegisterScreen;
