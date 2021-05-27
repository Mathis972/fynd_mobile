import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const MessagesFromConversation = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);

    const deleteMessage = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/messages/${id}`);
            const newArrayofMessages = messages.filter((message) => message.id != id);
            setMessages(newArrayofMessages);
        } catch (err) {
            console.error(err);
        }
    }

    const updateMessage = async (id, body) => {
        try {
            const resp = await axios.put(`${config.API_ROOT_URL}/messages/${id}`, body);
            const newArrayofMessages = messages.map((message) => message.id == id ? resp.data : message);
            setMessages(newArrayofMessages);
        } catch (err) {
            console.error(err);
        }
    }

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
            {messages.length > 0 ? messages.map((message) =>
                <MessageRow key={message.id} message={message} updateMessage={updateMessage} deleteMessage={deleteMessage}></MessageRow>
            ) : <Text>No Messages</Text>}
            <StatusBar style="auto" />
        </ScrollView>
    );
}
const MessageRow = ({ message, updateMessage, deleteMessage }) => {
    const [contenu, setContenu] = useState(message.contenu);
    const [isEditing, setIsEditing] = useState(false);

    return <View style={message.sent_by_user1 ? { backgroundColor: "blue" } : { backgroundColor: "grey" }, { flex: 1, padding: 10, maxHeight: 100, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {isEditing ?
            <>
                <TextInput value={contenu} onChangeText={(text) => setContenu(text)} style={{ flex: 3, textAlign: 'center' }}></TextInput>
                <TouchableOpacity style={{ width: 20 }} onPress={() => { updateMessage(message.id, { contenu: contenu }); setIsEditing(false) }}><Ionicons name="checkmark" size={18} color="green" /></TouchableOpacity>
                <TouchableOpacity style={{ width: 20 }} onPress={() => setIsEditing(false)}><Ionicons name="close" size={18} color="red" /></TouchableOpacity>
            </>
            :
            <>
                <Text style={{ flex: 3, textAlign: 'center' }}>{message.contenu}</Text>
                <TouchableOpacity style={{ width: 20 }} onPress={() => setIsEditing(true)}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMessage(message.id)} style={{ width: 20 }} ><Ionicons name="trash" size={18} color="red"></Ionicons></TouchableOpacity>

            </>}

    </View>
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
