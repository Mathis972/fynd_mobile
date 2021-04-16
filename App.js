import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
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
            <TextInput style={styles.input} placeholder='Email' placeholderTextColor='white'></TextInput><Ionicons name="person" size={18} color="white" /></View>
          <View style={{
            display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey',
            borderBottomWidth: 2
          }}>
            <TextInput style={styles.input} placeholder='mot de passe' placeholderTextColor='white'></TextInput><Ionicons name="lock-closed" size={18} color="white" />
          </View>
        </View>
        <TouchableOpacity style={styles.button}><Text style={{ color: 'white' }}>Se connecter</Text></TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

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
