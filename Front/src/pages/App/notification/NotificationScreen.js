import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "../../../../assets/colors";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";

const InviteView = styled.View`
    padding: 20px;
`;

const Divider = styled.View`
    border: 1px solid grey;
    width: 100%;
    height: 1px;
    margin: 0 auto;
`;

const InviteBtn = styled.TouchableOpacity`
    padding: 6px 18px;
    border-radius: 10px;
    background-color: ${colors.red};
    width: 30%;
    margin-right: 5px;
`;

const InviteBtnText = styled.Text`
    color: ${colors.white};
    text-align: center;
`;
const ActionsView = styled.View`
    display: flex;
    flex-direction: row;
    margin: 10px 0 0 0;
`;
const InviteText = styled.Text`
    font-size: 16px;
`;

const Empty = styled.View`
    margin: 120px auto;
`;

const EmptyText = styled.Text``;

const NotificationScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [invites, setInvites] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchInvites = async () => {
        setIsLoading(true);
        const { data } = await axios.get("/invite/user");
        setInvites(data);
        setIsLoading(false);
        setIsRefreshing(false);
    };

    useEffect(() => {
        if (isFocused === true) {
            fetchInvites();
        }
    }, [isFocused]);

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
            <InviteBtn
                onPress={() =>
                    navigation.navigate("Games", {
                        screen: "EventPage",
                        params: { eventId: eventId },
                    })
                }
            >
                <InviteBtnText>See game</InviteBtnText>
            </InviteBtn>
        );
    };

    const renderInvite = (item) => {
        const { sender, eventId, type, status } = item;
        return (
            <>
                <InviteView>
                    <InviteText>
                        {item.type === "invite"
                            ? `${sender.username} has invited you to join their game ${eventId.name}`
                            : `${sender.username} has requested to join your game ${eventId.name}`}
                    </InviteText>
                    <ActionsView>
                        {renderSeeGameBtn(item.eventId._id)}
                        <InviteBtn onPress={() => acceptInvite(item)}>
                            <InviteBtnText>Accept</InviteBtnText>
                        </InviteBtn>
                        <InviteBtn onPress={() => declineInvite(item)}>
                            <InviteBtnText>Decline</InviteBtnText>
                        </InviteBtn>
                    </ActionsView>
                </InviteView>
                <Divider></Divider>
            </>
        );
    };

    return (
        !isLoading && (
            <FlatList
                data={invites}
                renderItem={({ item }) => {
                    return renderInvite(item);
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={fetchInvites}
                    />
                }
                scrollEnabled={true}
                ListEmptyComponent={() => (
                    <Empty>
                        <Text>You don't have any notifications.</Text>
                    </Empty>
                )}
            />
        )
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
