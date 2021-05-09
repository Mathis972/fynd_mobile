import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios'
import config from '../../config';

const CreateUser = ({ navigation }) => {
    const [prenom, setPrenom] = useState("");
    const [dateNaissance, setDateNaissance] = useState(new Date(1598051730000));
    const [showPicker, setShowPicker] = useState(false);
    const [email, setEmail] = useState("");
    const [biographie, setBiographie] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const dateChange = (event, date) => {
        if (event.type != "dismissed") {
            setDateNaissance(date);
        }
        setShowPicker(false)

    }
    const saveUser = () => {
        if (prenom != '' && dateNaissance != '' && email != '' && biographie != '' && motDePasse != '') {
            try {

                axios.post(`${config.API_ROOT_URL}/utilisateurs`, {
                    prenom: prenom,
                    date_de_naissance: dateNaissance,
                    email: email,
                    biographie: biographie,
                    mot_de_passe: motDePasse
                })
                    .then(() => navigation.goBack())
            } catch (err) {
                console.error(err)
            }
            // navigation.navigate('CRUDUsers')


            // setPrenom('');
            // setDateNaissance(new Date(1598051730000));
            // setEmail('');
            // setBiographie('');
            // setMotDePasse('');
            // prenomInput.clear()
            // emailInput.clear()
            // bioInput.clear()
            // mdpInput.clear()
        } else {
            console.log("err")
            console.log({
                prenom: prenom,
                date_de_naissance: dateNaissance,
                email: email,
                biographie: biographie,
                mot_de_passe: motDePasse
            })

        }

    }

    return (
        <View style={styles.container}>

            <TextInput style={{ padding: 20 }} maxLength={40} onChangeText={prenom => setPrenom(prenom)} placeholder="prenom" ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={150} keyboardType="email-address" onChangeText={email => setEmail(email)} placeholder="email" ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={200} multiline={true} onChangeText={bio => setBiographie(bio)} placeholder="Biographie" ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={30} secureTextEntry={true} onChangeText={motDePasse => setMotDePasse(motDePasse)} placeholder="mot_de_passe" ></TextInput>
            <Button onPress={() => setShowPicker(true)} title="Show time picker!" />
            {showPicker && (<DateTimePicker
                value={dateNaissance}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, date) => dateChange(event, date)}
            />)}

            <Button title="Save User" onPress={() => saveUser()}></Button>
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
});

export default CreateUser
