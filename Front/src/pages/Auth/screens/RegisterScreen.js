import { Text, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { colors } from "../../../../assets/colors";

import { Picker } from "@react-native-picker/picker";
import AuthInput from "../components/AuthInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet } from "react-native";
//REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

const MainView = styled(KeyboardAwareScrollView)`
    height: 90%;
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
    font-size: 10px;
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
    margin: 30px 0;
`;
const SubmitTxt = styled.Text`
    color: ${colors.white};
    font-size: 15px;
    /* font-family: "Roboto_700Bold"; */

`;

const styles = StyleSheet.create({
    Picker: {
        width:130,
        height:20,
        backgroundColor: '#FF7075',
        borderColor: 'black',
        borderWidth: 2,
        color:"white",
        fontSize:10,
        

      },
      PickerItem: {
        color: 'white',
        height:10,
        fontSize:6
      }
    
});

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
    const handleSubmit = async() => {
        try {
            const response = await axios.post("/register", {
                username,
                email,
                age,
                gender,
                password,
                checkPassword,
            });
            console.log(response.data);
            
            const { user, token } = response.data;
            dispatch(setUser({ user, token }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainView>
            <RegisterView>
            <LogoView>
                    <Text> LOGO</Text>
            </LogoView>

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
                    
                    <Picker
                        
                        selectedValue={age}
                        onValueChange={(itemValue) => setAge(itemValue)}
                        // STYLE ICI
                        style={{backgroundColor:'#FF7075', color:'white',width: 130, height: 20, margin: 20, borderRadius: 10, fontSize:10 }}
                                               
                    >
                        {ageOptions.map((item) => (
                            <Picker.Item
                                placeholder="Age"
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
                        style={[styles.Picker]} itemStyle={styles.PickerItem}
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
                    style={{height:10}}
                />
                <AuthInput
                    value={checkPassword}
                    onChangeText={setCheckPassword}
                    placeholder="Confirm password"
                />
                <RegisterBtn
                onPress={handleSubmit}
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
