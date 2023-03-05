import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../pages/App/notification/NotificationScreen";

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notification">
                {() => <NotificationScreen />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export default NotificationStack;
