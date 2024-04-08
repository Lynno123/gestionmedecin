import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import MedecinItem from './MedecinItem';
import EditMedecinScreen from './EditMedecinScreen'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [medecins, setMedecins] = useState([]);
  const [nom, setNom] = useState('');
  const [nombreJours, setNombreJours] = useState('');
  const [tauxJournalier, setTauxJournalier] = useState('');
  const [prestations, setPrestations] = useState([]);
  const [newMedecin, setNewMedecin] = useState(null);
 
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.123.8:3001/medecins/getAll')
      .then(response => response.json())
      .then(data => setMedecins(data));
  }, [medecins]);

  useEffect(() => {
    fetch('http://192.168.123.8:3001/prestations/getAll')
      .then(response => response.json())
      .then(data => setPrestations(data));
  }, [prestations]);

  const handleAddMedecin = () => {
    const medecin = {
        nom,
        nombre_jours: parseInt(nombreJours),
        taux_journalier: parseFloat(tauxJournalier)
      };

    fetch('http://192.168.123.8:3001/medecins/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medecin)
    })
      .then(response => response.json())
      .then(data => setMedecins([...medecins, data]));

    setNom('');
    setNombreJours('');
    setTauxJournalier('');

    Alert.alert(
        "Ajout d'un médecin",
        "Le médecin a été ajouté avec succès.",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      );

  };

  const handleDeleteMedecin = (numed) => {
    fetch(`http://192.168.123.8:3001/medecins/delete/${numed}`, {
      method: 'DELETE'
    })
      .then(() => setMedecins(medecins.filter(medecin => medecin.numed !== numed)))
      .then(() => Alert.alert(
        'Suppression d\'un médecin',
        'Le médecin a été supprimé avec succès.',
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      )
    );
  };

//   const handleInputChange = (name, value) => {
//     setNewMedecin({ ...newMedecin, [name]: value });  // Update newMedecin state based on input change
//   };

  const renderItem = ({ item }) => (
    <MedecinItem
      medecin={item}
      onDelete={handleDeleteMedecin}
    />
  );

  return (
    <View style={styles.container}>
        {medecins.length > 0 && (
       <ScrollView>
            {medecins.map((medecin) => (
              <View key={medecin.numed} style={styles.boxContainer}>
                 <Text style={styles.boxData}>Numed: {medecin.numed}</Text>
                    <Text style={styles.boxHeader}>Nom : &nbsp;{medecin.nom} </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.boxData}>Nb Jours: &nbsp;{medecin.nombre_jours}</Text>
                      <Text style={styles.boxData}>Taux Journalier: &nbsp;{medecin.taux_journalier}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                      <TouchableOpacity  onPress={() => handleDeleteMedecin(medecin.numed)}>
                      <Icon name="trash" size={24} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={() => navigation.navigate('EditMedecin', { numed: medecin.numed })}>
                      <Icon name="edit" size={24} color="green" />
                      </TouchableOpacity>
                    </View>
              </View>
            ))}
      </ScrollView>
        )}

      <View style={styles.containerPrestation}>
        <Text style={styles.prestationTitle}>Prestation</Text>
        <Text  style={styles.prestationInfo}>Total: {prestations.totalPrestation} </Text>
        <Text  style={styles.prestationInfo}>Minimum: {prestations.minPrestation} </Text>
        <Text  style={styles.prestationInfo}>Maximum: {prestations.maxPrestation} </Text>
      </View>
    
     {/* Form for adding a new doctor */}
     <View style={styles.form}>
        <Text>Nom:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nom du médecin"
          value={nom}
          onChangeText={setNom}
        />
        <Text>Nombre de jours:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de jours"
          value={nombreJours.toString()}
          onChangeText={setNombreJours}
          keyboardType="numeric" // Set keyboard type for numbers
        />
        <Text>Taux journalier:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Taux journalier"
          value={tauxJournalier}
          onChangeText={setTauxJournalier}
          keyboardType="decimal-pad" // Set keyboard type for decimals
        />
        <Button title="Ajouter un médecin" onPress={handleAddMedecin} />
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#ddd'
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    form: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 5
    }, 
    prestationInfo: {
        fontSize: 12,
        fontWeight: 'medium',
        marginBottom: 10,
      },

      containerPrestation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 1,
        borderWidth: 5,
        borderColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 15, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3, // Pour Android uniquement
        gap: 4,
      },

      prestationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },

      prestationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },

      boxContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start', // Aligner verticalement à gauche
        alignItems: 'flex-start', // Aligner horizontalement à gauche
        borderRadius: 1,
        borderWidth: 5,
        borderColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 15, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3, // Pour Android uniquement
        gap: 3,
      },

      boxHeader: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        maxWidth: 150,
      },

      boxData: {
        maxWidth: 200,
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
      },

      deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        margin: 10,
      },
      deleteText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },

    iconContainer: {
      flexDirection: 'row', // Arrange icons horizontally
      justifyContent: 'space-between', // Distribute icons evenly
      alignItems: 'center', // Align icons vertically
      width: '18%', // Adjust width as needed
      marginLeft: 10
    },
 
  });

export default App;
