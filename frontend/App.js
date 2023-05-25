import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import UnderBarButton from "./src/container/UnderBarButton";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import AddScreen from "./src/screens/AddScreen";
import MapScreen2 from "./src/screens/MapScreen2";
import PartyDetailScreen from "./src/screens/PartyDetailScreen";
import WishlistScreen from "./src/screens/WishlistScreen";
import ChatRoomScreen from "./src/screens/ChatRoomScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
// import { ChatProvider } from "./src/screens/ChatContext";
const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeSearchBar"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTab"
          component={UnderBarButton}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Map2"
          component={MapScreen2}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="PartyDetail"
          component={PartyDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="ChatRoomScreen"
          component={ChatRoomScreen}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        /> 

          


      </Stack.Navigator>
      
    </NavigationContainer>
  

);

export default App;
