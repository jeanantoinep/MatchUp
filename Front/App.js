import { StyleSheet, Text, View } from "react-native";

// REDUX
import { Provider } from "react-redux";
import { store } from "./src/store/store";

// REACT-NAVIGATION
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/pages/Auth/AuthStack";

const RootStack = () => {
    return (
        <NavigationContainer>
            <AuthStack />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#044593",
        alignItems: "center",
        justifyContent: "center",
    },
});
