import LoginScreen from '../screens/LoginScreen';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';

import CRUDUsers from '../screens/CRUDUsers';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateUser from '../screens/CRUDUsers/CreateUser';
import EditUser from '../screens/CRUDUsers/EditUser';




const Stack = createStackNavigator();

const NavigationHandler = (props) => {
    const { loginStore } = props
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            {loginStore.user.isSignedIn
                ? (
                    <Stack.Screen name="CRUDUsers" component={UserNavigation}></Stack.Screen>)
                : (<Stack.Screen name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Login', headerShown: false }}
                />)}
        </Stack.Navigator>
    )
}

const UserNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ReadUsers" screenOptions={({ route, navigation }) => ({
            headerRight: () => {
                return route.name === "ReadUsers" ? <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateUser')} name="add" size={25} color={"blue"}></Ionicons> : null

            }
        })}>
            <Stack.Screen name="ReadUsers" component={CRUDUsers}></Stack.Screen>
            <Stack.Screen name="CreateUser" component={CreateUser}></Stack.Screen>
            <Stack.Screen name="EditUser" component={EditUser}></Stack.Screen>
        </Stack.Navigator>
    )
}

export const Navigation = inject('loginStore')(observer(NavigationHandler));