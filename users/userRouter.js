const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const { restart } = require('nodemon');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => { res.status(200).json(user)})
  .catch(err => res.status(500).json({message: }))
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => res.status(500).json({message: "Server error"}));
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({message: "Missing user data"})
    }
  } else {
    res.status(400).json({message: "Missing user data"})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({message: "missing required text field."})
    }
  } else {
    res.status(400).json({message: "missing post data"})
  }

}

module.exports = router;
