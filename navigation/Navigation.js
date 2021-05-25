import LoginScreen from '../screens/LoginScreen';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { inject, observer } from 'mobx-react';

import CRUDUsers from '../screens/CRUDUsers/CRUDUsers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateUser from '../screens/CRUDUsers/CreateUser';
import EditUser from '../screens/CRUDUsers/EditUser';
import ReadQuestions from '../screens/CRUDQuestions/ReadQuestions';
import ReadConversations from '../screens/CRUDConversations/ReadConversations';
import ConversationsFromUser from '../screens/CRUDConversations/ConversationsFromUser';
import MessagesFromConversation from '../screens/CRUDMessages/MessagesFromConversation';



const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

const NavigationHandler = (props) => {
    const { loginStore } = props
    return (
        <Drawer.Navigator initialRouteName="LoginScreen" screenOptions={({ route, navigation }) => ({
            headerRight: () => {
                if (route.name === "CRUDUsers") {
                    return <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateUser')} name="add" size={25} color={"blue"}></Ionicons>
                } else if (route.name === "CRUDQuestions") {
                    return <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateQuestion')} name="add" size={25} color={"blue"}></Ionicons>
                }
            },
            headerShown: true
        })}>
            {loginStore.user.isSignedIn
                ? (
                    <Drawer.Screen name="CRUDUsers" component={UserNavigation}></Drawer.Screen>)
                : (<Drawer.Screen name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Login', headerShown: false }}
                />)}
            <Drawer.Screen name="CRUDQuestions" component={QuestionNavigation}></Drawer.Screen>
            <Drawer.Screen name="CRUDConversations" component={ConversationNavigation}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

const UserNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ReadUsers" screenOptions={({ route, navigation }) => ({
            headerRight: () => {
                return route.name === "ReadUsers" ? <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateUser')} name="add" size={25} color={"blue"}></Ionicons> : null

            },
            headerShown: false
        })}>
            <Stack.Screen name="ReadUsers" component={CRUDUsers}></Stack.Screen>
            <Stack.Screen name="CreateUser" component={CreateUser}></Stack.Screen>
            <Stack.Screen name="EditUser" component={EditUser}></Stack.Screen>
            <Stack.Screen name="ConversationsFromUser" component={ConversationsFromUser}></Stack.Screen>
            <Stack.Screen name="ReadConversations" component={ReadConversations}></Stack.Screen>
            <Stack.Screen name="MessagesFromConversation" component={MessagesFromConversation}></Stack.Screen>


        </Stack.Navigator>
    )
}

const ConversationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ReadConversations" screenOptions={({ route, navigation }) => ({
            headerRight: () => {
                // return route.name === "ReadUsers" ? <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateUser')} name="add" size={25} color={"blue"}></Ionicons> : null
            },
            headerShown: false
        })}>
            <Stack.Screen name="ReadConversations" component={ReadConversations}></Stack.Screen>
            <Stack.Screen name="ConversationsFromUser" component={ConversationsFromUser}></Stack.Screen>
            <Stack.Screen name="MessagesFromConversation" component={MessagesFromConversation}></Stack.Screen>


        </Stack.Navigator>
    )
}

const QuestionNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="ReadQuestions" screenOptions={({ route, navigation }) => ({
            headerRight: () => {
                // return route.name === "ReadQuestions" ? <Ionicons style={{ marginRight: 15 }} onPress={() => navigation.navigate('CreateUser')} name="add" size={25} color={"blue"}></Ionicons> : null
            }
        })}>
            <Stack.Screen name="ReadQuestions" component={ReadQuestions}></Stack.Screen>
        </Stack.Navigator>
    )
}

export const Navigation = inject('loginStore')(observer(NavigationHandler));