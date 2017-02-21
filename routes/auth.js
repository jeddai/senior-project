var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 5;
var jwt_service = require('./services/jwt-service');
var schema = require('./services/schema-service');
var User = schema.User;
var constants = require('./services/constants');

var supersecretpasswordkey = 'titanic';

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    'username': username
  }, 'password salt roles', function(err, user) {
    if (err) {
      console.log(err);
      return res.status(500)
        .send({
          error: 'error_in_query'
        });
    }
    if (!user) {
      return res.status(500)
        .send({
          error: 'user_not_found'
        });
    }
    bcrypt.hash(password, user.salt, function(err, hash) {
      if (err || user.password != hash) {
        console.log(user.salt + ' | ' + hash);
        return res.status(500)
          .send({
            error: 'invalid_login_data'
          });
      }
      var token = jwt_service.generate(user.username, user.roles);
      res.cookie('jwt', token, {
        maxAge: 1800000
      });
      return res.send('User ' + username + ' logged in.');
    });
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('jwt');
  res.render('index', {
    title: constants.mainTitle + 'Home'
  });
});

router.post('/decode', function(req, res, next) {
  res.cookie('jwt', jwt_service.verify(req.cookies['jwt']), {
    maxAge: 1800000
  });
  res.send(jwt_service.decode(req.cookies['jwt']));
});

router.get('/verify', function(req, res, next) {
  var new_token = jwt_service.verify(req.cookies['jwt']);
  res.cookie('jwt', token, {
    maxAge: 1800000
  });
  res.send(!!new_token);
});

router.post('/create-user', function(req, res, next) {
  if (req.body.serverPass != 'imsorrydave')
    res.status(500)
    .send('I\'m sorry, but you do not have permission to perform this action');
  else {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return res.status(500)
        .send(err);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return res.status(500)
          .send(err);
        var newUser = new User({
          version: req.body.version,
          username: req.body.username,
          password: hash,
          salt: salt,
          roles: req.body.roles,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: !!req.body.email ? req.body.email : ''
        });
        newUser.save(function(err, data) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Success!', data);
            res.send(data);
          }
        });
      });
    });
  }
});

module.exports = router;
