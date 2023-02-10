import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomDate = ({ startDate, endDate }) => {
    const displayDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    const displayTime = (start, end) => {
        return `${start.getHours()}:${start.getMinutes()} - ${end.getHours()}:${end.getMinutes()}`;
    };
    return (
        <View>
            <Text>{displayDate(startDate)}</Text>
            <Text>{displayTime(startDate, endDate)}</Text>
        </View>
    );
};

export default CustomDate;

const styles = StyleSheet.create({});
