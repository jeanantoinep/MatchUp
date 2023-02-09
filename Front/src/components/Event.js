import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import CustomDate from "./CustomDate";

const EventView = styled.View`
    border: 1px solid black;
    padding: 10px 20px;
    width: 100%;
    margin-bottom: 10px;
`;

const EventHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
`;
const EventBody = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Event = ({ event }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("EventPage", { eventId: event._id });
    };
    return (
        <EventView>
            <EventHeader>
                <Text>{event.name}</Text>
                <CustomDate
                    startDate={new Date(event.startDate)}
                    endDate={new Date(event.endDate)}
                />
            </EventHeader>
            <EventBody>
                <Text>{event.location}</Text>
                <Text>{event.nb_participants}</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text>View</Text>
                </TouchableOpacity>
            </EventBody>
        </EventView>
    );
};

export default Event;

const styles = StyleSheet.create({});
