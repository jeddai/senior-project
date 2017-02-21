var express = require('express');
var router = express.Router();
var constants = require('./services/constants');
var PythonShell = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  PythonShell.run('python/test.py', {}, function(err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    return res.render('index', {
      title: constants.title + 'Home',
      results: results
    });
  });
});

module.exports = router;
