module.exports = function (application) {

    application.get('/cadastro', function (req, res) {
        application.app.controllers.despesa.cadastrodespesa(application, req, res);
    });

    application.get('/lista', function (req, res) {
        application.app.controllers.despesa.listadespesas(application, req, res);
    });

    application.post('/cadastro', function (req, res) {
        application.app.controllers.despesa.inserirdespesa(application, req, res);

    });

    application.get('/deletar', function (req, res) {
        application.app.controllers.despesa.deletardespesa(application, req, res);

    });

    application.get('/despesa', function (req, res) {
        application.app.controllers.despesa.recuperardespesa(application, req, res);

    });

    application.post('/despesa', function (req, res) {   
        application.app.controllers.despesa.editardespesa(application, req, res);
    });
}
