const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Math = require("mathjs"); // Importer l'objet Math

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'docteur'
});

connection.connect();

app.get('/medecins/getAll', (req, res) => {
  connection.query('SELECT * FROM medecin', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/medecins/create', (req, res) => {
  const medecin = req.body;
  connection.query('INSERT INTO medecin SET ?', medecin, (err, result) => { 
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(result);
    }
  });
});

app.put('/medecins/update/:id', (req, res) => {
  const id = req.params.id;
  const medecin = req.body;
  connection.query('UPDATE medecin SET ? WHERE numed = ?', [medecin, id], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
});

app.delete('/medecins/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM medecin WHERE numed = ?', id, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.get('/prestations/getAll', (req, res) => {
    connection.query('SELECT numed, nom, nombre_jours, taux_journalier, nombre_jours * taux_journalier AS prestation FROM medecin', (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        const prestations = results.map(medecin => ({
          ...medecin,
          prestation: medecin.nombre_jours * medecin.taux_journalier
        }));
        
        const totalPrestation = prestations.reduce((total, medecin) => total + medecin.prestation, 0);
        const minPrestation = Math.min(...prestations.map(medecin => medecin.prestation));
        const maxPrestation = Math.max(...prestations.map(medecin => medecin.prestation));
        
        res.status(200).send({
          prestations,
          totalPrestation,
          minPrestation,
          maxPrestation
        });
      }
    });
  });

  
  app.listen(3001, () => {
    console.log('Serveur en écoute sur le port 3001');
  });
