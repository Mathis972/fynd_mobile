import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const ReponsesFromUser = ({ navigation, route }) => {
    const [reponses, setReponses] = useState([]);

    const deleteReponse = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/reponses_utilisateurs/${id}`);
            const newArrayOfReponses = reponses.filter((reponse) => reponse.id != id);
            setReponses(newArrayOfReponses);
        } catch (err) {
            console.error(err);
        }
    }
    useFocusEffect(
        useCallback(() => {
            const getReponses = async () => {
                try {
                    let resp = await axios.get(`${config.API_ROOT_URL}/reponses_utilisateurs?user_id=${route.params.id}`)
                    setReponses(resp.data);
                } catch (err) {
                    console.error(err);
                }
            };
            getReponses();
        }, [])
    );


    return (
        <ScrollView>
            {reponses.length > 0 ? reponses.map((reponse) => {
                return <View key={reponse.id} style={{ flex: 1, padding: 10, maxHeight: 100, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                    <Text style={{ flex: 3, textAlign: 'center' }}>Question : {reponse.reponse.question.message} </Text>
                    <Text style={{ flex: 3, textAlign: 'center' }}>Rep : {reponse.reponse.message_reponse}</Text>

                    <TouchableOpacity onPress={() => deleteConversation(conversation.id)} style={{ width: 20 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>
                </View>
            }) : <Text>No reponses</Text>}
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

export default ReponsesFromUser
