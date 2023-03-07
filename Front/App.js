// REDUX
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import axios from "axios";
// REACT-NAVIGATION
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/navigation/AuthStack";

import { useDispatch, useSelector } from "react-redux";
import AppStack from "./src/navigation/AppStack";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "./src/store/userSlice";

axios.defaults.baseURL = "http://192.168.1.35:3000";

const RootStack = () => {
    const userToken = useSelector((state) => state.user.userToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                dispatch(setUser(JSON.parse(userInfo)));
            }
        };
        getUser();
    }, []);

    axios.interceptors.request.use(
        (config) => {
            if (userToken) {
                config.headers = { Authorization: `Bearer ${userToken}` };
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    return (
        <NavigationContainer>
            {userToken ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <RootStack />
        </Provider>
    );
}
