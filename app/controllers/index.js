module.exports.index = function (application, req, res) {

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    DespesaDAO.somarDespesas(req, res);

}

module.exports.menu = function (application, req, res) {
    res.render("menu");
}


