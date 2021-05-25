import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const MessagesFromConversation = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    useFocusEffect(
        useCallback(() => {
            if (route.params.conversation_id) {
                const getMessages = async () => {
                    try {
                        let resp = await axios.get(`${config.API_ROOT_URL}/messages?conversation_id=${route.params.conversation_id}`)
                        setMessages(resp.data);
                    } catch (err) {
                        console.error(err);
                    }
                };
                getMessages();

            }
        }, [])
    );
    return (
        <ScrollView>
            {messages.length > 0 ? messages.map((message) => {
                return <View key={message.id} style={message.sent_by_user1 ? { backgroundColor: "blue" } : { backgroundColor: "grey" }, { flex: 1, padding: 10, maxHeight: 100, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ flex: 3, textAlign: 'center' }}>{message.contenu}</Text>
                    <TouchableOpacity style={{ width: 20 }} onPress={() => console.log("pog")}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('del')} style={{ width: 20 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>
                </View>
            }) : <Text>No Messages</Text>}
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

export default MessagesFromConversation
