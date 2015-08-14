/**
 * Wrapper object for expressjs session.
 * Can be required by modules that may require
 * access but do not have a handle on the request object.
 */
'use strict';

module.exports = (function(g, undefined) {

  var _session;

  var obj = {};

  // Initialize session wrapper with expressjs session
  obj.init = function(session) {
    _session = session;
  };

  obj.destroy = function(cb) {
    session.destroy(cb);
  };

  obj.get = function(property) {
    return _session[property];
  };

  obj.set = function(property, value) {
    _session[property] = value;
  };

  return obj;

})(this);