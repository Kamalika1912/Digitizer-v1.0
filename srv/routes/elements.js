var elementsData = require('../data')('elements');
var u = require('../util');

exports.configure = function(app) {
    app.get('/api/elements', u.requestHelper(getAll));
    app.get('/api/elements/:id', u.requestHelper(getOne));
    app.post('/api/elements/', u.requestHelper(save));
    app.delete('/api/elements/:id', u.requestHelper(remove));
    app.put('/api/elements/:id', u.requestHelper(update));
};

function getAll() {
   return elementsData.getAll();
}

function getOne(req) {
    var id = req.params.id;
    return elementsData.getOne(id);
}

function save(req) {
    var element = req.body;
    return elementsData.save(element);
}

function update(req) {
    var id = req.params.id;
    var element = {
        id: id,
        model_element: req.body.model_element,
        tags: req.body.tags
    };
    return elementsData.update(element);
}

function remove(req) {
    var id = req.params.id;
    return elementsData.remove(id);
};


