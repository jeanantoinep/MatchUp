import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;
