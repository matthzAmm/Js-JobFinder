// area para configuração do banco de dados

const Sequelize = require("sequelize"); // inicializando para uma const

const sequelize = new Sequelize({
    dialect: 'sqlite',      //qual banco utilizado
    storage: './db/app.db'  //localização dele (arquivos de bancos de dados normalmente tem a extensão db)
    
});

module.exports = sequelize;