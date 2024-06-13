import { StatusBar } from "expo-status-bar";
import React from "react";
import { Routes } from "./src/routes";
import { MovieProvider } from "./src/contexts/MoviesContext";
import { NativeBaseProvider } from 'native-base';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <MovieProvider>
        <NativeBaseProvider>
          <Routes />
          <Toast />
          <StatusBar style="light" translucent backgroundColor="#242a32" />
        </NativeBaseProvider>
      </MovieProvider>
    </>
  );
}
