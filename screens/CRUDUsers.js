import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios'
import config from '../config';

const CRUDUsers = () => {
    const [users, setUsers] = useState([]);

    const editUser = (id) => {

    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/utilisateurs/${id}`);
            const newArrayOfUsers = users.filter((user) => user.id != id);
            setUsers(newArrayOfUsers);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        const getUsers = async () => {
            try {
                let resp = await axios.get(`${config.API_ROOT_URL}/utilisateurs`)
                setUsers(resp.data);
            } catch (err) {
                console.error(err);
            }
        };
        getUsers();
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {users.length > 0 ? users.map((user) => {
                return <View key={user.id} style={{ height: 100, margin: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={{ flex: 1 }}>{user.prenom}</Text>
                    <Text style={{ flex: 5 }}>{user.email}</Text>
                    <Text style={{ flex: 2 }}>{user.biographie}</Text>
                    <Text style={{ flex: 1 }}>{user.date_de_naissance}</Text>

                    <TouchableOpacity style={{ flex: 1 }}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUser(user.id)} style={{ flex: 1 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>

                </View>
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

export default CRUDUsers
