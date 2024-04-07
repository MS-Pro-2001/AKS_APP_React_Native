import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ViewPropTypes from "deprecated-react-native-prop-types";

import { createStackNavigator } from "@react-navigation/stack";
// import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import SignInPage from "./src/pages/SignInPage";
// import SignUpPage from "./src/pages/SignUpPage";
import OtpLoginPage, { VerifyOtpPage } from "./src/pages/OtpLoginPage";
import OfficeBearers from "./src/pages/OfficeBearers";
import WardComittee from "./src/pages/WardComittee";
import Directory from "./src/pages/Directory";

import { createDrawerNavigator } from "@react-navigation/drawer";
// import UserDetailPage from './src/pages/UserDetailPage';
// import UpdateUserDetails from './src/pages/UpdateUserDetails';

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import LogOutPage from "./src/pages/LogOutPage";
import Wards from "./src/pages/Wards";
import UserDetailPage from "./src/pages/UserDetailPage";
// import CustomDialog from './src/components/CustomDialog';

import { UserContext } from "./src/ContextApi/ContextApi";
import UserLocationMap from "./src/components/UserLocationMap";
import SignUpPage from "./src/pages/SignUpPage";
import AddPinPage from "./src/pages/AddPinPage";
import LoginUsingMPin from "./src/pages/LoginUsingMPin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MembersDetailPage from "./src/pages/MembersDetailPage";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        options={{ headerShown: true }}
        component={TabsNavigator}
      />
      <Drawer.Screen name="Profile" component={UserDetailPage} />
      <Drawer.Screen name="Set up 4-digit PIN" component={AddPinPage} />

      {/* <Drawer.Screen name="Update Details" component={UpdateUserDetails} /> */}

      {/* <Drawer.Screen options={{ headerShown: false, }} name="LogoutPage" component={LogOutPage} /> */}
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
        name="Ward"
        component={Wards}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-account"
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "#213190",
        }}
        name="Office Bearers"
        component={OfficeBearers}
      />
      {/* 
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
          headerShown: true,
        }}
        name="Logout"
        component={LogOutPage}
      /> */}
    </Tab.Navigator>
  );
}

function WardTabsNavigator({ route }) {
  const { userWard } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "#213190",
          headerTitle: `${userWard}`,
        }}
        name="Directory"
        component={Directory}
        initialParams={{ userWard }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "#213190",
          headerTitle: `${userWard}`,
        }}
        name="Ward Comittee"
        component={WardComittee}
        initialParams={{ userWard }}
      />
    </Tab.Navigator>
  );
}

function StackNavigatorTab() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isMPinSet, setisMPinSet] = useState(false);

  const checkMPinStatus = async () => {
    console.log("helllooooooo");
    try {
      const mpinStatus = await AsyncStorage.getItem("mpin");
      console.log(mpinStatus);
      if (mpinStatus) {
        setisMPinSet(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  checkMPinStatus();
  console.log(!isUserLoggedIn && isMPinSet);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      <Stack.Navigator>
        {!isUserLoggedIn && isMPinSet ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="MpinLogin"
            component={LoginUsingMPin}
          />
        ) : (
          <>
            {!isUserLoggedIn && (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={OtpLoginPage}
              />
            )}
          </>
        )}

        {!isUserLoggedIn && (
          <Stack.Screen
            name="SignUpPage"
            options={{
              headerShown: false,
            }}
            component={SignUpPage}
          />
        )}

        {isUserLoggedIn && (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomePage"
              component={MyDrawer}
            />
            <Stack.Screen
              options={{ headerShown: true, title: "" }}
              name="WardPage"
              component={Wards}
            />
            <Stack.Screen
              options={{ headerShown: true, title: "Ward" }}
              name="WardTabsNavigator"
              component={WardTabsNavigator}
            />
            <Stack.Screen name="UserDetailPage" component={UserDetailPage} />
            <Stack.Screen
              name="MembersDetailPage"
              component={MembersDetailPage}
            />

            {/* <Stack.Screen options={{ headerShown: true, title: 'Ward' }} name="userDetailPage" component={UserDetailPage} /> */}
          </>
        )}
        {/* <Stack.Screen options={{ headerShown: true, title: 'Home' }} name="HomePage" component={TabsNavigator} /> */}

        {/* <Stack.Screen options={{ headerShown: false }} name="VerifyOtp" component={VerifyOtpPage} /> */}

        {/* <Stack.Screen options={{ headerShown: false }} name="SignInPage" component={SignInPage} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="SignUpPage" component={SignUpPage} /> */}
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StackNavigatorTab />
      {/* <CustomDialog /> */}
    </NavigationContainer>
  );
}

export default App;
