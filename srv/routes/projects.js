var projectsData = require('../data')('projects');
var u = require('../util');

exports.configure = function(app) {
    app.get('/api/projects', u.requestHelper(getAll));
    app.get('/api/projects/:id', u.requestHelper(getOne));
    app.post('/api/projects/', u.requestHelper(save));
    app.delete('/api/projects/:id', u.requestHelper(remove));
    app.put('/api/projects/:id', u.requestHelper(update));
};

function getAll() {
   return projectsData.getAll();
}

function getOne(req) {
    var id = req.params.id;
    return projectsData.getOne(id);
}

function save(req) {
    var project = req.body;
    return projectsData.save(project);
}

function update(req) {
    var id = req.params.id;
    var project = {
        id: id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description
    };
    return projectsData.update(project);
}

function remove(req) {
    var id = req.params.id;
    return projectsData.remove(id);
};


