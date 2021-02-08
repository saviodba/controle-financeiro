let mongo = require('mongodb');

let connMongoDB = function () {
    let db = new mongo.Db(
        'financeiro',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );
    return db;
}

module.exports = function () {
    return connMongoDB;
}
