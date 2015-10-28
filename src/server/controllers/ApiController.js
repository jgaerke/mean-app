module.exports = (function () {
  var self;

  var self = {
    //locals
    _: require('lodash'),
    dataSvc: require('../services/DataService'),

    //members
    exec: function (req, res, next) {
      try {
        require('../commands/' + req.params.collection + '/' + req.params.command.capitalize()).exec(req, res, next);
      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error executing command.'});
      }
    },

    get: function (req, res) {
      var collection, id, result;
      try {
        collection = req.params.collection;
        id = req.params.id;

        if (!id || id == '')
          return res.status(400).json({status: 400, message: 'Bad request: \'id\' required'});

        result = self.dataSvc.get(collection, id);
        result = new global[collection.capitalize()](result).toPublicObject();
        res.json({status: 200, data: result});

      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error finding data.'});
      }
    },
    find: function (req, res) {
      var collection, criteria, options;
      try {
        collection = req.params.collection;
        criteria = JSON.parse(req.params.criteria || "{}");
        options = JSON.parse(req.params.options || "{}");
        var results = self._.map(self.dataSvc.find(collection, criteria, options) || [], function (result) {
          return new global[collection.capitalize()](result).toPublicObject();
        });
        res.json({status: 200, data: results});
      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error finding data.'});
      }
    },
    create: function (req, res) {
      var collection, doc, result;
      try {
        collection = req.params.collection;
        doc = req.body;
        result = self.dataSvc.create(collection, doc);
        result = new global[collection.capitalize()](result).toPublicObject();
        res.json({status: 200, data: result});
      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error inserting doc.'});
      }
    },
    update: function (req, res) {
      var collection, criteria, update, options, result;
      try {
        req.body = self._.assign({criteria: null, update: null}, req.body);
        collection = req.params.collection;
        criteria = req.body.criteria;
        update = req.body.update;
        options = JSON.parse(req.params.options || "{}");

        if (criteria == null || update == null)
          return res.status(400).json({status: 400, message: 'Bad request: \'criteria\' and \'update\' required'});

        result = self.dataSvc.update(collection, criteria, update, options);
        result = new global[collection.capitalize()](result).toPublicObject();
        res.json({status: 200, data: result});
      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error updating doc.'});
      }
    },
    delete: function (req, res) {
      var collection, id;
      try {
        collection = req.params.collection;
        id = req.params.id;

        if (!id || id == '')
          return res.status(400).json({status: 400, message: 'Bad request: \'id\' required'});

        self.dataSvc.delete(collection, id);
        res.json({status: 200});
      } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: 'error deleting doc.'});
      }
    },
    bind: function (options) {
      var app = options.app;
      app.post('/api/:collection/:command', self.exec);
      app.get('/api/:collection/:id', self.get);
      app.get('/api/:collection', self.find);
      app.post('/api/:collection', self.create);
      app.put('/api/:collection', self.update);
      app.delete('/api/:collection/:id', self.delete);
    }
  };
  return self;
})();
