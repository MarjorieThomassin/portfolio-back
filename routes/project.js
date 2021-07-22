const projectRoute = require('express').Router();
const connection = require('../db-config');

projectRoute.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM project',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving a project from database');
      } else {
        res.json(results);
      }
    },
  );
});

projectRoute.post('/', (req, res) => {
  const project = {
    nameProject: req.body.nameProject,
    image: req.body.image,
    startedAt: req.body.startedAt,
    endedAt: req.body.startedAt,
    description: req.body.description,
    link: req.body.link,
  };
  connection.query(
    'INSERT INTO project (nameProject, image, startedAt, endedAt, description, link) VALUES (?, ?, ?, ?, ?, ?)',
    [project.nameProject, project.image, project.startedAt, project.endedAt,
      project.description, project.link],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the project !');
      } else {
        res.status(201).send('Project successfully saved !');
      }
    },
  );
});

projectRoute.delete('/:id', (req, res) => {
  const project = req.params.id;
  connection.query(
    'DELETE FROM project WHERE id = ?',
    [project],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a project');
      } else {
        res.status(200).send('project deleted!');
      }
    },
  );
});

module.exports = projectRoute;
