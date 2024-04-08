import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const EditMedecinScreen = ({ route, navigation }) => {
  const { numed } = route.params;
  const [medecin, setMedecin] = useState({});

  useEffect(() => {
    fetch(`http://192.168.123.8:3001/medecins/getAll`)
      .then(response => response.json())
      .then(data => { 
        const medecinToEdit = data.find(m => m.numed === numed);
        setMedecin(medecinToEdit);
      });
  }, [numed]);

  const handleUpdateMedecin = (medecinModifie) => {
    fetch(`http://192.168.123.8:3001/medecins/update/${medecin.numed}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medecinModifie)
    })
      .then(() => {
        // Mettre à jour la liste des médecins (dans App.js)
        navigation.navigate('Accueil', { medecinModifie: medecin });
      })
      .catch(error => {
        alert('La modification a échoué');
      });
  };

  return (
    <View style={styles.container}>
      <Text>Modifier un médecin</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={medecin.nom}
        onChangeText={text => setMedecin({ ...medecin, nom: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de jours"
        value={String(medecin.nombre_jours)}
        onChangeText={text => setMedecin({ ...medecin, nombre_jours:text})}
        keyboardType="numeric" 
      />
      <TextInput
        style={styles.input}
        placeholder="Taux journalier"
        value={String(medecin.taux_journalier)}
        onChangeText={text => setMedecin({ ...medecin, taux_journalier:text})}
        keyboardType="decimal-pad"
      />
      <Button title="Modifier" onPress={() => handleUpdateMedecin(medecin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  }
});

export default EditMedecinScreen;
