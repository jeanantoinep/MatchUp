import { Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { colors } from "../../../../assets/colors";

import { Picker } from "@react-native-picker/picker";
import AuthInput from "../components/AuthInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet } from "react-native";
import logo from "../../../../assets/logo.png";

//REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

const LogoView = styled.View`
    border: 0px solid ${colors.red};
    width: 100px;
    height: 100px;
`;
const Image = styled.Image`
    width: 100%;
    height: 100%;
`;
const RegisterView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const LoginBtn = styled.TouchableOpacity`
    border-bottom: 1px solid #bdb9c7;
    display: flex;
    align-items: center;
    padding: 5px 0;
`;
const LoginBtnTxt = styled.Text`
    color: ${colors.red};
    font-size: 12px;
    text-align: center;
    text-decoration: underline;
`;

const RegisterBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    padding: 0 40px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 20px 0;
`;
const SubmitTxt = styled.Text`
    color: ${colors.white};
    font-size: 18px;
`;
const PickersView = styled.View`
    width: 70%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

const styles = StyleSheet.create({
    MainView: {
        width: "100%",
        paddingVertical: "10%",
        backgroundColor: colors.blue,
    },
    PickerView: {
        borderRadius: 10,
        overflow: "hidden",
        width: "48%",
        marginVertical: 16,
    },
    Picker: {
        backgroundColor: colors.whiteFade,
        width: "100%",
        color: colors.blueFade,
    },
    PickerItem: {},
});

const RegisterScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const ageOptions = [
        { label: "Under 18", value: "-18" },
        { label: "18-24", value: "18-24" },
        { label: "25-34", value: "25-34" },
        { label: "35-44", value: "35-44" },
        { label: "45-54", value: "45-54" },
        { label: "55-64", value: "55-64" },
        { label: "Over 65", value: "65+" },
    ];

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            if (password !== checkPassword) {
                return Alert.alert(
                    "Attention",
                    "Please enter two identical passwords"
                );
            }
            if (
                !username ||
                !firstname ||
                !lastname ||
                !email ||
                !age ||
                !gender ||
                !password
            ) {
                return Alert.alert("Warning", "Please fill all the fields");
            }
            const response = await axios.post("/register", {
                username,
                firstname,
                lastname,
                email,
                number: "0606060606",
                location: "Paris",
                age,
                gender,
                password,
            });
            console.log(response.data);
            const { user, token } = response.data;
            dispatch(setUser({ user, token }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.MainView}>
            <RegisterView>
                <LogoView>
                    <Image source = {logo} />
                </LogoView>

                <AuthInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <AuthInput
                    value={firstname}
                    onChangeText={setFirstname}
                    placeholder="Firstname"
                />
                <AuthInput
                    value={lastname}
                    onChangeText={setLastname}
                    placeholder="Lastname"
                />
                <AuthInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                />
                <PickersView>
                    <View style={styles.PickerView}>
                        <Picker
                            selectedValue={age}
                            onValueChange={(itemValue) => setAge(itemValue)}
                            style={styles.Picker}
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
                    <View style={styles.PickerView}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.Picker}
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
                </PickersView>

                <AuthInput
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    placeholder="Password"
                />
                <AuthInput
                    value={checkPassword}
                    isPassword
                    onChangeText={setCheckPassword}
                    placeholder="Confirm password"
                />
                <RegisterBtn onPress={handleSubmit}>
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
        </KeyboardAwareScrollView>
    );
};

export default RegisterScreen;
