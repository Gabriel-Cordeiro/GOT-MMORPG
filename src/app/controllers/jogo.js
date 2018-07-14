module.exports.jogo = function (app, req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return
    }

    var msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg 
    }

    var connection = app.config.dbConnection;
    var jogoDAO = new app.app.models.jogoDAO(connection);
    var usuario = req.session.usuario
    var casa = req.session.casa

    jogoDAO.iniciaJogo(usuario, res, casa, msg);
}

module.exports.sair = function (app, req, res) {
    req.session.destroy(function (err) {
        res.render('index', { validacao: {} });
    });
}

module.exports.suditos = function (app, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return
    }
    res.render('aldeoes', { validacao: {} });
}

module.exports.pergaminhos = function (app, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return
    }

    var connection = app.config.dbConnection;
    var jogoDAO = new app.app.models.jogoDAO(connection);
    var usuario = req.session.usuario;


    jogoDAO.getAcoes(usuario,res);

}

module.exports.ordenar_acao_sudito = function (app, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário precisa fazer login');
        return
    }

    var dadosForm = req.body;

    req.assert('acao', "Ação deve ser informada").notEmpty();
    req.assert('quantidade', "Quantidade deve ser informada").notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A')
        return;
    }

   var connection = app.config.dbConnection;
   var jogoDao = new app.app.models.jogoDAO(connection);

   dadosForm.usuario = req.session.usuario

   jogoDao.acao(dadosForm);

   res.redirect('jogo?msg=B')


}

module.exports.revogar_acao = function (app, req, res) {

    var url_query = req.query;
    var connection = app.config.dbConnection;
    var jogoDao = new app.app.models.jogoDAO(connection);


   console.log(url_query); 
    jogoDao.revogarAcao(url_query.id_acao,res);
}
