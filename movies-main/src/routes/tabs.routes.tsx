import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkSimple, House, MagnifyingGlass, User } from "phosphor-react-native";
import MainHome from "../screens/Home/index";
import { MyList } from "../screens/MyList/index";
import Perfil from "../screens/Perfil/index";
import { Details } from "../screens/Details/index";
import { Search } from "../screens/Search/index";
import { ActorDetails } from "../screens/DetalheAtor";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          borderTopWidth: 1,
          borderTopColor: "#C3130F",
        },
        headerShown: false,
        tabBarActiveTintColor: "#C3130F",
        tabBarInactiveTintColor: "#FFF",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='MainHome'
        component={MainHome}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={30} weight="light" />,
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <MagnifyingGlass color={color} size={30} weight="light" />,
        }}
      />
      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => <BookmarkSimple color={color} size={30} weight="light" />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={30} weight="light" />,
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="ActorDetails"
        component={ActorDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}