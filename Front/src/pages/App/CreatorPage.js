import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setEvent } from "../../store/eventSlice";
import EventDetails from "../../components/EventDetails";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const MainView = styled.View`
    padding: 20px;
    display: flex;
    align-items: center;
`;

const CreatorPage = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

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
                <FlatList
                    data={event.participants}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.username}</Text>
                        </View>
                    )}
                    ListHeaderComponent={() => <EventDetails event={event} />}
                    ListFooterComponent={() => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("InviteUsers", {
                                    event: event,
                                })
                            }
                        >
                            <Text>Invite users</Text>
                        </TouchableOpacity>
                    )}
                />
            </MainView>
        )
    );
};

export default CreatorPage;

const styles = StyleSheet.create({});
