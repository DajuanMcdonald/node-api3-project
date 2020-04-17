const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const { restart } = require('nodemon');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({message: `Unable to add ${user} to database`}))
});

router.post('/:id/posts', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => { res.status(200).json(user)})
  .catch(err => res.status(500).json({errormessage: "error creating post."}))
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => res.status(200).json(users))
  .catch(err => res.status(500).json({message: "The array of users was not found."}))
});

router.get('/:id', validateUser, (req, res) => {
  // do your magic!
  req.user ? res.status(200).json(req.user) : res.status(500).json({message: `Error getting ${user}`})
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    if (req.user.name !== req.body.name) {
      res.status(200).json({
        status: `Users 'name ${req.user.name ? req.user.name : req.body.name} was updated to ${req.body.name}`,
        oldName: req.user.name,
        newName: req.body.name
      })
      .catch(err => res.status(500).json({errorMessage: `Error updating, ${user}` }))
    }
  })

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
