const hardskillRoute = require('express').Router();
const connection = require('../db-config');

hardskillRoute.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM hardskill',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving the hardskill from database');
      } else {
        res.json(results);
      }
    },
  );
});

hardskillRoute.post('/', (req, res) => {
  const {
    skillName, skillDescription, imageSkill,
  } = req.body;
  connection.query(
    'INSERT INTO hardskill(`skillName`, `skillDescription`, `imageSkill`) VALUES (?, ?, ?)',
    [skillName, skillDescription, imageSkill],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the hardskill');
      } else {
        const newHardskill = {
          id: result.insertId,
          skillName,
          skillDescription,
          imageSkill,
        };
        res.status(201).send(newHardskill);
      }
    },
  );
});

hardskillRoute.put('/:id', (req, res) => {
  const hardskillId = req.params.id;
  connection.query(
    'SELECT * FROM hardskill WHERE id = ?',
    [hardskillId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating the hardskill');
      } else {
        const hardskillFromDb = selectResults[0];
        if (hardskillFromDb) {
          const hardskillPropsToUpdate = req.body;
          connection.query(
            'UPDATE hardskill SET ? WHERE id = ?',
            [hardskillPropsToUpdate, hardskillId],
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error updating the hardskill');
              } else {
                const updated = { ...hardskillFromDb, ...hardskillPropsToUpdate };
                res.status(200).send(updated);
              }
            },
          );
        } else {
          res.status(404).send(`hardskill with id ${hardskillId} not found.`);
        }
      }
    },
  );
});

hardskillRoute.delete('/:id', (req, res) => {
  const hardskillId = req.params.id;
  connection.query(
    'DELETE FROM hardskill WHERE id = ?',
    [hardskillId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a hardskill');
      } else {
        res.status(200).send('hardskill deleted!');
      }
    },
  );
});

module.exports = hardskillRoute;
