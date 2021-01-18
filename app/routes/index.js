module.exports = function (application) {

    application.get('/', function (req, res) {
        application.app.controllers.index.index(application, req, res);
    });

    application.get('/menu', function (req, res) {
        application.app.controllers.index.menu(application, req, res);
    });
}
