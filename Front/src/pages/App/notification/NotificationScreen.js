import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "../../../../assets/colors";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

const InviteView = styled.View`
    padding: 20px;
    border: 1px solid ${colors.red};
`;

const NotificationScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const navigation = useNavigation();
    const fetchInvites = async () => {
        setIsLoading(true);
        const { data } = await axios.get("/invite/user");
        setInvites(data);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchInvites();
    }, []);

    const acceptInvite = async (item) => {
        const { sender, eventId, _id, type } = item;
        const response = await axios.put(`/invite/accept/${_id}`);
        if (response.status === 200) {
            showMessage({
                message:
                    type === "invite"
                        ? `You have accepted ${sender.username} invite to join their
                game ${eventId.name}`
                        : `You have accepted ${sender.username} request to join your
                game ${eventId.name}`,
                type: "success",
            });
            fetchInvites();
        }
    };

    const declineInvite = async (item) => {
        const { sender, eventId, _id, type } = item;
        const response = await axios.put(`/invite/decline/${_id}`);
        if (response.status === 200) {
            showMessage({
                message:
                    type === "invite"
                        ? `You have declined ${sender.username} invite to join their
                game ${eventId.name}`
                        : `You have declined ${sender.username} request to join your
                game ${eventId.name}`,
                type: "success",
            });
            fetchInvites();
        }
    };

    const renderSeeGameBtn = (eventId) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Games", {
                        screen: "EventPage",
                        params: { eventId: eventId },
                    })
                }
            >
                <Text>See game</Text>
            </TouchableOpacity>
        );
    };

    const renderInvite = (item) => {
        const { sender, eventId, type, status, _id } = item;
        if (status === "accepted") {
            return;
        }
        return (
            <InviteView>
                <Text>{type}</Text>
                <Text>
                    {item.type === "invite"
                        ? `${sender.username} has invited you to join their game ${eventId.name}`
                        : `${sender.username} has requested to join your game ${eventId.name}`}
                </Text>
                <View>
                    {renderSeeGameBtn(item.eventId._id)}
                    <TouchableOpacity onPress={() => acceptInvite(item)}>
                        <Text>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => declineInvite(item)}>
                        <Text>Decline</Text>
                    </TouchableOpacity>
                </View>
            </InviteView>
        );
    };

    return (
        !isLoading && (
            <FlatList
                data={invites}
                renderItem={({ item }) => {
                    return renderInvite(item);
                }}
            />
        )
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
