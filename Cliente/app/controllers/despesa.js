let assert = require('assert');

module.exports.index = function (application, req, res) {
    res.render("index");
}

module.exports.cadastrodespesa = function (application, req, res) {
    application.client.post('/api', req.body, function (err, request, response, obj) {
        assert.ifError(err);
        res.json(obj);
        let dados = req.body;
        console.log(dados);
    });

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
