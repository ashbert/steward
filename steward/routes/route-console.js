var stringify   = require('json-stringify-safe')
  , util        = require('util')
  , server      = require('./../core/server')
  , steward     = require('./../core/steward')
  , users       = require('./../api/api-manage-user')
  , utility     = require('./../core/utility')
  , broker      = utility.broker
  ;


var logger = utility.logger('server');
var places = null;


var consoleX = function(ws, tag) {
  var meta;

  if (!places) places = require('./../actors/actor-place');

  ws.on('message', function(data, flags) {
    var message;

    if (!!flags.binary) return;
    message = null;
    try { message = JSON.parse(data); } catch(ex) { return; }
    if (message.path.indexOf('/api/v1/user/authenticate') === -1) return;
    return users.authenticate(logger,
                             { clientInfo : ws.clientInfo
                             , send       : function(data) { consoleX2(logger, ws, data, tag); }
                             },
                             { prefix     : '/api/v1/user/authenticate'
                             }, message, tag);
  });

  broker.subscribe('beacon-egress', function(category, datum) {
    var data = {};

    if ((!!places) && (!places.place1.info.insecure) && (!steward.readP(ws.clientInfo))) return;

    if (!util.isArray(datum)) datum = [ datum ];
    data[category] = datum;

// stringify -- not JSON.stringify() -- in case there's something circular
    try { ws.send(stringify(data), function(err) { if (err) try { ws.terminate(); } catch(ex) {} }); } catch(ex) {}
  });

  if ((!places) || (!!places.place1.info.insecure) || (steward.readP(ws.clientInfo))) {
    try { ws.send(stringify(utility.signals)); } catch(ex) {}
    broker.publish('actors', 'attention');
    return broker.publish('actors', 'ping');
  }

  meta = utility.clone(ws.clientInfo);

  meta.event = 'access';
  meta.diagnostic = 'unauthorized';
  meta.resource = 'console';
  logger.warning(tag, meta);

  try {
    ws.send(stringify({ error: { permanent: true, diagnostic: 'access control' }}), function(err) {
      if (err) try { ws.terminate(); } catch(ex) {}
    });
  } catch(ex) {}
};

var consoleX2 = function(logger, ws, data, tag) {/* jshint unused: false */
  try { ws.send(data); } catch(ex) { console.log(ex); }

  if ((!places) || (!!places.place1.info.insecure) || (steward.readP(ws.clientInfo))) {
    try { ws.send(stringify(utility.signals)); } catch(ex) {}
    broker.publish('actors', 'attention');
    broker.publish('actors', 'ping');
  }
};

exports.start = function() { server.routes['/console'] = { route : consoleX }; };
