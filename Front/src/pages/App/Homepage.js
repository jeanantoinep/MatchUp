import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SectionList,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../store/eventSlice";
import axios from "axios";
import Event from "../../components/Event";
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

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const userEvents = useSelector((state) => state.event.userEvents);
    const otherEvents = useSelector((state) => state.event.otherEvents);
    const userId = useSelector((state) => state.user.userInfo.userId);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get("/events");
                const user = [];
                const other = [];
                data.events.forEach((event) => {
                    if (
                        event.creator === userId ||
                        event.participants.includes(userId)
                    ) {
                        user.push(event);
                    } else {
                        other.push(event);
                    }
                });
                dispatch(setEvents({ userEvents: user, otherEvents: other }));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvents();
    }, [isFocused]);

    return (
        !isLoading && (
            <SectionList
                sections={[
                    { title: "Your games", data: userEvents, user: true },
                    { title: "Other games", data: otherEvents, user: false },
                ]}
                renderItem={({ item }) => <Event event={item} />}
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
            />
        )
    );
};

export default Homepage;
