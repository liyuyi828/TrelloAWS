'use strict';
// Backend for our Trello clone.

// NPM dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var _ = require('underscore');

// Local dependencies
var storage = require('./storage');

var app = express();

// Serving static file
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/compiled'));


// Add POST request parsing for message bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Index Page
app.get('/', function(request, response, next) {
  response.render('index');
});

// Entity functions
function isValid(entity, obj) {
  if (! _.isUndefined(obj.id) && ! _.isFinite(obj.id)) {
    console.log('Id validation failed', obj.id);
    return false;
  }

  return _.all(_.pairs(entity).map(function(item) {
    var name = item[0], validate = item[1];
    var ret = validate(obj[name]);
    if (! ret) {
      console.log('Validation failed for field %s, value: %s', name, obj[name]);
    }
    return ret;
  }));
}

function getFields(entity, obj) {
  return _.pick(obj, function(v, k) {
    return _.has(entity, k);
  });
}

// REST Endpoint: /api/list
// CRUD actions for list
var listApiRouter = express.Router();
app.use('/api/lists', listApiRouter);

// LIST_FIELDS: names of valid entity fields mapped to functions for validating
// contents of fields.
var LIST_FIELDS = {
  name: function(name) {
    return name && _.isString(name) && name.length;
  },
  pos: _.isNumber,
  cards: function(cards) {
    return ! cards || (_.isArray(cards) && _.all(cards, _.isString));
  }
};

// GET /api/lists Get all lists
listApiRouter.get('/', function(req, resp, next) {
  var result = storage.getAll('list');
  if (result) {
    resp.json({ rows: result });
  } else {
    resp.status(404).end();
  }
});

// GET /api/lists/:id Get one list
listApiRouter.get('/:id', function(req, resp, next) {
    var result = storage.getOne('list', parseInt(req.params.id));
    if (result) {
      resp.json(result);
    } else {
      resp.status(404).end();
    }
});

// POST /api/lists create new list
listApiRouter.post('/', function(req, resp, next) {
  console.log('add new list', req.body);
  var fields = getFields(LIST_FIELDS, req.body);
  fields.pos = parseInt(fields.pos);
  console.log(fields);
  if (! isValid(LIST_FIELDS, fields)) {
    resp.status(400).end();
  } else {
    console.log('Create list', fields);
    resp.json(storage.upsert('list', fields));
  }
});

// POST /api/lists/:id Update existsing list
listApiRouter.post('/:id', function(req, resp, next) {
  console.log('update list', req.body);
  var fields = getFields(LIST_FIELDS, req.body);
  fields.pos = parseInt(fields.pos);
  fields.id = req.body.id
  if (! isValid(LIST_FIELDS, fields)) {
    resp.status(400).end();
  } else {
    console.log('Update list inside', fields);
    resp.json(storage.upsert('list', fields));
  }
});

// Start
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port ' + port);
