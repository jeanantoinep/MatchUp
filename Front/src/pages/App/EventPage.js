import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../../store/eventSlice";
import axios from "axios";
import { useState } from "react";

const EventPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { eventId } = route.params;
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.event);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const isAlreadyPart = (event, userId) => {
        return event.participants.includes(userId) || event.creator === userId;
    };
    const joinEvent = async () => {
        const response = await axios.post(`/event/${eventId}/join`);
        if (response.status === 200) {
            console.log("Registered successfully");
        }
    };
    useEffect(() => {
        const fetchEvent = async () => {
            const { data } = await axios.get(`/event/${eventId}`);
            dispatch(setEvent({ event: data.event }));
            console.log(data);
            setIsLoading(false);
        };
        fetchEvent();
        console.log(eventId);
    }, []);
    return (
        !isLoading && (
            <View>
                <Text>EventPage</Text>
                {!isAlreadyPart(event, userId) && (
                    <TouchableOpacity onPress={joinEvent}>
                        <Text>Join</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    );
};

export default EventPage;

const styles = StyleSheet.create({});
