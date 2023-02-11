import { View, Text, StyleSheet, Image} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../assets/colors";
import HomepageStack from "./HomepageStack";
import logo from "../../assets/logo.png";
import notification from "../../assets/notification.png";
import profile from "../../assets/profile.png";
import styled from "styled-components/native";

const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
    
  });
const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.blue,
                    height: 75,
                },
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen 
            options={{
                tabBarIcon: (props) => (
                    <View>
                        <Image 
                        style={styles.tinyLogo}
                        source={notification} />
                         
                    </View>
                 
                    
                ),
            }}
            
            
            name="Notifications">{() => < HomepageStack/>}
            



            </Tab.Screen> 


            <Tab.Screen
                options={{
                    tabBarIcon: (props) => (
                        <View>
                            <Image 
                            style={styles.tinyLogo}
                            source={logo} />
                             
                        </View>
                     
                        
                    ),
                }}
                name="Games"
            >
            
                {() => <HomepageStack />}
            </Tab.Screen>
            
            <Tab.Screen name="Profile"
            options={{
                tabBarIcon: (props) => (
                    <View>
                        <Image 
                        style={styles.tinyLogo}
                        source={profile} />
                         
                    </View>
                 
                    
                ),
            }}
            
            
            
            >{() => <Homepage />}
            
            </Tab.Screen> 
        </Tab.Navigator>
    );
};

export default AppStack;
