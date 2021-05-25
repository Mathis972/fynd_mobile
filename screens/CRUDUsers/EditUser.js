import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import config from '../../config';

const EditUser = ({ route, navigation }) => {
    const { utilisateur } = route.params

    const [prenom, setPrenom] = useState(utilisateur.prenom);
    const [dateNaissance, setDateNaissance] = useState(new Date(utilisateur.date_de_naissance));
    const [showPicker, setShowPicker] = useState(false);
    const [email, setEmail] = useState(utilisateur.email);
    const [biographie, setBiographie] = useState(utilisateur.biographie);
    const [motDePasse, setMotDePasse] = useState(utilisateur.mot_de_passe);
    const dateChange = (event, date) => {
        if (event.type != "dismissed") {
            setDateNaissance(date);
        }
        setShowPicker(false)
    }
    // const goBack = () => {
    //     navigation.goBack();
    //     navigation.state.params.refresh({ref})
    // }
    const saveUser = () => {
        if (prenom != '' && dateNaissance != '' && email != '' && biographie != '' && motDePasse != '') {
            try {
                axios.put(`${config.API_ROOT_URL}/utilisateurs/${utilisateur.id}`, {
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
        }
    }

    return (
        <View style={styles.container}>

            <TextInput style={{ padding: 20 }} maxLength={40} onChangeText={prenom => setPrenom(prenom)} placeholder="prenom" value={prenom} ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={150} keyboardType="email-address" onChangeText={email => setEmail(email)} placeholder="email" value={email} ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={200} multiline={true} onChangeText={bio => setBiographie(bio)} placeholder="Biographie" value={biographie}  ></TextInput>
            <TextInput style={{ padding: 20 }} maxLength={30} secureTextEntry={true} onChangeText={motDePasse => setMotDePasse(motDePasse)} placeholder="mot_de_passe" value={motDePasse} ></TextInput>
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

export default EditUser
