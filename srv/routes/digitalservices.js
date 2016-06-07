var digitalServicesData = require('../data')('digitalservices');
var u = require('../util');

exports.configure = function(app) {
    app.get('/api/digitalservices', u.requestHelper(getAll));
    app.get('/api/digitalservices/:id', u.requestHelper(getOne));
    app.post('/api/digitalservices/', u.requestHelper(save));
    app.delete('/api/digitalservices/:id', u.requestHelper(remove));
    app.put('/api/digitalservices/:id', u.requestHelper(update));
};

function getAll() {
   return digitalServicesData.getAll();
}

function getOne(req) {
    var id = req.params.id;
    return digitalServicesData.getOne(id);
}

function save(req) {
    var digitalService = req.body;
    return digitalServicesData.save(digitalService);
}

function update(req) {
    var id = req.params.id;
    var digitalService = {
        id: id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description
    };
    return digitalServicesData.update(digitalService);
}

function remove(req) {
    var id = req.params.id;
    return digitalServicesData.remove(id);
};


