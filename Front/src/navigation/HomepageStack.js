import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGame from "../pages/App/AddGame";
import EventPage from "../pages/App/EventPage";
import Homepage from "../pages/App/Homepage";

const Stack = createNativeStackNavigator();

const HomepageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Homepage">{() => <Homepage />}</Stack.Screen>
            <Stack.Screen name="AddGame">{() => <AddGame />}</Stack.Screen>
            <Stack.Screen name="EventPage">
                {(props) => <EventPage {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default HomepageStack;
