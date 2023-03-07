import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setEvent } from "../../store/eventSlice";
import EventDetails from "../../components/EventDetails";
import styled from "styled-components";

const MainView = styled.View`
    padding: 20px;
    display: flex;
    align-items: center;
`;

const CreatorPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const { eventId } = route.params;
    const event = useSelector((state) => state.event.event);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`/event/${eventId}`);
                dispatch(setEvent({ event: data.event }));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEvent();
    }, []);

    return (
        !isLoading && (
            <MainView>
                <EventDetails event={event} />
            </MainView>
        )
    );
};

export default CreatorPage;

const styles = StyleSheet.create({});
