import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // **Vérifier les informations d'identification**
    // (Remplacer cette partie par une authentification réelle)
    if (username === 'demo' && password === 'demo') {
      Alert.alert('Succès', 'Vous êtes connecté !');
      navigation.navigate('Accueil'); // Rediriger vers l'accueil
    } else {
      Alert.alert('Échec', 'Identifiants incorrects.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Masquer le mot de passe
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
});

export default Login;
