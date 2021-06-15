import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


import axios from 'axios'
import config from '../../config';

const CreateQuestion = ({ navigation }) => {
    const [message, setMessage] = useState("");

    const [resp1, setResp1] = useState("");
    const [icon1, setIcon1] = useState("");

    const [resp2, setResp2] = useState("");
    const [icon2, setIcon2] = useState("");

    const [resp3, setResp3] = useState("");
    const [icon3, setIcon3] = useState("");

    const [resp4, setResp4] = useState("");
    const [icon4, setIcon4] = useState("");


    const saveQuestion = async () => {
        if (message != '' && resp1 != "" && resp2 != "" && resp3 != "" && resp4 != "") {
            try {
                await axios.post(`${config.API_ROOT_URL}/questions`, {
                    message: message,
                })
                    .then(async (r) => {
                        await axios.post(`${config.API_ROOT_URL}/reponses`, { fk_question_id: r.data.id, message_reponse: resp1, icon: icon1 })
                        await axios.post(`${config.API_ROOT_URL}/reponses`, { fk_question_id: r.data.id, message_reponse: resp2, icon: icon2 })
                        await axios.post(`${config.API_ROOT_URL}/reponses`, { fk_question_id: r.data.id, message_reponse: resp3, icon: icon3 })
                        await axios.post(`${config.API_ROOT_URL}/reponses`, { fk_question_id: r.data.id, message_reponse: resp4, icon: icon4 })
                        navigation.goBack()
                    })

            } catch (err) {
                console.error(err)
            }
        } else {
            console.log({
                message: message,
            })

        }

    }

    return (
        <View style={styles.container}>
            <TextInput style={{ padding: 20 }} maxLength={80} onChangeText={message => setMessage(message)} value={message} placeholder="message" ></TextInput>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={styles.resp}>
                    <TextInput maxLength={40} onChangeText={resp => setResp1(resp)} value={resp1} placeholder="Réponse 1" ></TextInput>
                    <TextInput maxLength={40} onChangeText={icon => setIcon1(icon)} value={icon1} placeholder="Icon 1" ></TextInput>
                    <Ionicons name={icon1} />

                </View>
                <View style={styles.resp}>
                    <TextInput maxLength={40} onChangeText={resp => setResp2(resp)} value={resp2} placeholder="Réponse 2" ></TextInput>
                    <TextInput maxLength={40} onChangeText={icon => setIcon2(icon)} value={icon2} placeholder="Icon 2" ></TextInput>
                    <Ionicons name={icon2} />

                </View>
                <View style={styles.resp}>
                    <TextInput maxLength={40} onChangeText={resp => setResp3(resp)} value={resp3} placeholder="Réponse 3" ></TextInput>
                    <TextInput maxLength={40} onChangeText={icon => setIcon3(icon)} value={icon3} placeholder="Icon 3" ></TextInput>
                    <Ionicons name={icon3} />

                </View>
                <View style={styles.resp}>
                    <TextInput maxLength={40} onChangeText={resp => setResp4(resp)} value={resp4} placeholder="Réponse 4" ></TextInput>
                    <TextInput maxLength={40} onChangeText={icon => setIcon4(icon)} value={icon4} placeholder="Icon 4" ></TextInput>
                    <Ionicons name={icon4} />

                </View>
            </View>
            <Button title="Save Question" onPress={() => saveQuestion()}></Button>
            <StatusBar style="auto" />
        </View>
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
    resp: {
        padding: 20, width: '50 %', textAlign: 'center'
    }
});

export default CreateQuestion
