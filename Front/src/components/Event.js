import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import CustomDate from "./CustomDate";
import { colors } from "../../assets/colors";
import { useSelector } from "react-redux";
const EventView = styled.View`
    padding: 10px 20px;
    width: 100%;
    margin-bottom: 10px;
`;

const Divider = styled.View`
    border: 1px solid grey;
    width: 100%;
    height: 1px;
    margin: 20px auto;
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

const ViewEventBtn = styled.TouchableOpacity`
    padding: 6px 18px;
    border-radius: 10px;
    background-color: ${colors.red};
`;

const ViewEventText = styled.Text`
    color: ${colors.white};
`;

const Event = ({ event }) => {
    const navigation = useNavigation();
    const userId = useSelector((state) => state.user.userInfo.userId);
    const handlePress = () => {
        userId === event.creator
            ? navigation.navigate("CreatorPage", { eventId: event._id })
            : navigation.navigate("EventPage", { eventId: event._id });
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
                <Text>{`${event.participants.length + 1} / ${
                    event.nb_participants
                }`}</Text>
                <ViewEventBtn onPress={handlePress}>
                    <ViewEventText>View</ViewEventText>
                </ViewEventBtn>
            </EventBody>
            <Divider></Divider>
        </EventView>
    );
};

export default Event;

const styles = StyleSheet.create({});
