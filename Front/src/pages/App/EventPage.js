import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../../store/eventSlice";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../assets/colors";

import EventDetails from "../../components/EventDetails";
import { showMessage } from "react-native-flash-message";

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

const EventPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const [userInvite, setUserInvite] = useState(null);
    const { eventId } = route.params;
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.event);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const requestJoin = async () => {
        const invite = {
            type: "request",
            eventId: eventId,
            receiver: event.creator,
        };
        const response = await axios.post(`/invite`, invite);
        if (response.status === 201) {
            console.log();
            showMessage({
                message: "Your request has been sent",
                type: "success",
            });
        }
        setUserInvite(response.data.newInvite);
    };

    const cancelRequest = async () => {
        const response = await axios.put(`/invite/cancel/${userInvite._id}`);
        if (response.status === 200) {
            showMessage({
                message: "Your request has been cancelled",
                type: "success",
            });
        }
        setUserInvite(null);
    };

    useEffect(() => {
        const fetchInvites = async () => {
            const { data } = await axios.get(`/event/invite/${eventId}`);
            setInvites(data);
            const isUserInvite = data.find(
                (invite) =>
                    invite.type === "request" && invite.sender === userId
            );
            if (isUserInvite) {
                setUserInvite(isUserInvite);
            }
        };
        const fetchEvent = async () => {
            const { data } = await axios.get(`/event/${eventId}`);
            dispatch(setEvent({ event: data.event }));
            fetchInvites();
            setIsLoading(false);
        };
        fetchEvent();
    }, []);

    return (
        !isLoading && (
            <MainView>
                <EventDetails event={event} />
                {userInvite ? (
                    <ViewEventBtn onPress={cancelRequest}>
                        <ViewEventText>Cancel request</ViewEventText>
                    </ViewEventBtn>
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
