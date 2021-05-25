import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserRow = ({ user, navigation, deleteUser }) => {
    const [showDesc, setShowDesc] = useState(false);

    return (
        <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
            <View style={{ flex: 1, flexWrap: 'wrap', padding: 10, maxHeight: 300, display: "flex", margin: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ flex: 1 }}>{user.prenom}</Text>
                <Text style={{ flex: 3 }}>{user.email}</Text>
                <Text style={{ flex: 1 }}>{new Date(user.date_de_naissance).toDateString()}</Text>
                <TouchableOpacity style={{ width: 20 }} onPress={() => navigation.navigate('EditUser', { utilisateur: user })}><Ionicons name="pencil" size={18} color="orange" /></TouchableOpacity>
                <TouchableOpacity onPress={() => deleteUser(user.id)} style={{ width: 20 }}><Ionicons name="trash" size={18} color="red" /></TouchableOpacity>
                {showDesc ?
                    <View style={{ width: "100%", display: "flex", alignItems: 'flex-end' }}>
                        <Text style={{ alignSelf: 'flex-start' }}>{user.biographie}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ConversationsFromUser', { type: "user", id: user.id })} style={{ width: 20 }}><Ionicons name="chatbubbles" size={18} color="purple" /></TouchableOpacity>
                    </View>
                    : null}
            </View>
        </TouchableOpacity>
    )
}
export default UserRow

