import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { colors } from "../../../../assets/colors";
import CustomInput from "../components/CustomInput";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
const MainView = styled.View`

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const AddGameBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    padding: 0 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 30px 0;
`;

const AddGame = () => {
    const [name, setName] = useState("");
    const [nb, setNb] = useState(0);
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
   

      
      
    const onChangeDate = ( DateTimePickerAndroid, selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
    };

    const handleSubmit = async () => {
        try {
            if (!name || !nb || !location || !date) {
                return Alert.alert("Warning", "please fill all the fields");
            }
            const response = await axios.post("/event", {
                name,
                nb_participants: nb,
                location,
                participants: ["63c12eec2c0ce24910675463"],
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(date);
    }, [date]);
    return (
        <MainView>
            <Text>AddGame</Text>
            <CustomInput name="Name" value={name} onChangeText={setName} />
            <CustomInput
                name="Number of players"
                value={nb}
                onChangeText={setNb}
            />

            <Text>Date</Text>
            <DateTimePicker value={new Date()} />
            <>
                <TouchableOpacity title="Open" onPress={() => setOpen(true)}>
                    <Text>open date</Text>
                </TouchableOpacity>
                {open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                    />
                )}
            </>

            <CustomInput
                name="Location"
                value={location}
                onChangeText={setLocation}
            />
            <AddGameBtn onPress={handleSubmit}>
                <Text>Add AddGameBtn</Text>
            </AddGameBtn>
            
        </MainView>
    );
};

export default AddGame;
