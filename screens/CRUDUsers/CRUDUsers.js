import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UserRow from "../../components/users/UserRow"

import axios from 'axios'
import config from '../../config';
import { useFocusEffect } from '@react-navigation/core';

const CRUDUsers = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/utilisateurs/${id}`);
            const newArrayOfUsers = users.filter((user) => user.id != id);
            setUsers(newArrayOfUsers);
        } catch (err) {
            console.error(err);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const getUsers = async () => {
                try {
                    let resp = await axios.get(`${config.API_ROOT_URL}/utilisateurs`)
                    console.log(resp.data)
                    setUsers(resp.data);
                } catch (err) {
                    console.error(err);
                }
            };
            getUsers();
        }, [])
    );
    return (
        <ScrollView>
            {users.length > 0 ? users.map((user) => {
                return <UserRow user={user} key={user.id} deleteUser={deleteUser} navigation={navigation}></UserRow>
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
