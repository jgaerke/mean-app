module.exports = (function() {
  var self = {
    //locals
    _: require('lodash'),
    db: db,

    //methods
    get: function (collection, id) {
      return self.db.collection(collection).sync.findOne({_id: id});
    },
    findOne: function (collection, criteria, options) {
      criteria = criteria || {};
      options = self._.pick(self._.assign({limit: 10}, options), 'limit', 'sort', 'skip');
      return self.db.collection(collection).sync.findOne(criteria, options);
    },
    count: function (collection, criteria, options) {
      criteria = criteria || {};
      options = self._.pick(options || {}, 'limit', 'skip');
      return self.db.collection(collection).sync.count(criteria, options);
    },
    find: function (collection, criteria, options) {
      criteria = criteria || {};
      options = self._.pick(self._.assign({limit: 10}, options), 'limit', 'sort', 'skip');
      return self.db.collection(collection).find(criteria, options).sync.toArray();
    },
    create: function (collection, doc) {
      doc = self._.assign({_id: new ObjectID().toString() }, doc);
      return self.db.collection(collection).sync.save(doc);
    },
    update: function (collection, criteria, update, options) {
      criteria = criteria || {};
      options = self._.pick(self._.assign({multi: false}, options), 'multi');
      self.db.collection(collection).sync.update(criteria, update, options);
    },
    delete: function (id) {
      self.db.collection(collection).sync.deleteOne({_id: id}, {});
    }
  };
  return self;
})();
  