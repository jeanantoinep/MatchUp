import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const refreshAccesstoken = async () => {
    try {
        const refresh_token = await AsyncStorage.getItem("refreshToken");
        const response = await axios.post("/refresh_token", { refresh_token });
        return response.data.token;
    } catch (error) {
        if (
            error.response.status === 401 &&
            error.response.data.error === "Refresh token is expired"
        ) {
            return null;
        }
    }
};
