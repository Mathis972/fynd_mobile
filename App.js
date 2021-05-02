import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './navigation/Navigation'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'mobx-react';
import { loginStore } from "./store/LoginStore"




export default function App() {
  const stores = { loginStore }
  return (
    <Provider {...stores}>

      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>

  );
}
