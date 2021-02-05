module.exports.index = function (application, req, res) {
    res.render("index");    
}

module.exports.lista = function (application, req, res) {
    res.render("listadespesas");    
}

module.exports.cadastro = function (application, req, res) {
    res.render("cadastrodespesa");    
}

module.exports.tipodespesa = function (application, req, res) {
    res.render("tipodespesa");    
}

module.exports.menu = function (application, req, res) {
    res.render("menu");    
}
   