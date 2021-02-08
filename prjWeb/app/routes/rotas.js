module.exports = function (application) {

application.get('/teste',function(req, res){
    res.send({msg: 'Olá tudo bem'});       
});

application.post('/api',function(req, res){
    let dados = req.body;
    res.send(dados);          
});

application.get('/getDespesa',function(req, res){
    application.app.controllers.despesa.listadespesas(application, req, res);        
});

}