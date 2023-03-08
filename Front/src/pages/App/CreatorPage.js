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
import { colors } from "../../../assets/colors";
import UsernameListItem from "../../components/UsernameListItem";

const MainView = styled.View`
    padding: 20px;
    display: flex;
    align-items: center;
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

const ActionView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
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
                    data={[event.creator, ...event.participants]}
                    renderItem={({ item }) => (
                        <UsernameListItem username={item.username} />
                    )}
                    ListHeaderComponent={() => <EventDetails event={event} />}
                    ListFooterComponent={() => (
                        <ActionView>
                            <ViewEventBtn
                                onPress={() =>
                                    navigation.navigate("InviteUsers", {
                                        event: event,
                                    })
                                }
                            >
                                <ViewEventText>Invite users</ViewEventText>
                            </ViewEventBtn>
                        </ActionView>
                    )}
                />
            </MainView>
        )
    );
};

export default CreatorPage;

const styles = StyleSheet.create({});
