/*
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import OnboardingScreen from "../Screens/OnboardingScreen";
import { NavigatorScreenParams } from "@react-navigation/native";
import TabsNavigator ,{ TabsStackParams } from "./TabsNavigator";


export type RootStackParams = {
  OnboardingScreen: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParams>;
};

const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;
const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
*/

import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import OnboardingScreen from "../Screens/OnboardingScreen"
import { NavigatorScreenParams } from "@react-navigation/native"
import TabsNavigator ,{ TabsStackParams } from "./TabsNavigator"
import productDetails from "../Screens/ProductDetails"
import UserAuth from "../Screens/LoginRegisterScreen";

export type RootStackParams = {
  OnboardingScreen: undefined
  TabsStack: NavigatorScreenParams<TabsStackParams>
  Deals: undefined
  //Cart: undefined
  Profile: undefined
  productDetails: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity: number
  }
  Cart?: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    color?: string;
    size?: string;
    quantity: number
  }
  UserLogin: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    screenTitle?: string;
  };
}

const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;
const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="productDetails"
        component={productDetails}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="UserLogin"
        component={UserAuth}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

export default RootNavigator;