module.exports.cadastrodespesa = function (application, req, res) {
    
    let conn = application.config.dbConnection;
    let dao = new application.app.models.DespesaDAO(conn);

    dao.getTipodespesa(req, res);
}

module.exports.getTipodespesa = function (application, req, res) {
    let conn = application.config.dbConnection;
    let dao = new application.app.models.DespesaDAO(conn);

    dao.getTipodespesa(req, res, function (err, dados) {
        res.send(dados);
    });
}

module.exports.inserirdespesa = function (application, req, res) {
   
    let dadosForm = req.body;
    
    
    req.assert("despesa", "Descrição não pode ser em branco").notEmpty();
    req.assert("valor", "Valor não pode ser em branco").notEmpty();
    req.assert("tipodespesa", "Tipo da despesa não pode ser em branco").notEmpty();
    req.assert("data", "Data não pode ser em branco").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.send({ result: errors});
        return;
    }


    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.inserirdespesa(res, dadosForm);
}

module.exports.listadespesas = function (application, req, res) {
   
    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);
    DespesaDAO.listadespesas(res);

}

module.exports.deletardespesa = function (application, req, res) {
    let id = req.params.id;

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.deletardespesa(id, res);
}

module.exports.recuperardespesa = function (application, req, res) {
    let id = req.params.id;
    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.recuperardespesa(id, res);
}

module.exports.editardespesa = function (application, req, res) {
    let id = req.params.id;   

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.editardespesa(id, req, res);
}

module.exports.despesames = function (application, req, res) {
    let mesano = req.params.data; 
 
   
    let data = new Date( mesano +"-1" );
    
    let datainicial = new Date(data.getFullYear(), data.getMonth(), 1);
    let datafinal = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);   

    DespesaDAO.getdeespesames(req, res, datainicial, datafinal);  
}




module.exports.tipodespesa = function (application, req, res) {
    res.render("tipodespesa", { validacao: {}, dadosform: {} });
}

module.exports.cadastrartipodespesa = function (application, req, res) {
    let dadosForm = req.body;

    req.assert("id", "Campo ID não pode estar em branco").notEmpty();
    req.assert("tipodespesa", "Campo Tipo de Despesa não pode estar em branco").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render("tipodespesa", { validacao: errors, dadosform: dadosForm });
        return;
    }

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.cadastrartipodespesa(dadosForm);

    res.render("tipodespesa", { validacao: {}, dadosform: {} });
}

module.exports.listatipodespesa = function (application, req, res) {

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.recuperartipodespesa(req, res);

}

module.exports.deletartipodespesa = function (application, req, res) {
    let url_query = req.query;

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    let _id = url_query.id_tpdespesa;

    DespesaDAO.deletartipodespesas(_id, res);
}
