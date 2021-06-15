import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const QuestionRow = ({ question, navigation, deleteQuestion, updateQuestion }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(question.message);

    return (
        <View style={{ backgroundColor: 'white', margin: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            {isEditing ?
                <>
                    <TextInput onChangeText={(text) => setMessage(text)} value={message}></TextInput>

                    <TouchableOpacity onPress={() => { updateQuestion(question.id, { message: message }); setIsEditing(false) }} style={{ width: 20 }} ><Ionicons name="checkmark" size={18} color="red"></Ionicons></TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsEditing(false)} style={{ width: 20 }} ><Ionicons name="close" size={18} color="red"></Ionicons></TouchableOpacity>
                </> :
                <>
                    <Text>{question.message}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ReponsesFromQuestion', { question_id: question.id })} style={{ width: 20 }} ><Ionicons name="arrow-forward" size={18} color="red"></Ionicons></TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={{ width: 20 }} ><Ionicons name="pencil" size={18} color="orange"></Ionicons></TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteQuestion(question.id)} style={{ width: 20 }} ><Ionicons name="trash" size={18} color="red"></Ionicons></TouchableOpacity>
                </>
            }
        </View>
    )
}
export default QuestionRow

