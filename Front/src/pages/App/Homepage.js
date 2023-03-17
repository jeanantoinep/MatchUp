import { View, Text, SectionList, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../store/eventSlice";
import axios from "axios";
import EventCard from "../../components/EventCard";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../assets/colors";
import { useIsFocused } from "@react-navigation/native";

const MainView = styled.View`
    width: 100%;
    padding: 20px;

    border: 1px solid red;
    display: flex;
`;

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
    margin: 16px 0;
`;

const AddGameBtn = styled.TouchableOpacity`
    margin: 0 auto;
    padding: 10px;
`;

const NoContentView = styled.View`
    margin: 0 auto;
`;

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const userEvents = useSelector((state) => state.event.userEvents);
    const participatingEvents = useSelector(
        (state) => state.event.participatingEvents
    );
    const otherEvents = useSelector((state) => state.event.otherEvents);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const isFocused = useIsFocused();

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("/events");
            const user = [];
            const participating = [];
            const other = [];
            data.events.forEach((event) => {
                if (event.creator === userId) {
                    user.push(event);
                } else if (event.participants.some((el) => el === userId)) {
                    participating.push(event);
                } else {
                    other.push(event);
                }
            });
            dispatch(
                setEvents({
                    userEvents: user,
                    otherEvents: other,
                    participatingEvents: participating,
                })
            );
            setIsLoading(false);
            setIsRefreshing(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isFocused === true) {
            fetchEvents();
        }
    }, [isFocused]);

    return (
        !isLoading && (
            <SectionList
                sections={[
                    { title: "Your Games", data: userEvents, user: true },
                    {
                        title: "Joined Games",
                        data: participatingEvents,
                        user: false,
                    },
                    { title: "Other games", data: otherEvents, user: false },
                ]}
                renderItem={({ item }) => <EventCard event={item} />}
                renderSectionFooter={({ section }) => {
                    if (section.data.length === 0) {
                        let text = "";
                        if (section.title === "Your Games") {
                            text = "Create a game to invite your friends !";
                        } else if (section.title === "Joined Games") {
                            text = "You have not joined any game yet...";
                        }
                        return (
                            <NoContentView>
                                <Text>{text}</Text>
                            </NoContentView>
                        );
                    }
                }}
                renderSectionHeader={({ section: { title, user } }) => (
                    <View>
                        <Title>{title}</Title>
                        {user && (
                            <AddGameBtn
                                onPress={() => navigation.navigate("AddGame")}
                            >
                                <AntDesign
                                    name="pluscircle"
                                    size={40}
                                    color={colors.red}
                                />
                            </AddGameBtn>
                        )}
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={fetchEvents}
                    />
                }
            />
        )
    );
};

export default Homepage;
