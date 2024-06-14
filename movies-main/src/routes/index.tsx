import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabRoutes } from "./tabs.routes";
import Login from "../screens/Login/Login";
import Cadastro from "../screens/Cadastro/Cadastro";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelecionarPlano from "../components/SelecionarPlano";
import PagamentoFicticio from "../components/Pagamento";
import ForgotPassword from "../screens/EsqueceuASenha";

const Stack = createNativeStackNavigator();

export function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
      } catch (error) {
        console.error('Erro ao verificar status de login:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabRoutes}
          options={{ headerShown: false }}
        />
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelecionarPlano"
            component={SelecionarPlano}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PagamentoFicticio"
            component={PagamentoFicticio}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}