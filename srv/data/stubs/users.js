var q = require('q');
var stubs = require("../json/users.json");

var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
   return getOneBy({id: id});
};

function getOneBy(queryProperty) {
    var propertyName = Object.keys(queryProperty)[0];
    var propertyValue = queryProperty[propertyName];
    var user = null;
    stubs.some( function(stub)  {
        user = stub[propertyName] == propertyValue ? stub : null;
        return user;
    });
    return q(user);
}

function save(user) {
    user.id = ++lastStubIndex;
    stubs.push(user);
    return q(user);
}

function update(user) {
    var stubToUpdateIndex = _getStubIndexById(user.id);
    stubs[stubToUpdateIndex] = user;
    return q(user);
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

exports.getOne = getOne;
exports.getOneBy = getOneBy;
exports.getAll =  getAll;
exports.remove = remove;
exports.update = update;
exports.save = save;
