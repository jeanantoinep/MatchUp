import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const InputContainerView = styled.View`
    width: 70%;
`;
const InputView = styled.View`
    margin: 18px 0;
    display: flex;
    justify-content: center;
    border: 1px solid #b1a1a1;
    border-radius: 15px;
`;

const TextInputStyled = styled.TextInput`
    padding: 16px;
    font-size: 16px;
`;

const CustomInput = ({ name, value, onChangeText }) => {
    return (
        <InputContainerView>
            <Text>{name}</Text>
            <InputView>
                <TextInputStyled value={value} onChangeText={onChangeText} />
            </InputView>
        </InputContainerView>
    );
};

export default CustomInput;
