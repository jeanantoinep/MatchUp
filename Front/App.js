// REDUX
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import axios from "axios";
// REACT-NAVIGATION
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/pages/Auth/AuthStack";

axios.defaults.baseURL = "http://localhost:3000";

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
