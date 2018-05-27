var User = require('../models/user').User;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;   

    async.waterfall([
      function(callback) {
        User.findOne({username: username}, callback);
      },
      function(user, callback) {
        if (user) {
          if (user.checkPassword(password)) {
            callback(null, user);
          } else {
            next(new Error("Ошибка при входе"));
          }
        } else {
          var user = new User({username: username, password: password});
          user.save(function(err) {
            if (err) return next(err);
            callback(null, user);
          });
        }
      }
    ], function(err) {
      if (err) return next(err);
      req.session.user = user._id;
    });

    User.findOne({username: username}, function(err, user) {

      if (err) return next(err);

      if (user) {
        if (user.checkPassword(password)) {

        } else {

        }
      } else {
        var user = new User({username: username, password: password});
        user.save(function(err) {
          if (err) return next(err);

        });
      }

    });
  });


  app.get('/chat', function(req, res) {
    res.render('chat');
  });
}