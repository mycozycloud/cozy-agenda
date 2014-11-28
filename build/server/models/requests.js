// Generated by CoffeeScript 1.7.1
var americano, tagsView;

americano = require('americano-cozy');

tagsView = {
  map: function(doc) {
    var _ref;
    return (_ref = doc.tags) != null ? typeof _ref.forEach === "function" ? _ref.forEach(function(tag, index) {
      var type;
      type = index === 0 ? 'calendar' : 'tag';
      return emit([type, tag], true);
    }) : void 0 : void 0;
  },
  reduce: function(key, values, rereduce) {
    return true;
  }
};

module.exports = {
  alarm: {
    all: function(doc) {
      return emit(doc.title, doc);
    },
    byDate: function(doc) {
      return emit(new Date(doc.trigg), doc);
    },
    tags: tagsView
  },
  event: {
    all: function(doc) {
      return emit(doc._id, doc);
    },
    byDate: function(doc) {
      return emit(new Date(doc.start), doc);
    },
    tags: tagsView,
    byCalendar: function(doc) {
      return emit(doc.tags[0], doc);
    }
  },
  user: {
    all: function(doc) {
      return emit(doc.title, doc);
    }
  },
  contact: {
    all: americano.defaultRequests.all
  },
  cozy_instance: {
    all: americano.defaultRequests.all
  }
};
