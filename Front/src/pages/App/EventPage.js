import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../../store/eventSlice";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import CustomDate from "../../components/CustomDate";
import { colors } from "../../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import displayDate from "../../utils/displayDate";
import displayTime from "../../utils/displayTime";

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
    margin: 16px 0;
`;

const ViewEventBtn = styled.TouchableOpacity`
    padding: 6px 18px;
    border-radius: 10px;
    background-color: ${colors.red};
`;

const ViewEventText = styled.Text`
    color: ${colors.white};
    text-align: center;
`;

const MainView = styled.View`
    padding: 20px;
    display: flex;
    align-items: center;
`;

const LineView = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const IconView = styled.View`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EventPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const { eventId } = route.params;
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.event);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const isAlreadyPart = (event, userId) => {
        return (
            event.participants.findIndex((el) => el._id === userId) >= 0 ||
            event.creator._id === userId
        );
    };

    const requestJoin = async () => {
        const invite = {
            type: "request",
            eventId: eventId,
            receiver: event.creator,
        };
        const response = await axios.post(`/invite`, invite);
        if (response.status === 201) {
            console.log("Your request has been sent");
        }
    };

    const hasAlreadyRequested = () => {
        return (
            invites.findIndex(
                (invite) =>
                    invite.type === "request" && invite.sender === userId
            ) >= 0
        );
    };

    useEffect(() => {
        const fetchEvent = async () => {
            const { data } = await axios.get(`/event/${eventId}`);
            dispatch(setEvent({ event: data.event }));
        };
        const fetchInvites = async () => {
            const { data } = await axios.get(`/event/invite/${eventId}`);
            setInvites(data);
            console.log(data);
        };
        fetchEvent();
        fetchInvites();
        setIsLoading(false);
    }, []);

    return (
        !isLoading && (
            <MainView>
                <Title>{event.name}</Title>
                <LineView>
                    <IconView>
                        <AntDesign name="user" size={24} color="black" />
                    </IconView>
                    <Text>
                        Looking for :{" "}
                        {event.nb_participants - event.participants.length - 1}{" "}
                        player(s)
                    </Text>
                </LineView>
                <LineView>
                    <IconView>
                        <AntDesign name="calendar" size={24} color="black" />
                    </IconView>

                    <Text>
                        {displayDate(new Date(event.startDate))},{" "}
                        {displayTime(
                            new Date(event.startDate),
                            new Date(event.endDate)
                        )}
                    </Text>
                </LineView>
                {hasAlreadyRequested() ? (
                    <Text>You have already requested to join this event</Text>
                ) : (
                    <ViewEventBtn onPress={requestJoin}>
                        <ViewEventText>Ask to Join</ViewEventText>
                    </ViewEventBtn>
                )}
            </MainView>
        )
    );
};

export default EventPage;

const styles = StyleSheet.create({});
