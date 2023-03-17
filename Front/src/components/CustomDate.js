import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components";

import displayDate from "../utils/displayDate";
import displayTime from "../utils/displayTime";

const DateView = styled.View`
    display: flex;
    align-items: center;
`;

const CustomDate = ({ startDate, endDate }) => {
    return (
        <DateView>
            <Text>{displayDate(startDate)}</Text>
            <Text>{displayTime(startDate, endDate)}</Text>
        </DateView>
    );
};

export default CustomDate;

const styles = StyleSheet.create({});
