import { StyleSheet, Text, View } from "react-native";

// REDUX
import { Provider } from "react-redux";
import { store } from "./src/store/store";

// REACT-NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Create stack
const Stack = createNativeStackNavigator();

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>LOGIN PAGE</Text>
        </View>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
        </Stack.Navigator>
    );
};

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
