var q = require('q');
var jsonfile = require('jsonfile');
var stubs = require('../json/activities.json');
var file = '../json/activities.json';


var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var activity = null;
    stubs.some( function(stub)  {
        activity = stub.id == id ? stub : null;
        return activity;
    });
    return q(activity);
}

function save(activity) {
    activity.id = 'A'+ ++lastStubIndex;
    stubs.push(activity);
    return q(activity);
  jsonfile.writeFile(file, activity, function (err) {
    console.error(err)
  });
}

function update(activity) {
    var stubToUpdateIndex = _getStubIndexById(activity.id);
    stubs[stubToUpdateIndex] = activity;
  //console.log(JSON.stringify(activity));
    return q(activity);
  jsonfile.writeFile(file, stubs, function (err) {
    console.error(err)
  });

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
