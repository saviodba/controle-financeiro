let ObjectID = require('mongodb').ObjectId;
let moment = require('moment');

function DespesaDAO(connection) {
    this._connection = connection();
}

DespesaDAO.prototype.inserirdespesa = function (res, despesa) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {
            collection.insert(despesa);

            if (err) {
                res.json(err)
            } else {
                res.send({ result: "Inserção realizada com sucesso" })
            }
            mongoclient.close();
        });
    });
}

DespesaDAO.prototype.listadespesas = function (res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            collection.find().toArray(function (err, result) {
                res.send(result);
                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.deletardespesa = function (_id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.remove(
                { _id: ObjectID(_id) },
                function (err, result) {

                    if (err) {
                        res.json(err);
                    } else {
                        res.send(result);
                    }

                    mongoclient.close();
                }
            );

        });
    });
}

DespesaDAO.prototype.recuperardespesa = function (id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.find({ _id: ObjectID(id) }).toArray(function (err, result) {

                if (err) {
                    res.json(err);
                } else {
                    res.send(result);
                }

                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.getdeespesames = function (req, res, dataini, datafim) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            let data1 = moment(dataini).format("yyyy-MM-DD");
            let data2 = moment(datafim).format("yyyy-MM-DD");


            collection.find({ data: { $gte: data1, $lte: data2 } }).toArray(function (err, result) {

                let total = 0.00;
                for (let i = 0; i < result.length; i++) {
                    total += parseFloat(result[i].valor);
                }

                let valorFormatado = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

                res.send(result);

                mongoclient.close();
            });

        });
    });
}

DespesaDAO.prototype.editardespesa = function (id, req, res) {
    let dados = req.body;

    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {

            collection.update(
                {
                    _id: ObjectID(id)
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

        if (err) {
            res.json(err)
        } else {
            res.send({ result: "200" });
        }
        mongoclient.close();
    })

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

    res.setHeader("Access-Control-Allow-Origin", "*");
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("tipodespesa", function (err, collection) {
            collection.find().toArray(function (err, result) {

                if (err) {
                    res.json(err)
                } else {
                    res.send(result)
                }

                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.getTipodespesa = function (req, res, callback) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("tipodespesa", function (err, collection) {
            collection.find().toArray(function (err, result) {

                if (err) {
                    res.json(err)
                } else {
                    res.send(result)
                }
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
