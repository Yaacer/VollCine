import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkSimple, Hourglass, House, MagnifyingGlass, User } from "phosphor-react-native";
import { Home } from "../screens/Home";
import { MyList } from "../screens/MyList";
import Perfil from "../screens/Perfil";
import Principal from "../screens/Principal";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name='Principal'
        component={Principal}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={30} weight="light" />,
        }}
      />
      <Screen
        name='MainHome'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <MagnifyingGlass color={color} size={30} weight="light" />,
        }}
      />
      <Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => <BookmarkSimple color={color} size={30} weight="light" />,
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={30} weight="light" />,
        }}
      />
      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}