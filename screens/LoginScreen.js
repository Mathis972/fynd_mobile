import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { inject, observer, Provider } from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStore } from "../store/LoginStore"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import config from "../config"



const LoginScreen = ({ navigation }) => {
    const stores = { loginStore }

    return (
        <Provider {...stores}>
            <Login navigation={navigation}></Login>
        </Provider>
    )

}

const LoginHandling = (props) => {
    const { loginStore, navigation } = props

    useEffect(() => {

        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('user');
                console.log(value)

                if (value !== null) {
                    loginStore.user = JSON.parse(value)
                }

            } catch (error) {
                console.error(error);

            }
        };
        _retrieveData()

    }, [])


    const SignIn = async () => {
        await axios.post(`${config.API_ROOT_URL}/utilisateurs/login`, {
            email: loginStore.user.username,
            mot_de_passe: loginStore.user.password
        })
            .then(r => {
                if (r.data.est_admin) {
                    loginStore.user.token = r.data.token
                    loginStore.signUserInOut(true);
                    navigation.navigate('CRUDUsers');
                }
            })
            .catch(err => console.error(err));
    }
    return (

        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#de268e', '#d57e27']}
                style={styles.background}
            />
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', opacity: 10, padding: 30, borderRadius: 10 }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Bienvenue sur l'interface administrative de Fynd</Text>
                <View style={{ display: 'flex', justifyContent: 'space-around', padding: 20, height: 175 }}>
                    <View style={{
                        display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey',
                        borderBottomWidth: 2
                    }}>
                        <TextInput style={styles.input} keyboardType="email-address" value={loginStore.user.username} placeholder='Email' placeholderTextColor='white' onChangeText={text => loginStore.user.username = text} >
                        </TextInput><Ionicons name="person" size={18} color="white" /></View>
                    <View style={{
                        display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey',
                        borderBottomWidth: 2
                    }}>
                        <TextInput style={styles.input} placeholder='mot de passe' value={loginStore.user.password} secureTextEntry={true} onChangeText={text => loginStore.user.password = text} placeholderTextColor='white'></TextInput><Ionicons name="lock-closed" size={18} color="white" />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={SignIn}><Text style={{ color: 'white' }}>Se connecter</Text></TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const Login = inject('loginStore')(observer(LoginHandling))
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'transparent',
        width: 250,
        padding: 0,
        margin: 5,
        color: 'white',

    },
    button: {
        backgroundColor: '#de268e',
        padding: 10,
        marginTop: 20
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
});
export default LoginScreen
