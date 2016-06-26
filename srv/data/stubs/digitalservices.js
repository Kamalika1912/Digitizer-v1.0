var q = require('q');
var stubs = require("../json/digitalservices.json");

var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var digitalService = null;
    stubs.some( function(stub)  {
        digitalService = stub.id == id ? stub : null;
        return digitalService;
    });
    return q(digitalService);
}

function save(digitalService) {
    digitalService.id = 'D' + ++lastStubIndex;
    stubs.push(digitalService);
    return q(digitalService);
}

function update(digitalService) {
    var stubToUpdateIndex = _getStubIndexById(digitalService.id);
    stubs[stubToUpdateIndex] = digitalService;
    return q(digitalService);
}

function remove(id) {
    var stubToDeleteIndex = _getStubIndexById(id);
    stubToDeleteIndex != -1 && stubs.splice(stubToDeleteIndex,1);
    return q(stubToDeleteIndex != -1 && id);
}

function _getStubIndexById(id) {
    var stubIndex = -1;
    stubs.some( function(stub, index)  {
        var isFound = stub.id == id;
        stubIndex = isFound ? index : -1
        return isFound;
    });
    return stubIndex;
}

exports.getAll =  getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.update = update;
exports.save = save;
