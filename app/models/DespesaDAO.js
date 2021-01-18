let ObjectID = require('mongodb').ObjectId;

function DespesaDAO(connection) {
    this._connection = connection();
}

DespesaDAO.prototype.inserirDespesa = function (despesa) {

    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {
            collection.insert(despesa);
            mongoclient.close();
        });
    });
}

DespesaDAO.prototype.recuperarDespesas = function (res, req) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            collection.find().toArray(function (err, result) {

                res.render('listaDespesas', { dados: result });

                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.deletarDespesas = function (_id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.remove(
                { _id: ObjectID(_id) },
                function (err, result) {
                    res.redirect('listaDespesas');
                    mongoclient.close();
                }
            );

        });
    });
}

DespesaDAO.prototype.recupararDespesa = function (_id, res) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {

            collection.find({ _id: ObjectID(_id) }).toArray(function (err, result) {

                res.render('cadDespesa', { validacao: {}, dadosform: result[0] });

                mongoclient.close();
            });
        });
    });
}

DespesaDAO.prototype.somarDespesas = function (req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("despesas", function (err, collection) {
            collection.find().toArray(function (err, result) {

                let total = 0.00;
                for (let i = 0; i < result.length; i++) {
                    total += parseFloat(result[i].valor);
                }

                let valorFormatado = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

                res.render("index", { valorFormatado });
                mongoclient.close();
            });
        });
    });

}

DespesaDAO.prototype.editardespesa = function (_id, res, req) {
    let dados = req.body;

    this._connection.open(function (err, mongoclient) {

        mongoclient.collection("despesas", function (err, collection) {

            console.log(collection);

            collection.updateOne(
                {
                    _id: ObjectID(_id)
                },
                {
                    $set: { dados }
                }
            );

            res.redirect('listaDespesas');
            mongoclient.close();
        });
    });
}

module.exports = function () {
    return DespesaDAO;
}
