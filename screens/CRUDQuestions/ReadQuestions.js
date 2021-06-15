import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import config from '../../config';
import { inject, observer } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import QuestionRow from '../../components/questions/QuestionRow';

function ReadQuestionsHandling({ navigation }) {
    const [questions, setQuestions] = useState([]);

    const deleteQuestion = async (id) => {
        try {
            await axios.delete(`${config.API_ROOT_URL}/questions/${id}`);
            const newArrayOfQuestions = questions.filter((question) => question.id != id);
            setQuestions(newArrayOfQuestions);
        } catch (err) {
            console.error(err);
        }
    }

    const updateQuestion = async (id, body) => {
        try {
            const resp = await axios.put(`${config.API_ROOT_URL}/questions/${id}`, body);
            const newArrayOfQuestions = questions.map((question) => question.id == id ? resp.data : question);
            setQuestions(newArrayOfQuestions);
        } catch (err) {
            console.error(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            const getQuestions = async () => {
                try {
                    let resp = await axios.get(`${config.API_ROOT_URL}/questions`)
                    setQuestions(resp.data);
                } catch (err) {
                    console.error(err);
                }
            };
            getQuestions();
        }, [])
    );
    return (
        <ScrollView>
            {questions.length > 0 ? questions.map((question) => {
                return <QuestionRow key={question.id} question={question} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} navigation={navigation}> </QuestionRow>
            }) : null}
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const ReadQuestions = inject('loginStore')(observer(ReadQuestionsHandling));
export default ReadQuestions