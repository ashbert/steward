
var showSettings = function() {
  var btn, chart, chkbox, div, div2, form, img, lbl, option, radio, select, settings, span, txtbox;

  div = document.createElement('div');
  div.setAttribute('id', 'settings');
  
  form = document.createElement('form');
  form.setAttribute('id', 'place-form');
  
  div2 = document.createElement('div');
  div2.setAttribute('class', 'form-heading');
  div2.setAttribute('style', 'margin-top:0px');
  div2.innerHTML = "Steward Place Settings";
  form.appendChild(div2);
  
  form.appendChild(labeledBox('STEWARD NAME', 'stewardName', 50, ''));
  form.appendChild(labeledBox('STREET ADDRESS', 'physical', 70, ''));
  div2 = document.createElement('div');
  div2.setAttribute('class', 'big-instructions');
  div2.innerHTML = "Coordinates";
  btn = document.createElement('input');
  btn.setAttribute('type', 'image');
  btn.setAttribute('src', 'images/form-button-one-blue.svg');
  btn.setAttribute('value', 'Use Browser Geolocation');
  btn.setAttribute('style', 'float: right; margin-right: -10px;');
  btn.setAttribute('onclick', 'javascript:return geolocate()');
  div2.appendChild(btn);
  btn = document.createElement('input');
  btn.setAttribute('type', 'image');
  btn.setAttribute('src', 'images/form-button-two-blue.svg');
  btn.setAttribute('value', 'Use Geocoding from Street Address');
  btn.setAttribute('style', 'float: right;');
  btn.setAttribute('onclick', 'javascript:return geocode()');
  div2.appendChild(btn);
  form.appendChild(div2);
  
  div2 = document.createElement('div');
  div2.setAttribute('class', 'formtext-container-left');
  div2.setAttribute('style', 'margin-bottom: 20px');
  div2.appendChild(labeledBox('LATITUDE', 'latitude', 20, ''));
  form.appendChild(div2);
  
  div2 = document.createElement('div');
  div2.setAttribute('class', 'formtext-container-right');
  div2.setAttribute('style', 'margin-bottom: 20px');
  div2.appendChild(labeledBox('LONGITUDE', 'longitude', 20, ''));
  form.appendChild(div2);
  form.appendChild(document.createElement('hr'));

  div.appendChild(form);

  form = document.createElement('form');
  form.setAttribute('id', 'cloud-form');

  div2 = document.createElement('div');
  div2.setAttribute('class', 'form-heading');
  div2.innerHTML = "Cloud Services";
  form.appendChild(div2);

  select = document.createElement('select');
  select.setAttribute('id', 'bootableChoice');
  select = addBootables(select);
  form.appendChild(select);
  
  span = document.createElement('span')
  span.setAttribute('id', 'cloud-instructions');
  span.innerHTML = "&larr; " + bootable[select.value].text;
  form.appendChild(span);
  
  var labelArray = labeledBoxes(select);
  form.appendChild(labelArray[0]);
  form.appendChild(labelArray[1]);
  
  btn = document.createElement('input');
  btn.setAttribute('type', 'image');
  btn.setAttribute('src', 'images/form-button-four-blue.svg');
  btn.setAttribute('value', 'Add Cloud Service');
  btn.setAttribute('style', 'float: right; margin-right: -10px; margin-top: 10px;');
  btn.setAttribute('onclick', 'javascript:return addCloud(event);');

  form.appendChild(btn);

  img = document.createElement('img');
  img.setAttribute('src', 'popovers/assets/done_on.svg');
  img.setAttribute('style', 'float: right; margin-right: -10px;  margin-top: 10px; clear: both;');
  img.setAttribute('onclick', 'javascript:return closeSettings(event);');
  form.appendChild(img);
  div.appendChild(form);
  document.body.appendChild(div);
  
  
  document.getElementById("stewardName").addEventListener('change', function(evt) {place_info.name = evt.target.value; savePlace(event); });
  document.getElementById("physical").addEventListener('change', function(evt) {place_info.physical = evt.target.value; savePlace(event); });
  document.getElementById("latitude").addEventListener('change', function(evt) {place_info.location[0] = evt.target.value; savePlace(event); });
  document.getElementById("longitude").addEventListener('change', function(evt) {place_info.location[1] = evt.target.value; savePlace(event); });
  document.getElementById("bootableChoice").addEventListener('change', pickBootable);
  document.getElementById("bootChoice0").addEventListener('change', stowInfo);
  document.getElementById("bootChoice1").addEventListener('change', stowInfo);

  fillPlaceFields();
  
  // Create label & text input elements
  function labeledBox(lblTxt, boxID, size, val, pwd) {
	  lbl = document.createElement('label');
	  lbl.setAttribute('for', boxID);
	  span = document.createElement('span');
	  span.innerHTML = lblTxt + ':&nbsp;&nbsp;';
	  lbl.appendChild(span);
	
	  txtbox = document.createElement('input');
	  txtbox.setAttribute('type', (pwd) ? 'password' : 'text');
	  txtbox.setAttribute('id', boxID);
	  txtbox.setAttribute('class', 'formtext');
	  txtbox.setAttribute('size', size);
	  txtbox.setAttribute('value', val);
	  lbl.appendChild(txtbox);
	  
	  return lbl;
  }
  
  // Create pair of label & text input elements for networked products
  function labeledBoxes(select) {
    var choice = select.value;
    var keys = getKeys(bootable[choice].info);
    var labels = [];
    labels[0] = labeledBox(keys[0].toUpperCase(), 'bootChoice0', 20, bootable[choice].info[keys[0]]);
    labels[1] = labeledBox(keys[1].toUpperCase(), 'bootChoice1', 20, bootable[choice].info[keys[1]], true);
    return labels;
  }
  
  // Populate select element with networked product names
  function addBootables(select) {
    var optgroup, option
    var keys = getKeys(bootable);
    
    optgroup = document.createElement('optgroup');
    optgroup.setAttribute('label', 'Choose a Service');
    select.appendChild(optgroup);

    for (var i = 0; i < keys.length; i++) {
      option = document.createElement('option');
      option.setAttribute('value', keys[i]);
      option.innerHTML = keys[i];
      optgroup.appendChild(option);
    }
    return select;
  }
  
  // Retrieve object keys for use as labels & select values
  function getKeys(obj) {
    var keys = [];
    for(var k in obj) keys.push(k);
    return keys;
  }
  
}

