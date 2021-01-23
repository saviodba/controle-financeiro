module.exports.cadastrodespesa = function (application, req, res) {
    res.render("cadastrodespesa", { validacao: {}, dadosform: {} });
}

module.exports.inserirdespesa = function (application, req, res) {
    let dadosForm = req.body;
  
    req.assert("despesa", "Descrição não pode ser em branco").notEmpty();
    req.assert("valor", "Valor não pode ser em branco").notEmpty();
    req.assert("data", "Data não pode ser em branco").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render("cadastrodespesa", { validacao: errors, dadosform: dadosForm });
        return;
    }


    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.inserirdespesa(dadosForm);
    res.redirect('/lista');

}

module.exports.listadespesas = function (application, req, res) {

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);
    DespesaDAO.listadespesas(res);

}

module.exports.deletardespesa = function (application, req, res) {
    let url_query = req.query;

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    let _id = url_query.id_despesa;

    DespesaDAO.deletardespesas(_id, res);
}

module.exports.recuperardespesa = function (application, req, res) {
    let url_query = req.query;
    let _id = url_query.id;
    
    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);


    DespesaDAO.recuperardespesa(_id, res);
}

module.exports.editardespesa = function (application, req, res) {
    let url_query = req.query;
    let _id = url_query.id;

    let connection = application.config.dbConnection;      
    let DespesaDAO = new application.app.models.DespesaDAO(connection);
       
    DespesaDAO.editardespesa(  _id , req, res );
}
