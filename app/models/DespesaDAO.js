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

module.exports = function () {
    return DespesaDAO;
}
