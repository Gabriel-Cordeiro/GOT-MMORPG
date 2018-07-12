function jogoDAO(connection){
    this._connection = connection();
}

jogoDAO.prototype.gerarParametros = function(usuario){
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("jogo", function (err, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos:10,
                temor: Math.floor(Math.random() * 100),
                sabedoria:Math.floor(Math.random() * 100),
                comercio: Math.floor(Math.random() * 100),
                magia: Math.floor(Math.random() * 100)
            });
            mongoclient.close();
        });
    });
}


module.exports = function(){
    return jogoDAO;
}