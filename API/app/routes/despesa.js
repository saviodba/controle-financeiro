module.exports = function (application) {

    application.get('/api', function (req, res) {
        application.app.controllers.despesa.listadespesas(application, req, res);
    });

    application.get('/api/:id', function (req, res) {
        application.app.controllers.despesa.recuperardespesa(application, req, res);
    });

    application.get('/data/:data', function (req, res) {
        application.app.controllers.despesa.despesames(application, req, res);
    });

    application.post('/api', function (req, res) {
        res.setHeader("Acces-Control-Allow-Origin","*");
        application.app.controllers.despesa.inserirdespesa(application, req, res);

    });

    application.delete('/api/:id', function (req, res) {
        application.app.controllers.despesa.deletardespesa(application, req, res);
    });

    application.put('/api/:id', function (req, res) {
        application.app.controllers.despesa.editardespesa(application, req, res);
    });




    application.post('/despesa', function (req, res) {
        application.app.controllers.despesa.editardespesa(application, req, res);
    });

    application.get('/tipodespesa', function (req, res) {
        application.app.controllers.despesa.tipodespesa(application, req, res);
    });

    application.post('/tipodespesa', function (req, res) {
        application.app.controllers.despesa.cadastrartipodespesa(application, req, res);
    });

    application.get('/listatipodespesa', function (req, res) {
        application.app.controllers.despesa.listatipodespesa(application, req, res);
    });

    application.get('/getTipodespesa', function (req, res) {
        application.app.controllers.despesa.getTipodespesa(application, req, res);
    });

    application.get('/deletartipodespesa', function (req, res) {
        application.app.controllers.despesa.deletartipodespesa(application, req, res);
    });
}
