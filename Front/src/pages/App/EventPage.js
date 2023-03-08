import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
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
import UsernameListItem from "../../components/UsernameListItem";

const ViewEventBtn = styled.TouchableOpacity`
    padding: 6px 18px;
    border-radius: 10px;
    background-color: ${colors.red};
    width: 50%;
`;

const ViewEventText = styled.Text`
    color: ${colors.white};
    text-align: center;
`;

const MainView = styled.View`
    padding: 16px;
    display: flex;
    align-items: center;
`;

const ActionView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
`;

const EventPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const [userInvite, setUserInvite] = useState(null);
    const { eventId } = route.params;
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.event);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const isAlreadyPart = () => {
        return event.participants.some((el) => el._id === userId);
    };

    const requestJoin = async () => {
        const invite = {
            type: "request",
            eventId: eventId,
            receiver: event.creator._id,
        };
        const response = await axios.post(`/invite`, invite);
        if (response.status === 201) {
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

    const leaveGame = async () => {
        const response = await axios.post(`/event/leave/${event._id}`);
        if (response.status === 200) {
            showMessage({
                message: "You are no longer participating in this game",
                type: "success",
            });
            fetchEvent();
        }
    };

    const fetchInvites = async () => {
        const { data } = await axios.get(`/event/invite/${eventId}`);
        console.log(data);
        console.log(userId);
        setInvites(data);
        const isUserInvite = data.find(
            (invite) => invite.type === "request" && invite.sender === userId
        );
        console.log(isUserInvite);
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
    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        !isLoading && (
            <MainView>
                <FlatList
                    data={[event.creator, ...event.participants]}
                    renderItem={({ item }) => (
                        <UsernameListItem username={item.username} />
                    )}
                    ListHeaderComponent={() => <EventDetails event={event} />}
                    ListFooterComponent={() => (
                        <ActionView>
                            {isAlreadyPart() ? (
                                <ViewEventBtn onPress={leaveGame}>
                                    <ViewEventText>Leave game</ViewEventText>
                                </ViewEventBtn>
                            ) : userInvite ? (
                                <ViewEventBtn onPress={cancelRequest}>
                                    <ViewEventText>
                                        Cancel request
                                    </ViewEventText>
                                </ViewEventBtn>
                            ) : (
                                <ViewEventBtn onPress={requestJoin}>
                                    <ViewEventText>Ask to Join</ViewEventText>
                                </ViewEventBtn>
                            )}
                        </ActionView>
                    )}
                />
            </MainView>
        )
    );
};

export default EventPage;

const styles = StyleSheet.create({});
