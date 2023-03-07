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
        console.log(data);
        setInvites(data);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchInvites();
    }, []);

    const acceptInvite = async (id) => {
        const response = await axios.put(`/invite/accept/${id}`);
        if (response.status === 200) {
            fetchInvites();
        }
    };

    const declineInvite = async (id) => {
        const response = await axios.put(`/invite/decline/${id}`);
        if (response.status === 200) {
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
            return renderAcceptedRequest(item);
        }
        return (
            <InviteView>
                <Text>{type}</Text>
                <Text>
                    {sender.username} has invited you to join their game{" "}
                    {eventId.name}
                </Text>
                <View>
                    {renderSeeGameBtn(item.eventId._id)}
                    <TouchableOpacity onPress={() => acceptInvite(_id)}>
                        <Text>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => declineInvite(_id)}>
                        <Text>Decline</Text>
                    </TouchableOpacity>
                </View>
            </InviteView>
        );
    };

    const renderRequest = (item) => {
        const { sender, eventId, type, status, _id } = item;
        if (status === "accepted") {
            return renderAcceptedRequest(item);
        }
        return (
            <InviteView>
                <Text>{type}</Text>
                <Text>
                    {sender.username} has requested to join your game{" "}
                    {eventId.name}
                </Text>
                <View>
                    {renderSeeGameBtn(item.eventId._id)}
                    <TouchableOpacity onPress={() => acceptInvite(_id)}>
                        <Text>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => declineInvite(_id)}>
                        <Text>Decline</Text>
                    </TouchableOpacity>
                </View>
            </InviteView>
        );
    };
    const renderAcceptedRequest = (item) => {
        const { sender, eventId, type } = item;
        if (type === "request") {
            return (
                <InviteView>
                    <Text>{item.type}</Text>
                    <Text>
                        You have accepted {sender.username} request to join your
                        game {eventId.name}
                    </Text>
                    {renderSeeGameBtn(item.eventId._id)}
                </InviteView>
            );
        } else if (type === "invite") {
            return (
                <InviteView>
                    <Text>{item.type}</Text>
                    <Text>
                        You have accepted {sender.username} invite to join their
                        game {eventId.name}
                    </Text>
                    {renderSeeGameBtn(item.eventId._id)}
                </InviteView>
            );
        }
    };

    return (
        !isLoading && (
            <FlatList
                data={invites}
                renderItem={({ item }) => {
                    return item.type === "request"
                        ? renderRequest(item)
                        : renderInvite(item);
                }}
            />
        )
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
