import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios'

const CRUDUsers = () => {
    const [users, setUsers] = useState([]);

    const editUser = (id) => {

    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://b62315a56a20.ngrok.io/utilisateurs/${id}`);
            const newArrayOfUsers = users.filter((user) => user.id != id);
            setUsers(newArrayOfUsers);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        const getUsers = async () => {
            try {
                let resp = await axios.get(`http://b62315a56a20.ngrok.io/utilisateurs`)
                setUsers(resp.data);
            } catch (err) {
                console.error(err);
            }
        };
        getUsers();
    }, []);
    return (
        <View style={styles.container}>
            {users.length > 0 ? users.map((user) => {
                return <View key={user.id} style={{ height: 100, margin: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={{ flex: 1 }}>{user.prenom}</Text>
                    <Text style={{ flex: 5 }}>{user.email}</Text>
                    <Text style={{ flex: 2 }}>{user.biographie}</Text>

                    <TouchableOpacity style={{ flex: 1 }}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUser(user.id)} style={{ flex: 1 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>

                </View>
            }) : null}

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

export default CRUDUsers
