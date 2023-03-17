import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { colors } from "../../../../assets/colors";
import CustomInput from "../../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

const DateInput = styled.TouchableOpacity`
    margin: 18px 0;
    width: 100%;
    border: 1px solid #b1a1a1;
    border-radius: 15px;
    padding: 16px;
`;
const DateView = styled.View`
    width: 70%;
`;
const TimeHalfView = styled.View`
    width: 48%;
`;

const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 70%;
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

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});

const AddGame = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [nb, setNb] = useState(0);
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [openStartTime, setOpenStartTime] = useState(false);
    const [openEndTime, setOpenEndTime] = useState(false);

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString().slice(0, -3);
    };

    const onChangeDate = (event, selectedDate) => {
        const startDate = startTime;
        startDate.setDate(selectedDate.getDate());
        startDate.setMonth(selectedDate.getMonth());
        startDate.setYear(selectedDate.getFullYear());

        const endDate = endTime;
        endDate.setDate(selectedDate.getDate());
        endDate.setMonth(selectedDate.getMonth());
        endDate.setYear(selectedDate.getFullYear());

        setStartTime(startDate);
        setEndTime(endDate);
        setOpenDate(false);
    };

    const onChangeStartTime = (event, selectedTime, state) => {
        if (state === "start") {
            const time = selectedTime.getTime();
            const newDate = startTime;
            newDate.setTime(time);
            setStartTime(newDate);
            setOpenStartTime(false);
        } else if (state === "end") {
            const time = selectedTime.getTime();
            const newDate = endTime;
            newDate.setTime(time);
            if (newDate.getTime() < startTime.getTime()) {
                console.log("error");
            }
            setEndTime(newDate);
            setOpenEndTime(false);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log(startTime, endTime);
            if (!name || !nb || !location || !startTime || !endTime) {
                return Alert.alert("Warning", "please fill all the fields");
            }
            const response = await axios.post("/event", {
                name,
                nb_participants: nb,
                location,
                participants: [],
                startDate: startTime,
                endDate: endTime,
            });
            console.log(response.data);
            navigation.navigate("Homepage");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainView}>
            <Text>AddGame</Text>
            <CustomInput name="Name" value={name} onChangeText={setName} />
            <CustomInput
                name="Number of players"
                value={nb}
                onChangeText={setNb}
            />

            <DateView>
                <Text>Date</Text>
                <DateInput title="Open" onPress={() => setOpenDate(true)}>
                    <Text>{formatDate(startTime)}</Text>
                </DateInput>
                {openDate && (
                    <DateTimePicker
                        value={startTime}
                        mode="date"
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                    />
                )}
            </DateView>
            <TimeView>
                <TimeHalfView>
                    <Text>Start time</Text>
                    <DateInput onPress={() => setOpenStartTime(true)}>
                        <Text>{formatTime(startTime)}</Text>
                    </DateInput>
                    {openStartTime && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            onChange={(event, selectedTime) =>
                                onChangeStartTime(event, selectedTime, "start")
                            }
                            minimumDate={new Date()}
                        />
                    )}
                </TimeHalfView>
                <TimeHalfView>
                    <Text>End time</Text>
                    <DateInput onPress={() => setOpenEndTime(true)}>
                        <Text>{formatTime(endTime)}</Text>
                    </DateInput>
                    {openEndTime && (
                        <DateTimePicker
                            value={endTime}
                            mode="time"
                            onChange={(event, selectedTime) =>
                                onChangeStartTime(event, selectedTime, "end")
                            }
                            minimumDate={new Date()}
                        />
                    )}
                </TimeHalfView>
            </TimeView>

            <CustomInput
                name="Location"
                value={location}
                onChangeText={setLocation}
            />
            <AddGameBtn onPress={handleSubmit}>
                <Text>Confirm Game</Text>
            </AddGameBtn>
        </KeyboardAwareScrollView>
    );
};

export default AddGame;
