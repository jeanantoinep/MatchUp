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

const MainView = styled.View`
    flex: 1;
    padding-top: 10px;
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
    padding: 16px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const InviteUsersPage = ({ route }) => {
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [eventInvites, setEventInvites] = useState([]);

    // const navigation = useNavigation();
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
                console.log("Your request has been sent");
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
                console.log("Your invite has been cancelled");
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
                        <ActivityIndicator />
                    ) : input ? (
                        <View>
                            <Text>No users</Text>
                        </View>
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
                        <SearchResultView>
                            <Text>{item.username}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    invite
                                        ? cancelInvite(invite._id)
                                        : sendInvite(item._id);
                                }}
                            >
                                <Text style={invite && { color: "#990000" }}>
                                    {invite ? "cancel" : "invite"}
                                </Text>
                            </TouchableOpacity>
                        </SearchResultView>
                    );
                }}
            />
        </MainView>
    );
};

export default InviteUsersPage;
