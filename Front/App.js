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
import FlashMessage from "react-native-flash-message";

axios.defaults.baseURL = process.env.API_URL;

const RootStack = () => {
    const userToken = useSelector((state) => state.user.userToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const userInfo = await AsyncStorage.getItem("userInfo");
            if (userInfo) {
                console.log(userInfo);
                dispatch(setUser(JSON.parse(userInfo)));
            }
        };
        getUser();
    }, []);

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
            <FlashMessage position={"bottom"} />
        </Provider>
    );
}