var closeSettings = function(evt) {
  if (document.getElementById("settings")) document.body.removeChild(document.getElementById("settings"));
  stack = [];
  setTimeout(main, 500);
  return false;
}

var pickBootable = function(evt) {
  var choice = evt.target.value;
  var info = bootable[choice].info;
  var keys = Object.keys(info);
  document.getElementById("cloud-instructions").innerHTML = "&larr; " + bootable[choice].text;
  document.getElementById("bootChoice0").labels[0].firstChild.innerHTML = keys[0].toUpperCase() + ":&nbsp;&nbsp;";
  document.getElementById("bootChoice0").value = info[keys[0]];
  if (keys[1]) {
    document.getElementById("bootChoice1").labels[0].firstChild.innerHTML = keys[1].toUpperCase() + ":&nbsp;&nbsp;";
    document.getElementById("bootChoice1").value = info[keys[1]];
    document.getElementById("bootChoice1").labels[0].style.visibility = "visible";
  } else {
    document.getElementById("bootChoice1").labels[0].style.visibility = "hidden";
  }
}

var stowInfo = function(evt) {
  var choice = document.getElementById("bootableChoice").value;
  var info = bootable[choice].info;
  var keys = Object.keys(info);
  for (var i = 0; i < keys.length; i++) {
    bootable[choice].info[keys[i]] = document.getElementById("bootChoice" + i).value;
  }
}

function geolocate() {
  navigator.geolocation.getCurrentPosition(
	function(pos) {
	  place_info.location = [ pos.coords.latitude, pos.coords.longitude ];
	  document.getElementById("latitude").value  = pos.coords.latitude;
	  document.getElementById("longitude").value = pos.coords.longitude;
	  savePlace();
	},
	function(err) {
	  switch (err.code) {
		case 1:
		  alert("Permission denied by user.");
		  break;
		case 2:
		  alert("Position unavailable.");
		  break;
		case 3:
		  alert("Service timed out.");
		  break;
		default:
		  alert("Position error:" + err.message);
	  }
	},
	{'enableHighAccuracy': false, 'timeout': 10000, 'maximumAge': 0});
	return false;

}

