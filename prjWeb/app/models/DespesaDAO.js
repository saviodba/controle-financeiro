let ObjectID = require('mongodb').ObjectId;
let moment = require('moment');
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

                //res.render('listadespesas', { dados: result });
                res.send(result);
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
                res.render('cadastrodespesa', { validacao: {}, dadosform: result[0], listpDesp: {} });
                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.getDespesaMes = function (req, res, dataini, datafim, callback) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            
            let data1 = moment(dataini).format("yyyy-MM-DD");
            let data2 = moment(datafim).format("yyyy-MM-DD");
            

            collection.find({ data : {$gte: data1, $lte: data2} }).toArray(function (err, result) {

                let total = 0.00;
                for (let i = 0; i < result.length; i++) {
                    total += parseFloat(result[i].valor);
                }
    
                let valorFormatado = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                                
                callback(valorFormatado, result);

                mongoclient.close();                
            });
       
        });
    });
}

DespesaDAO.prototype.editardespesa = function (_id, req, res) {
    let dados = req.body;
    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {

            collection.update(
                {
                    _id: ObjectID(_id)
                },
                {
                    $set:
                    {
                        despesa: dados.despesa,
                        valor: dados.valor,
                        data: dados.data,
                        tipodespesa: dados.tipodespesa,
                        situacao: dados.situacao
                    }
                }
            );

        });
        res.redirect('lista');
        mongoclient.close();
    });

}

DespesaDAO.prototype.cadastrartipodespesa = function (tipodespesa) {

    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("tipodespesa", function (err, collection) {
            collection.insert(tipodespesa);
            mongoclient.close();
        });
    });
}

DespesaDAO.prototype.recuperartipodespesa = function (req, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("tipodespesa", function (err, collection) {
            collection.find().toArray(function (err, result) {


                res.render('listatipodespesas', { dados: result });
                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.getTipodespesa = function (req, res, callback) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("tipodespesa", function (err, collection) {
            collection.find().toArray(function (err, result) {
                callback(err, result);
                mongoclient.close();
            });
        });
    });

}

DespesaDAO.prototype.deletartipodespesas = function (_id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("tipodespesa", function (err, collection) {

            collection.remove(
                { _id: ObjectID(_id) },
                function (err, result) {
                    res.redirect('tipodespesa');
                    mongoclient.close();
                }
            );

        });
    });
}

module.exports = function () {
    return DespesaDAO;
}
