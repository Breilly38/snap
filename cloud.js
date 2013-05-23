/*

var SnapCloud = new Cloud(
    '192.168.2.108:8087/miocon/app/login?_app=SnapCloud'
);


Cloud.prototype.disconnect = function () {
    this.session = null;
    this.api = {};
};

// Cloud: Snap! API

            if (request.readyState === 4) {
                if (request.responseText) {
                        .split(';')[0];
                    if (myself.api.logout) {
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
                }

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

            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]),
    if (!dict) {return null; }