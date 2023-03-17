import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import profile from "../../../../assets/profile.png";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { colors } from "../../../../assets/colors";
import CustomInput from "../../../components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../../store/userSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MainView = styled(KeyboardAwareScrollView)`
    width: 100%;
    padding: 20px;

    margin-top: 15%;
    display: flex;
`;

const styles = StyleSheet.create({
    MainView: {
        width: "100%",
        paddingVertical: "50%",
        backgroundColor: colors.blue,
    },
});

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
`;
const EditUserBtn = styled.Text`
    color: ${colors.red};
    font-size: 12px;
    text-align: center;
    text-decoration: underline;
`;

const SubmitBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    padding: 0 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 16px 0 0 0;
`;

const ProfileView = styled.View`
    border: 1px solid ${colors.red};
    border-radius: 50px;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
`;

const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

const ProfilePage = ({}) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const handleInputChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const userId = useSelector((state) => state.user.userInfo.userId);

    const handleSubmit = async () => {
        try {
            const { data } = await axios.put(`/user/${userId}`, userData);
            // setUserData(data.updated);
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userInfo");
        dispatch(logout());
        axios.interceptors.request.clear();
    };
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/user/${userId}`);
            setUserData(response.data.user);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    return isLoading ? (
        <View>
            <Text>loading</Text>
        </View>
    ) : (
        <MainView contentContainerStyle={{ alignItems: "center" }}>
            <ProfileView>
                <Image source={profile} />
            </ProfileView>

            <CustomInput
                value={userData.firstname}
                onChangeText={(value) => handleInputChange("firstname", value)}
                name="Firstname"
            />
            <CustomInput
                value={userData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                name="Email"
            />
            <CustomInput
                value={userData.username}
                onChangeText={(value) => handleInputChange("username", value)}
                name="Username"
            />
            <CustomInput
                value={userData.number}
                onChangeText={(value) => handleInputChange("number", value)}
                name="Phone Number"
            />
            <SubmitBtn onPress={handleSubmit}>
                <Text>Submit</Text>
            </SubmitBtn>
            <SubmitBtn onPress={handleLogout}>
                <Text>Logout</Text>
            </SubmitBtn>
        </MainView>
    );
};

export default ProfilePage;
