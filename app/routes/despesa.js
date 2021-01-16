module.exports = function (application) {

    application.get('/cadDespesa', function (req, res) {
        application.app.controllers.despesa.cadastroDespesa(application, req, res);
    });

    application.get('/listaDespesas', function (req, res) {
        application.app.controllers.despesa.listadespesas(application, req, res);
    });

    application.post('/cadDespesa', function (req, res) {
        application.app.controllers.despesa.inserirDespesa(application, req, res);

    });

    application.get('/delDespesas', function (req, res) {
        application.app.controllers.despesa.deletarDespesa(application, req, res);

    });

    application.get('/editdespesa', function (req, res) {
        application.app.controllers.despesa.editarDespesa(application, req, res);

    });

    application.post('/editardespesa', function (req, res) {
        //application.app.controllers.despesa.editarDespesa(application, req, res);
        dados = req.body;


    });
}
