module.exports.cadastroDespesa = function (application, req, res) {
    res.render("cadDespesa", { validacao: {}, dadosform: {} });
}

module.exports.inserirDespesa = function (application, req, res) {
    let dadosForm = req.body;

    req.assert("despesa", "Descrição não pode ser em branco").notEmpty();
    req.assert("valor", "Valor não pode ser em branco").notEmpty();
    req.assert("data", "Data não pode ser em branco").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render("cadDespesa", { validacao: errors, dadosform: dadosForm });
        return;
    }


    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.inserirDespesa(dadosForm);
    res.redirect('/listaDespesas');

}

module.exports.listadespesas = function (application, req, res) {

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);
    DespesaDAO.recuperarDespesas(res);

}

module.exports.deletarDespesa = function (application, req, res) {
    let url_query = req.query;

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    let _id = url_query.id_despesa;

    DespesaDAO.deletarDespesas(_id, res);
}

module.exports.editarDespesa = function (application, req, res) {
    let url_query = req.query;
    console.log(url_query.despesa);

    // let connection = application.config.dbConnection;
    // let DespesaDAO = new application.app.models.DespesaDAO(connection);

    // let _id = url_query.id_despesa;

    // DespesaDAO.editarDespesa(_id, res);
}

