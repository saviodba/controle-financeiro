module.exports = function (application) {

    application.get('/', function (req, res) {
        application.app.controllers.despesa.index(application, req, res);
    });

    application.post('/', function (req, res) {
        application.app.controllers.despesa.cadastrodespesa(application, req, res);
    });

    application.get('/despesas', function (req, res) {
        application.app.controllers.despesa.lista(application, req, res);
    });

    application.get('/cadastro', function (req, res) {
        application.app.controllers.despesa.cadastro(application, req, res);
    });

    application.get('/tipodespesa', function (req, res) {
        application.app.controllers.despesa.tipodespesa(application, req, res);
    });

    application.get('/menu', function (req, res) {
        application.app.controllers.despesa.menu(application, req, res);
    });
}
