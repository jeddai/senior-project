var express = require('express');
var router = express.Router();
var constants = require('./services/constants');
var Schema = require('./services/schema-service');
var Form = Schema.Form;

/* GET users listing. */
router.get('/', function (req, res, next) {
    return res.render('form', {
        title: constants.title + 'Form'
    });
});

router.post('/submit', function (req, res, next) {
    req.body.survived = true;
    var form = new Form(req.body);
    form.save(function(err, saved_form) {
       if(err) return res.status(500).send(err);
       else return res.send(saved_form);
    });
});

router.get('/:status', function (req, res, next) {
   return res.render('result', { title: 'You ' + req.params.status });
});

module.exports = router;
