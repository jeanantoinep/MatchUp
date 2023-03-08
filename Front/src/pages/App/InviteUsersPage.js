import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { colors } from "../../../assets/colors";

const MainView = styled.View`
    flex: 1;
    padding-top: 10px;
`;

const Divider = styled.View`
    border: 0.5px solid grey;
    width: 100%;
    height: 1px;
    margin: 10px auto;
`;

const InputView = styled.View`
    background-color: #99999918;
    padding: 16px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px;
    border-radius: 20px;
    border: 1px solid grey;
`;

const SearchInput = styled.TextInput`
    padding: 1px;
    font-size: 16px;
    width: 90%;
`;

const SearchResultView = styled.View`
    padding: 10px 10px;
    margin: 0 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ViewEventBtn = styled.TouchableOpacity`
    padding: 6px 18px;
    border-radius: 10px;
    background-color: ${colors.red};
    width: 25%;
`;

const ViewEventText = styled.Text`
    color: ${colors.white};
    text-align: center;
`;
const Empty = styled.View`
    margin: 120px auto;
`;

const InviteUsersPage = ({ route }) => {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [eventInvites, setEventInvites] = useState([]);

    const { event } = route.params;

    const sendInvite = async (receiver) => {
        try {
            const invite = {
                type: "invite",
                eventId: event._id,
                receiver: receiver,
            };
            const response = await axios.post("/invite", invite);
            if (response.status === 201) {
                showMessage({
                    message: "Your invite has been sent",
                    type: "success",
                });
            }
            fetchEventInvites();
        } catch (error) {
            console.log(error);
        }
    };

    const cancelInvite = async (inviteId) => {
        try {
            const response = await axios.put(`/invite/cancel/${inviteId}`);
            if (response.status === 200) {
                showMessage({
                    message: "Your invite has been cancelled",
                    type: "success",
                });
            }
            fetchEventInvites();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`/user?username=${input}`);
        setUsers(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (input === "") {
            setUsers([]);
            return;
        }
        const timer = setTimeout(() => fetchUsers(), 500);
        return () => clearTimeout(timer);
    }, [input]);

    const fetchEventInvites = async () => {
        try {
            const { data } = await axios.get(`/event/invite/${event._id}`);
            setEventInvites(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEventInvites();
    }, []);

    return (
        <MainView>
            <InputView>
                <Ionicons name="search" size={24} color="black" />
                <SearchInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Search a user"
                />
            </InputView>

            <FlatList
                data={users}
                ListEmptyComponent={() =>
                    isLoading ? (
                        <Empty>
                            <ActivityIndicator size={"large"} />
                        </Empty>
                    ) : input ? (
                        <Empty>
                            <Text>No users</Text>
                        </Empty>
                    ) : (
                        <></>
                    )
                }
                renderItem={({ item }) => {
                    const invite = eventInvites.find(
                        (el) =>
                            el.receiver === item._id || el.sender === item._id
                    );
                    return (
                        <>
                            <SearchResultView>
                                <Text style={{ fontSize: 16 }}>
                                    {item.username}
                                </Text>
                                <ViewEventBtn
                                    onPress={() => {
                                        invite
                                            ? cancelInvite(invite._id)
                                            : sendInvite(item._id);
                                    }}
                                >
                                    <ViewEventText
                                        style={invite && { color: "#990000" }}
                                    >
                                        {invite ? "Cancel" : "Invite"}
                                    </ViewEventText>
                                </ViewEventBtn>
                            </SearchResultView>
                            <Divider></Divider>
                        </>
                    );
                }}
            />
        </MainView>
    );
};

export default InviteUsersPage;
