module.exports = function(moduleName) {
    var provider = 'stubs';
    return require('./data/' + provider + '/' + moduleName);
};
