// AppleTV media player: http://www.appletv.com/developer

var airplay     = require('airplay')
  , util        = require('util')
  , devices     = require('./../../core/device')
  , steward     = require('./../../core/steward')
  , media       = require('./../device-media')
  , mdns        = require('mdns')
  , utility     = require('./../../core/utility')
  , browser     = mdns.createBrowser(mdns.tcp('airplay'))
  , url         = require('url')
  ;


var logger = media.logger;


var AppleTV = exports.Device = function(deviceID, deviceUID, info) {

  this.whatami = '/device/media/appletv/video';
  this.deviceID = deviceID.toString();
  this.deviceUID = deviceUID;
  this.name = info.device.name;
  this.getName();

  this.url = info.url;
  this.sid = null;
  this.seq = 0;

  var parts = url.parse(info.url);

  this.appletv = new airplay.Device(deviceID, {
    host : parts.hostname
  , port: parts.port
  });

  this.status = 'idle';
  this.changed();
  this.refreshID = null;

};
util.inherits(AppleTV, media.Device);


AppleTV.operations = {
  stop : function(device, params) {/* jshint unused: false */
    device.stop();
  }
, previous : function(device, params) {/* jshint unused: false */
    // TODO: flesh this out
  }
, play : function(device, params) {/* jshint unused: false */
    if (params && params.url) {
      device.play(params.url, 0);
    } else {
      device.rate(1.0);
    }
  }
, pause : function(device, params) {/* jshint unused: false */
    device.rate(0.0);
  }
, next : function(device, params) {/* jshint unused: false */
    device.rate(2);
  }
};


AppleTV.prototype.perform = function(self, taskID, perform, parameter) {
  var params;
  try { params = JSON.parse(parameter); } catch(e) {}

  if (!!AppleTV.operations[perform]) {
    AppleTV.operations[perform](this.appletv, params);
    return steward.performed(taskID);
  }

  return devices.perform(self, taskID, perform, parameter);
};

var validate_perform = function(perform, parameter) {
  if (!!AppleTV.operations[perform]) return { invalid: [], requires: [] };

  return devices.validate_perform(perform, parameter);
};


exports.start = function() {
  var discovery = utility.logger('discovery');


  browser.on('serviceUp', function(service) {

    var model = service.txtRecord.model.match(/([\d]*),([\d]*)/).slice(1).join('.');
    var info =  { source  : 'mdns'
                , device  : { url          : 'http://' + service.host + ':' + service.port + '/'
                            , name         : service.name
                            , manufacturer : 'APPLE'
                            , model        : { name        : service.name
                                             , description : service.name
                                             , number      : model
                                             }
                            , unit         : { serial      : service.txtRecord.macaddress
                                             , udn         : 'uuid:' + service.txtRecord.macaddress
                                             }
                              }
                };

    info.url = info.device.url;

    info.deviceType = '/device/media/appletv';
    info.id = info.device.unit.udn;
    if (devices.devices[info.id]) return;

    logger.info('mDNS ' + info.device.name, { url: info.url });
    devices.discover(info);

  }).on('serviceDown', function(service) {
    discovery.debug('_airplay._tcp', { event: 'down', name: service.name, host: service.host });
  }).on('serviceChanged', function(service) {
    discovery.debug('_airplay._tcp', { event: 'changed', name: service.name, host: service.host });
  }).on('error', function(err) {
    discovery.error('_airplay._tcp', { event: 'mdns', diagnostic: err.message });
  }).start();


    steward.actors.device.media.appletv = steward.actors.device.media.appletv ||
        { $info     : { type: '/device/media/appletv' } };

    steward.actors.device.media.appletv.video =
        { $info     : { type       : '/device/media/appletv/video'
                      , observe    : [ ]
                      , perform    : [
                                       'play'
                                     , 'stop'
                                     , 'pause'
                                     , 'next'
                                     , 'previous'
                                     ]
                      , properties : { name    : true
                                     , status  : [ 'idle' ]
                                     }
                      }
        , $validate : { perform    : validate_perform }
        };
    devices.makers['/device/media/appletv'] = AppleTV;
};