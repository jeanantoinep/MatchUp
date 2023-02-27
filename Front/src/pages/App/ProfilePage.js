import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import { useState } from "react";


const MainView = styled.View`
    width: 100%;
    padding: 20px;

    border: 1px solid red;
    display: flex;
`;

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
`;
const EditUserBtn = styled.TouchableOpacity`
    margin: 0 auto;
    padding: 10px;
`;

const ProfilePage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
   /* const userId = useSelector((state) => state.user.userInfo.userId);*/
    
    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await axios.get(`/user/${eventId}`);
            dispatch(setEvent({ event: data.user }));
            console.log(data);
            setIsLoading(false);
        };
        fetchProfile();
        console.log(userId);

        
    }, []);
    return (
        !isLoading && (
            <View>
                <Text>Profile Page</Text>
                {!isAlreadyPart(user, userId) && (
                    <TouchableOpacity onPress={editProfile}>
                        <Text>Update Profile</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    );
};

export default ProfilePage;

const styles = StyleSheet.create({});
