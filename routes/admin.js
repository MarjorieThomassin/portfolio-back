const adminRoute = require('express').Router();
const db = require('../db-config');
const { hashPassword } = require('../middlewares/auth');
const connection = require('../db-config');

adminRoute.get('/', (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200).json(results);
    }
  });
});

adminRoute.post('/', hashPassword, (req, res) => {
  const admin = {
    email: req.body.email,
    password: req.body.password,
  };

  db.query('INSERT INTO admin (email, password) VALUES (?, ?)', [admin.email, admin.password], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      delete admin.password;
      res.status(201).json({ ...admin, id: results.insertId });
    }
  });
});

adminRoute.delete('/:id', (req, res) => {
  const admin = req.params.id;
  connection.query(
    'DELETE FROM admin WHERE id = ?',
    [admin],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an admin');
      } else {
        res.status(200).send('admin deleted!');
      }
    },
  );
});

module.exports = adminRoute;
