import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/Auth/LoginScreen";
import RegisterScreen from "../pages/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
            <Stack.Screen name="Register">
                {() => <RegisterScreen />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;
