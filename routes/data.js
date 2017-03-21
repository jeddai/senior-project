var express = require('express');
var router = express.Router();
var fs = require('fs');
var constants = require('./services/constants');
var Schema = require('./services/schema-service');
var Form = Schema.Form;

/* GET data. */
router.get('/', function (req, res, next) {
    return res.render('data', {
        title: constants.title + 'Data'
    });
});

router.get('/:fileName', function(req, res, next) {
    var filename = './data_files/' + req.params.fileName;
    if(filename.search('json') != -1) {
        var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
        obj.links = obj.links.concat(createLinks(obj.nodes, 'pclass'));
        res.send(obj);
    } else {
        next();
    }
});

router.post('/relink', function(req, res, next) {
    var obj = {
        nodes : req.body.nodes,
        links : []
    };
    req.body.matchers.forEach(function(el) {
        obj.links = obj.links.concat(createLinks(obj.nodes, el));
    });
    res.send(obj);
});

router.post('/:fileName', function(req, res, next) {
    var filename = './data_files/' + req.params.fileName;
    if(filename.search('json') != -1) {
        var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
        req.body.forEach(function(el) {
            obj.links = obj.links.concat(createLinks(obj.nodes, el));
        });
        res.send(obj);
    } else {
        next();
    }
});

function createLinks(nodes, matcher) {
    var links = [];
    nodes.forEach(function(n){
        findAllMatching(links, nodes, n, matcher).forEach(function(nm) {
            links.push({
                "source" : n.id,
                "target" : nm.id,
                "value" : nm[matcher],
                "matcher" : matcher
            });
        });
    });
    return links;
}

function findAllMatching(links, nodes, n, matcher) {
    var matching = [];
    nodes.forEach(function(node) {
        if(n[matcher] == node[matcher]
            && n.id != node.id
            && !containsDuplicate(links, n, node, matcher)) {
            matching.push(node);
        }
    });
    return matching;
}

function containsDuplicate(links, n, node, matcher) {
    var val = false;
    links.some(function(link) {
        if(((link.source == n.id || link.target == node.id)
            || (link.target == n.id || link.source == node.id)) && matcher == link.matcher) {
            val = true;
            return true;
        }
    });
    return val;
}

module.exports = router;
