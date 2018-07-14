var mongo = require('mongodb');
var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "got";

var connMongoDB = function () {
    var db = new mongo.Db(
        'got', new mongo.Server(
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
};

//nova versão do mongo
/*var connMongoDB = function (dados,req,res) {
    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        query(db, dados,client,req,res);
    });
};

function query(db, dados, client,req,res) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            client.close();
            break;
        case "find":
            collection.find({ 'nome': dados.usuario.usuario }, {'senha' : dados.usuario.senha}).toArray(function (err, result) {
                assert.equal(err, null);
                if (result.length <= 0){
                    console.log("usuario não encontrado");
                    //res.send('nooooooooooooooooo');
                }
                else {
                    console.log("Usuario encontrado");
                    console.log(result);
                }

            });
            break;
        default:
            break;
    }
}*/