import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGame from "../pages/App/screens/AddGame";
import Homepage from "../pages/App/screens/Homepage";

const Stack = createNativeStackNavigator();
const HomepageStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Homepage">{() => <Homepage />}</Stack.Screen>
            <Stack.Screen name="AddGame">{() => <AddGame />}</Stack.Screen>
        </Stack.Navigator>
    );
};

export default HomepageStack;
