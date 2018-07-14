module.exports.cadastro = function (app, req, res) {
    res.render("cadastro",{validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function (app, req, res) {
    
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'senha não pode ser vazio').notEmpty();
    req.assert('casa', 'casa não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if(erros)
    {
        res.render('cadastro',{validacao: erros, dadosForm: dadosForm});
        return;
    }

    console.log('chegou')
    var connection = app.config.dbConnection;
    var UsuariosDAO = new app.app.models.UsuariosDAO(connection);
    UsuariosDAO.inserirUsuario(dadosForm);

    //Geração do parametros
    var jogoDAO = new app.app.models.jogoDAO(connection);
    jogoDAO.gerarParametros(dadosForm.usuario);

    res.send('certo');
}