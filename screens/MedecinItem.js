import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const MedecinItem = ({ medecin, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text>{medecin.nom}</Text>
      <Text>{medecin.nb_jours} jours</Text>
      <Text>{medecin.taux_journalier} €/jour</Text>
      <Text>{medecin.prestation} €</Text>
      <Button title="Supprimer" onPress={() => onDelete(medecin.numed)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd'
  }
});

export default MedecinItem;
