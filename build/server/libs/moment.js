// Generated by CoffeeScript 1.10.0
var moment;

moment = require('moment');

if (moment.tz) {
  module.exports = moment;
} else {
  require('cozy-ical');
  module.exports = moment;
}

//# sourceMappingURL=moment.js.map