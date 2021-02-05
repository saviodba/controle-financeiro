module.exports.index = function (application, req, res) {

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);

    let data = new Date();
    let mes = data.getMonth();
    let ano = data.getFullYear();
   
    switch (mes) {
        case 0: mes = "01"; break;
        case 1: mes = "02"; break;
        case 2: mes = "03"; break;
        case 3: mes = "04"; break;
        case 4: mes = "05"; break;
        case 5: mes = "06"; break;
        case 6: mes = "07"; break;
        case 7: mes = "08"; break;
        case 8: mes = "09"; break;
        case 9: mes = "10"; break;
        case 10: mes = "11"; break;
        case 11: mes = "12"; break;
    }

    let mesano = ano + "-" + mes;
    
    let datainicial = new Date(data.getFullYear(), data.getMonth(), 1);
    let datafinal = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    DespesaDAO.getDespesaMes(req, res, datainicial, datafinal, function (valorFormatado, dados) {
        res.render("index", { valorFormatado, mesano, dados });
    });

}

module.exports.getIndexMes = function (application, req, res) {
    let dados = req.query;
    let mesano = dados.mes;

    let data = new Date( dados.mes +"-1" );
    
    let datainicial = new Date(data.getFullYear(), data.getMonth(), 1);
    let datafinal = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    let connection = application.config.dbConnection;
    let DespesaDAO = new application.app.models.DespesaDAO(connection);   

    DespesaDAO.getDespesaMes(req, res, datainicial, datafinal, function(valorFormatado, dados){

        res.render("index", { valorFormatado, mesano, dados });
    });  
}

module.exports.menu = function (application, req, res) {
    res.render("menu");
}



