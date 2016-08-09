var activitiesData = require('../data')('activities');
var u = require('../util');

exports.configure = function(app) {
    app.get('/api/activities', u.requestHelper(getAll));
    app.get('/api/activities/:id', u.requestHelper(getOne));
    app.post('/api/activities/', u.requestHelper(save));
    app.delete('/api/activities/:id', u.requestHelper(remove));
    app.put('/api/activities/:id', u.requestHelper(update));
};

function getAll() {
   return activitiesData.getAll();
}

function getOne(req) {
    var id = req.params.id;
    return activitiesData.getOne(id);
}

function save(req) {
    var activity = req.body;
    return activitiesData.save(activity);
}

function update(req) {
    var id = req.params.id;
    var activity = {
        id: id,
        modelActivity: req.body.modelActivity,
        tags: req.body.tags
    };
    return activitiesData.update(activity);
}

function remove(req) {
    var id = req.params.id;
    return activitiesData.remove(id);
};


