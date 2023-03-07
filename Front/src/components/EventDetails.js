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
import displayDate from "../utils/displayDate";
import displayTime from "../utils/displayTime";

const Title = styled.Text`
    font-size: 28px;
    text-align: center;
    margin: 16px 0;
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

const EventDetails = ({ event }) => {
    return (
        <View>
            <FlatList
                data={event.participants}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.username}</Text>
                    </View>
                )}
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
                ListHeaderComponent={() => (
                    <>
                        <Title>{event.name}</Title>
                        <LineView>
                            <IconView>
                                <AntDesign
                                    name="user"
                                    size={24}
                                    color="black"
                                />
                            </IconView>
                            <Text>
                                Looking for :{" "}
                                {event.nb_participants -
                                    event.participants.length -
                                    1}{" "}
                                player(s)
                            </Text>
                        </LineView>
                        <LineView>
                            <IconView>
                                <AntDesign
                                    name="calendar"
                                    size={24}
                                    color="black"
                                />
                            </IconView>

                            <Text>
                                {displayDate(new Date(event.startDate))},{" "}
                                {displayTime(
                                    new Date(event.startDate),
                                    new Date(event.endDate)
                                )}
                            </Text>
                        </LineView>
                    </>
                )}
            />
        </View>
    );
};

export default EventDetails;

const styles = StyleSheet.create({});
