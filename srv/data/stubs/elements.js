var q = require('q');
var jsonfile = require('jsonfile');
var stubs = require('../json/elements.json');
var file = '../json/elements.json';


var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var element = null;
    stubs.some( function(stub)  {
        element = stub.id == id ? stub : null;
        return element;
    });
    return q(element);
}

function save(element) {
    element.id = 'A'+ ++lastStubIndex;
    stubs.push(element);
  console.log(JSON.stringify(element));
    return q(element);
  jsonfile.writeFile(file, element, function (err) {
    console.error(err)
  });
}

function update(element) {
    var stubToUpdateIndex = _getStubIndexById(element.id);
    stubs[stubToUpdateIndex] = element;
  //console.log(JSON.stringify(element));
    return q(element);
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
