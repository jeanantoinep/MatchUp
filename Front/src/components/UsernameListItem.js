import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components";

const ListView = styled.View`
    margin: 3px 0;
`;
const Username = styled.Text``;

const UsernameListItem = ({ username }) => {
    return (
        <ListView>
            <Username>{username}</Username>
        </ListView>
    );
};

export default UsernameListItem;

const styles = StyleSheet.create({});
