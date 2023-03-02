import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
import { colors } from "../../../assets/colors";



const MainView = styled.View`
    width: 100%;
    padding: 20px;

    align-items : center;
    border: 1px solid red;
    display: flex;
`;


const styles = StyleSheet.create({
    MainView: {
        width: "100%",
        paddingVertical: "50%",
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



const ProfilePage = ({  }) => {
    const [userData, setUserData] = useState(null);
    const [editedData, setEditedData] = useState({
        email: "",
        username: "",
        password: "",
      });
      
      const handleInputChange = (field, value) => {
        setEditedData({ ...editedData, [field]: value });
      };
      
      const handleSubmit = async () => {
        try {
          const response = await axios.put(`/user/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
          });
          const data = await response.json();
          setUserData(data.updated);
          
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`/user/${userId}`);
            const data = await response.json();
            setUserData(data.user);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchUserData();
      }, []);
   
   
   
   return (
    <MainView>
        <View>
        <Text>Email: {userData.email}</Text>
        <Text>Username: {userData.username}</Text>
        <Text>Phone Number: {userData.number}</Text>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
        <Text>Edit</Text>
        </TouchableOpacity>
   
      

      </View>
      <TextInput
        value={editedData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        placeholder="Email"
      />
      <TextInput
        value={editedData.username}
        onChangeText={(value) => handleInputChange("username", value)}
        placeholder="Username"
      />
      <TextInput
        value={editedData.number}
        onChangeText={(value) => handleInputChange("number", value)}
        placeholder="Phone Number"
        />
      <TextInput
        value={editedData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Save" onPress={handleSubmit} />
    </MainView>
  );
};

export default ProfilePage;


