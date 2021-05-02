import LoginScreen from '../screens/LoginScreen';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';

import CRUDUsers from '../screens/CRUDUsers';



const Stack = createStackNavigator();

const NavigationHandler = (props) => {
    const { loginStore } = props
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            {loginStore.user.isSignedIn
                ? (
                    <Stack.Screen name="CRUDUsers" component={CRUDUsers}></Stack.Screen>)
                : (<Stack.Screen name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Login', headerShown: false }}
                />)}
        </Stack.Navigator>
    )
}

export const Navigation = inject('loginStore')(observer(NavigationHandler));