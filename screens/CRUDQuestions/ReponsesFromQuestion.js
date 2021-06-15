import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const ReponsesFromQuestion = ({ navigation, route }) => {
    const [reponses, setReponses] = useState([]);
    const [title, setTitle] = useState([]);

    const updateReponse = async (id, body) => {
        try {
            const resp = await axios.put(`${config.API_ROOT_URL}/reponses/${id}`, body);
            const newArrayOfReponses = reponses.map((reponse) => reponse.id == id ? resp.data : reponse);
            setReponses(newArrayOfReponses);
        } catch (err) {
            console.error(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            const getReponses = async () => {
                try {
                    let resp = await axios.get(`${config.API_ROOT_URL}/reponses?question_id=${route.params.question_id}`)
                    setReponses(resp.data);
                    setTitle(resp.data[0].question.message)
                } catch (err) {
                    console.error(err);
                }
            };
            getReponses();
        }, [])
    );

    const ReponseRow = ({ reponse, updateReponse }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [message, setMessage] = useState(reponse.message_reponse);

        return (
            <View style={{ backgroundColor: 'white', margin: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                {isEditing ?
                    <>
                        <TextInput onChangeText={(text) => setMessage(text)} value={message}></TextInput>

                        <TouchableOpacity onPress={() => { updateReponse(reponse.id, { message_reponse: message }); setIsEditing(false) }} style={{ width: 20 }} ><Ionicons name="checkmark" size={18} color="red"></Ionicons></TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsEditing(false)} style={{ width: 20 }} ><Ionicons name="close" size={18} color="red"></Ionicons></TouchableOpacity>
                    </> :
                    <>
                        <Text style={{ flex: 3, textAlign: 'center' }}> {reponse.message_reponse} {reponse.icon ? <Ionicons name={reponse.icon}></Ionicons> : null}</Text>
                        <TouchableOpacity onPress={() => setIsEditing(true)} style={{ width: 20 }} ><Ionicons name="pencil" size={18} color="orange"></Ionicons></TouchableOpacity>

                    </>
                }
            </View>
        )
    }


    return (
        <ScrollView>
            <Text style={{ padding: 20, fontSize: 20 }}>{title ?? "Question inconnu"}</Text>
            {reponses.length > 0 ? reponses.map((reponse) => {
                return <ReponseRow key={reponse.id} reponse={reponse} updateReponse={updateReponse} />

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

export default ReponsesFromQuestion
