import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const ConversationsFromUser = ({ navigation, route }) => {
    const [conversations, setConversations] = useState([]);
    useFocusEffect(
        useCallback(() => {
            if (route.params.type === "user") {
                const getConversation = async () => {
                    try {
                        let resp = await axios.get(`${config.API_ROOT_URL}/conversations?user_id=${route.params.id}`)
                        setConversations(resp.data);
                    } catch (err) {
                        console.error(err);
                    }
                };
                getConversation();

            } else {
                const getConversation = async () => {
                    try {
                        let resp = await axios.get(`${config.API_ROOT_URL}/conversations/${route.params.id}`)
                        setConversations(resp.data);
                    } catch (err) {
                        console.error(err);
                    }
                };
                getConversation();

            }
        }, [])
    );


    return (
        <ScrollView>
            {conversations.length > 0 ? conversations.map((conversation) => {
                return <View key={conversation.id} style={{ flex: 1, padding: 10, maxHeight: 100, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <Text style={{ flex: 3, textAlign: 'center' }}>User 1 : {conversation.utilisateurs1.email} {conversation.ajout_utilisateurs1 ? '✔️' : '❌'}</Text>

                    <Text style={{ flex: 3, textAlign: 'center' }}>User 2 : {conversation.utilisateur2.email} {conversation.ajout_utilisateurs1 ? '✔️' : '❌'}</Text>
                    <TouchableOpacity style={{ width: 20 }} onPress={() => navigation.navigate('MessagesFromConversation', { conversation_id: conversation.id })}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('del')} style={{ width: 20 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>
                </View>
            }) : <Text>No conversations</Text>}
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default ConversationsFromUser
