/*    cloud.js    a backend API for SNAP!    written by Jens Mšnig    Copyright (C) 2013 by Jens Mšnig    This file is part of Snap!.     Snap! is free software: you can redistribute it and/or modify    it under the terms of the GNU Affero General Public License as    published by the Free Software Foundation, either version 3 of    the License, or (at your option) any later version.    This program is distributed in the hope that it will be useful,    but WITHOUT ANY WARRANTY; without even the implied warranty of    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    GNU Affero General Public License for more details.    You should have received a copy of the GNU Affero General Public License    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/// Global settings //////////////////////////////////////////////////////*global modules, IDE_Morph, SnapSerializer, hex_sha512*/modules.cloud = '2013-January-07';// Global stuffvar Cloud;

var SnapCloud = new Cloud(
    '192.168.2.108:8087/miocon/app/login?_app=SnapCloud'
);
// Cloud /////////////////////////////////////////////////////////////function Cloud(url) {    this.url = url;    this.session = null;    this.api = {};}

Cloud.prototype.disconnect = function () {
    this.session = null;
    this.api = {};
};

// Cloud: Snap! API
Cloud.prototype.login = function (    username,    password,    callBack,    errorCall) {    // both callBack and errorCall are two-argument functions    var request = new XMLHttpRequest(),        session = Date.now().toString(),        pwHash = hex_sha512("miosoft%20miocon,"            + session + ","            + encodeURIComponent(username) + ","            + hex_sha512(password)            ),        myself = this;    try {        request.open(            "GET",            'http://'                + this.url                + '&Username='                + username                + '&Password='                + pwHash                + '&Session='                + session,            true        );        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {                    myself.api = myself.parseAPI(request.responseText);                    myself.session = request.getResponseHeader('MioCracker')
                        .split(';')[0];
                    if (myself.api.logout) {                        callBack.call(null, myself.api, 'Snap!Cloud');
                    } else {
                        errorCall.call(
                            null,
                            'unknown username or password'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url,
                        'could not connect to:'
                    );
                }            }        };        request.send(null);    } catch (err) {        errorCall.call(this, err.toString(), 'Snap!Cloud');    }};

Cloud.prototype.saveProject = function (ide, callBack, errorCall) {
    this.callService(
        'saveProject',
        callBack,
        errorCall,
        [ide.projectName, ide.serializer.serialize(ide.stage)]
    );
};

Cloud.prototype.getProjectList = function (callBack, errorCall) {
    this.callService(
        'getProjectList',
        callBack,
        errorCall
    );
};

Cloud.prototype.getProjectByName = function (
    projectName,
    callBack,
    errorCall
) {
    this.callService(
        'getProject',
        callBack,
        errorCall,
        [projectName]
    );
};

Cloud.prototype.deleteProjectByName = function (
    projectName,
    callBack,
    errorCall
) {
    this.callService(
        'deleteProject',
        callBack,
        errorCall,
        [projectName]
    );
};

Cloud.prototype.logout = function (callBack, errorCall) {
    this.disconnect();
    this.callService(
        'logout',
        callBack,
        errorCall
    );
};

// Cloud: backend communication

Cloud.prototype.callURL = function (url, callBack, errorCall) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open('GET', url, true);
        request.withCredentials = true;
        request.setRequestHeader('Content-Type', 'text/plain');
        request.setRequestHeader('MioCracker', this.session);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var responseList = myself.parseResponse(
                        request.responseText
                    );
                    callBack.call(null, responseList, url);
                } else {
                    errorCall.call(
                        null,
                        url,
                        'no response from:'
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), url);
    }
};

Cloud.prototype.callService = function (
    serviceName,
    callBack,
    errorCall,
    args
) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        service = this.api[serviceName],
        myself = this,
        postDict;
    if (!this.session) {
        errorCall.call('You are not logged in', 'Cloud');
        return;
    }
    if (!service) {
        errorCall.call('service ' + serviceName + ' is not available', 'API');
        return;
    }
    if (args && args.length > 0) {
        postDict = {};
        service.parameters.forEach(function (parm, idx) {
            postDict[parm] = args[idx];
        });
    }
    try {
        request.open(service.method, service.url, true);
        request.withCredentials = true;
        request.setRequestHeader('Content-Type', 'text/plain');
        request.setRequestHeader('MioCracker', this.session);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var responseList = myself.parseResponse(
                        request.responseText
                    );
                    callBack.call(null, responseList, service.url);
                } else {
                    errorCall.call(
                        null,
                        service.url,
                        'no response from:'
                    );
                }
            }
        };
        request.send(this.encodeDict(postDict));
    } catch (err) {
        errorCall.call(this, err.toString(), service.url);
    }
};

// Cloud: payload transformation
Cloud.prototype.parseAPI = function (src) {    var api = {},        services;    services = src.split(" ");    services.forEach(function (service) {        var entries = service.split("&"),            serviceDescription = {},            parms;        entries.forEach(function (entry) {            var pair = entry.split("="),                key = decodeURIComponent(pair[0]).toLowerCase(),                val = decodeURIComponent(pair[1]);            if (key === "service") {                api[val] = serviceDescription;            } else if (key === "parameters") {                parms = val.split(",");                if (!(parms.length === 1 && !parms[0])) {                    serviceDescription.parameters = parms;                }            } else {                serviceDescription[key] = val;            }        });    });    return api;};Cloud.prototype.parseResponse = function (src) {    var ans = [],        lines;    lines = src.split(" ");    lines.forEach(function (service) {        var entries = service.split("&"),            dict = {};        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]),                val = decodeURIComponent(pair[1]);            dict[key] = val;        });        ans.push(dict);    });    return ans;};Cloud.prototype.encodeDict = function (dict) {    var str = '',        pair,        key;
    if (!dict) {return null; }    for (key in dict) {        if (dict.hasOwnProperty(key)) {            pair = encodeURIComponent(key)                + '='                + encodeURIComponent(dict[key]);            if (pair.length > 0) {                str += '&';            }            str += pair;        }    }    return str;};