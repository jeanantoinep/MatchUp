import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../pages/App/profile/ProfilePage";

const Stack = createNativeStackNavigator();

const ProfilePageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profilepage">
                {() => <ProfilePage />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export default ProfilePageStack;
