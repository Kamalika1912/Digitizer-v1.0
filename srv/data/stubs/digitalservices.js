var q = require('q');
var stubs = [
    {
        id: 1,
        title: 'Taxi Hiring App',
        description: "This project digitizes the business procedure model of a taxi hiring app. Inspiration: Uber, Lyft ",
        date: "2016-01-07T15:10:13.022Z"
    },
    {
        id: 2,
        title: 'Apartment Renting and Lodging',
        description: "This project digitizes the apartment renting and lodging business. Inspiration: AirBnB",
        date: "2016-03-24T14:40:36.022Z"
    },
    {
        id: 3,
        title: 'Emergency Healthcare',
        description: 'This project digitizes the process of providing medical attention in an emergency. Inspiration: Ginger.io',
        date: "2016-02-01T09:01:25.022Z"
    },
    {
        id: 4,
        title: 'Moving and Delivery on demand',
        description: 'This project digitizes the business model of moving and delivery on-demand. Inspiration:BuddyTruk, Muver, GoShare',
        date: "2016-02-29T16:41:58.022Z"
    },
    {
        id: 5,
        title: 'Borrowing/Lending items',
        description: 'This project enables people to borrow the things they need from others in their neighborhood. Inspiration: Peerby',
        date: "2015-03-16T18:20:04.022Z"
    }

];

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
    digitalService.id = ++lastStubIndex;
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