function geocode() {
  var physical = document.getElementById("physical");
  if (physical.value.length > 0) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
		var message, state;
	
		try {
		  if (this.readyState === 4) {
			message = JSON.parse(this.responseText);
			if (!message) throw new Error('invalid JSON: ' + this.responseText);
			if (message.status === 'OK') {
			  message = message.results[0];
			  physical.value = message.formatted_address;
			  place_info.physical = message.formatted_address;
			  place_info.location = [ message.geometry.location.lat, message.geometry.location.lng ];
			  document.getElementById("latitude").value  = message.geometry.location.lat;
			  document.getElementById("longitude").value = message.geometry.location.lng;
			  savePlace();
			  
			} else {
			  alert('Sorry, the address cannot be converted to coordinates.');
			}
		  }
		} catch(ex) { console.log(ex); }
	  }.bind(req);
	  var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + physical.value.replace(/\s/g, "+") 
		   + '&sensor=false'
	  req.open('GET', url , true);
	  req.send(null);
  } else {
    alert("Please enter a street address.");
  }
  return false;
}


var fillPlaceFields = function() {
  var entry, keys;
  document.getElementById("stewardName").value = place.name || "";
  document.getElementById("physical").value = place.info.physical || "";
  if (place.info.location) {
	  document.getElementById("latitude").value = place.info.location[0] || "";
	  document.getElementById("longitude").value = place.info.location[1] || "";
  }
  
}

var savePlace = function(evt) {
  var val = JSON.stringify({ path    : '/api/v1/actor/perform/place'
                         , requestID : "3"
                         , perform   : "set"
                         , parameter : JSON.stringify(place_info) || ''
                         });
  wsSend(val);
}

var addCloud = function(evt) {
  var val, emptyP = false, entry;
  var name = document.getElementById("bootableChoice").value;
  var info = bootable[name].info;

  entry = bootable[name];
  for (prop in info) if ((info.hasOwnProperty(prop)) && (info[prop] === '')) emptyP = true;
  if (!emptyP) {
    val = JSON.stringify({ path      : '/api/v1/device/create/' + name
                         , requestID : "3"
                         , name      : name
                         , whatami   : entry.actor
                         , info      : info || {}
                         });
    wsSend(val);
    alert(name + " cloud service added to the steward.")
    document.getElementById("bootChoice0").value = "";
    document.getElementById("bootChoice1").value = "";
  }

}

var place_info   = { name        : 'Home'
                   , physical    : ''
                   , location : [ 39.50000, -98.35000 ]
                   };

var bootable = { prowl          :
                 { text         : 'If you have a Prowl account, the steward can automatically update you with alerts, etc.'
                 , instructions : 'Generate an API key.'
                 , site         : 'https://prowlapp.com/login.php'
                 , icon         : ''
                 , name         : 'prowler'
                 , actor        : '/device/indicator/text/prowl'
                 , info         :
                   { name       : 'prowler'
                   , apikey     : ''
                   }
                 }
               , netatmo        :
                 { text         : 'If you have a Netatmo weather station, the steward can manage it for you.'
                 , instructions : 'Enter your email and password.'
                 , site         : 'https://my.netatmo.com'
                 , icon         : ''
                 , name         : 'netatmo'
                 , actor        :'/device/gateway/netatmo/cloud'
                 , info         :
                   { email      : ''
                   , passphrase : ''
                   }
                 }
               , nest           :
                 { text         : 'If you have a Nest thermostat, the steward can manage it for you.'
                 , instructions : 'Enter your email address and password.'
                 , site         : 'https://home.nest.com'
                 , icon         : ''
                 , name         : 'nest'
                 , actor        : '/device/gateway/nest/cloud'
                 , info         :
                   { email      : ''
                   , passphrase : ''
                   }
                 }
               , tesla          :
                 { text         : 'If you have a Tesla Model S, the steward can monitor it for you.'
                 , instructions : 'Enter your email address and password.'
                 , site         : 'https://teslamotors.com/mytesla'
                 , icon         : ''
                 , name         : 'tesla'
                 , actor        : '/device/gateway/tesla/cloud'
                 , info         :
                   { email      : ''
                   , passphrase : ''
                   }
                 }
               , xively         :
                 { text         : 'If you have an Xively (nee cosm) account, the steward can automatically upload measurements.'
                 , instructions : 'Create a "device" and xively will automatically generate a device key (apikey) and feed'
                 , site         : 'https://xively.com/login'
                 , icon         : ''
                 , name         : 'xively'
                 , actor        : '/device/indicator/text/xively'
                 , info         :
                   { apikey     : ''
                   , feed       : ''
                   }
                 }
               };

