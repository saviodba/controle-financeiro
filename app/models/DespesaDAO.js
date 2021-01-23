let ObjectID = require('mongodb').ObjectId;

function DespesaDAO(connection) {
    this._connection = connection();
}

DespesaDAO.prototype.inserirdespesa = function (despesa) {

    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {
            collection.insert(despesa);
            mongoclient.close();
        });
    });
}

DespesaDAO.prototype.listadespesas = function (res, req) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            collection.find().toArray(function (err, result) {

                res.render('listadespesas', { dados: result });

                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.deletardespesas = function (_id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.remove(
                { _id: ObjectID(_id) },
                function (err, result) {
                    res.redirect('lista');
                    mongoclient.close();
                }
            );

        });
    });
}

DespesaDAO.prototype.recuperardespesa = function (_id, res) {
   
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.find({ _id: ObjectID(_id) }).toArray(function (err, result) {
                res.render('cadastrodespesa', { validacao: {}, dadosform: result[0] });
                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.somardespesas = function (req, res, mesano) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            
            collection.find().toArray(function (err, result) {

                let total = 0.00;
                for (let i = 0; i < result.length; i++) {
                    total += parseFloat(result[i].valor);
                }

                let valorFormatado = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

                res.render("index", { valorFormatado, mesano });
                mongoclient.close();
            });
        });
    });

}

DespesaDAO.prototype.editardespesa = function ( _id, req, res ) {
    let dados = req.body;
    console.log(dados);
    
    this._connection.open(function (err, mongoclient) {
        
        mongoclient.collection("despesas", function (err, collection) {   

            collection.update(
                {  
                    _id: ObjectID(_id) 
                }, 
                {
                    $set : 
                    {
                        despesa : dados.despesa,
                        valor :  dados.valor,
                        data : dados.data,
                        situacao : dados.situacao 
                    }
                }
            );            
            
            
        });
        res.redirect('lista');
            mongoclient.close();
    });  
     
}

module.exports = function () {
    return DespesaDAO;
}
