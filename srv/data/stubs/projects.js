var q = require('q');
var stubs = require("../json/projects.json");

var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var project = null;
    stubs.some( function(stub)  {
        project = stub.id == id ? stub : null;
        return project;
    });
    return q(project);
}

function save(project) {
    project.id = ++lastStubIndex;
    stubs.push(project);
    return q(project);
}

function update(project) {
    var stubToUpdateIndex = _getStubIndexById(project.id);
    stubs[stubToUpdateIndex] = project;
    return q(project);
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
