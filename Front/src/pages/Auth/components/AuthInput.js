import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../assets/colors";

const InputView = styled.View`
    width: 70%;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    /* border: 1px solid #b1a1a1; */
    background-color: ${colors.whiteFade};
    border-radius: 25px;
`;
const Input = styled.TextInput`
    padding: 16px;
    color: ${colors.blue};
    font-size: 16px;
`;
const Eye = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
`;

const AuthInput = ({
    value,
    onChangeText,
    placeholder = "",
    isPassword = false,
    keyboardType = "default",
    selectionColor = colors.red,
    placeHolderTextColor = colors.blueFade,
    autoCapitalize = "none",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputView>
            <Input
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={isPassword ? !showPassword : false}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                selectionColor={selectionColor}
                placeholderTextColor={placeHolderTextColor}
            />
            {isPassword && (
                <Eye onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <MaterialCommunityIcons
                            name="eye-off-outline"
                            size={28}
                            color={colors.blue}
                        />
                    ) : (
                        <MaterialCommunityIcons name="eye-outline" size={28} color={colors.blue} />
                    )}
                </Eye>
            )}
        </InputView>
    );
};

export default AuthInput;
