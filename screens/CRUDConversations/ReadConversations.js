import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const ReadConversations = ({ navigation }) => {
    const [conversations, setConversations] = useState([]);

    const deleteConversation = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/conversations/${id}`);
            const newArrayOfConversations = conversations.filter((conversation) => conversation.id != id);
            setConversations(newArrayOfConversations);
        } catch (err) {
            console.error(err);
        }
    }
    useFocusEffect(
        useCallback(() => {
            const getConversations = async () => {
                try {
                    let resp = await axios.get(`${config.API_ROOT_URL}/conversations`)
                    setConversations(resp.data);
                } catch (err) {
                    console.error(err);
                }
            };
            getConversations();
        }, [])
    );


    return (
        <ScrollView>
            {conversations.length > 0 ? conversations.map((conversation) => {
                return (
                    <View key={conversation.id} style={{ flex: 1, padding: 10, maxHeight: 100, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Text style={{ flex: 1 }}>User 1 : {conversation.fk_utilisateur1_id}</Text>
                        <Text style={{ flex: 3 }}>User 2 : {conversation.fk_utilisateur2_id}</Text>
                        {/* <Text style={{ flex: 1 }}>{new Date(conversation.date_de_naissance).toDateString()}</Text> */}
                        <TouchableOpacity style={{ width: 20 }} onPress={() => navigation.navigate('MessagesFromConversation', { conversation_id: conversation.id })}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => deleteConversation(conversation.id)} style={{ width: 20 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity> */}

                    </View>
                )
                // return <UserRow user={user} key={user.id} deleteUser={deleteUser} navigation={navigation}></UserRow>
            }) : null}
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

export default ReadConversations
