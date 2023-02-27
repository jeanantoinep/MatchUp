import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import { useState } from "react";
import { colors } from "../../../assets/colors";



const MainView = styled.View`
    width: 100%;
    padding: 20px;

    border: 1px solid red;
    display: flex;
`;

const styles = StyleSheet.create({
    MainView: {
        width: "100%",
        paddingVertical: "10%",
        backgroundColor: colors.blue,
    }
})



const Title = styled.Text`
    font-size: 28px;
    text-align: center;
`;
const EditUserBtn  = styled.Text`
color: ${colors.red};
font-size: 12px;
text-align: center;
text-decoration: underline;
`;

const ProfileView = styled.View`
display: flex;
justify-content: center;
align-items: center;
height: 20%;
`;

const ProfilePage = ({ props }) => {
      
   /* const userId = useSelector((state) => state.user.userInfo.userId);*/
    return (
        <ProfileView>

            <TouchableOpacity>
            <View>
            

                <Text>Profile Page</Text>

                <EditUserBtn onPress={() => null}>
                        Edit
                </EditUserBtn>
                
                
            </View></TouchableOpacity>
           
        </ProfileView>
    );
};

export default ProfilePage;


