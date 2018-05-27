var User = require('../models/user').User;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index');
  });

  app.get('/login', function(req, res, next) {
    res.render('login');
  });
  
  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  });
  
  app.get('/user/:id', function(req, res, next) {
    try {
      var id = new ObjectID(req.params.id);
    } catch(err) {
      next(err);
    }

    User.findById(req.params.id, function(err, user) {
      if (err) throw err;
      res.json(user);
    });
  });  
}