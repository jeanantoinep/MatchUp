import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import displayDate from "../utils/displayDate";
import displayTime from "../utils/displayTime";
import { useNavigation } from "@react-navigation/native";

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
    margin: 10px 0;
`;

const LineView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
`;

const IconView = styled.View`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LineText = styled.Text`
    width: 80%;
`;

const ListHeaderView = styled.View`
    margin: 20px 0 10px 0;
`;

const ListHeaderText = styled.Text`
    font-size: 18px;
`;

const DescriptionView = styled.View`
    margin: 16px 0;
`;

const DescriptionText = styled.Text``;

const EventDetails = ({ event }) => {
    return (
        <>
            <View>
                <Title>{event.name}</Title>

                <LineView>
                    <IconView>
                        <AntDesign name="user" size={24} color="black" />
                    </IconView>
                    <LineText>{event.creator.username}</LineText>
                </LineView>
                <LineView>
                    <IconView>
                        <FontAwesome5 name="users" size={20} color="black" />
                    </IconView>
                    <LineText>
                        Looking for :{" "}
                        {event.nb_participants - event.participants.length - 1}{" "}
                        player(s)
                    </LineText>
                </LineView>
                <LineView>
                    <IconView>
                        <Entypo name="location-pin" size={24} color="black" />
                    </IconView>
                    <LineText>UrbanSoccer {event.location.location}</LineText>
                </LineView>
                <LineView>
                    <IconView>
                        <AntDesign name="calendar" size={24} color="black" />
                    </IconView>

                    <LineText>
                        {displayDate(new Date(event.startDate))},{" "}
                        {displayTime(
                            new Date(event.startDate),
                            new Date(event.endDate)
                        )}
                    </LineText>
                </LineView>
                {event.description && (
                    <DescriptionView>
                        <DescriptionText>{event.description}</DescriptionText>
                    </DescriptionView>
                )}
            </View>
            <ListHeaderView>
                <ListHeaderText>Participants : </ListHeaderText>
            </ListHeaderView>
        </>
    );
};

export default EventDetails;

const styles = StyleSheet.create({});
