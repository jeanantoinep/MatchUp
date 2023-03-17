import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGame from "../pages/App/home/AddGame";
import EventPage from "../pages/App/home/EventPage";
import Homepage from "../pages/App/home/Homepage";
import CreatorPage from "../pages/App/home/CreatorPage";
import InviteUsersPage from "../pages/App/profile/InviteUsersPage";

const Stack = createNativeStackNavigator();

const HomepageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Homepage">{() => <Homepage />}</Stack.Screen>
            <Stack.Screen name="AddGame">{() => <AddGame />}</Stack.Screen>
            <Stack.Screen name="EventPage">
                {(props) => <EventPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="CreatorPage">
                {(props) => <CreatorPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="InviteUsers">
                {(props) => <InviteUsersPage {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
export default HomepageStack;
