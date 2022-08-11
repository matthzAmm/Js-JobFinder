// arquivo base do projeto

// dependencias do projeto

// body-parser - pega a requisição (body) e transforma em dados para o backend
// express - o framework web
// handlebars - um templete engine para imprimir html com dados do backend
// sequelize - url que se conecta com o banco (sqlite)
// sqlite3 - é a propria conecção com o banco que sera utilizado pelo sequelize

// dependendencias dev

// nodemon - utilizado para fazer alterações no servidor web emulado sem precisar reinicia-lo
// apenas utilizado durante o desenvolvimento sem um servidor real

const express           = require("express");
const exphbs            = require('express-handlebars');
const app               = express();
const path              = require('path');
const db                = require("./db/connection");
const bodyParser        = require('body-parser');
const Job               = require("./models/Job");
const Sequelize         = require("sequelize");
const Op                = Sequelize.Op;

const PORT = 3000;


app.listen(PORT, function(){

    console.log(`O express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// static folder
app.use(express.static(path.join(__dirname, "public"))); //seta a pasta de arquivos estaticos


// db connection
db
    .authenticate()
    .then(() =>{
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err =>{
        console.log("Ocorreu um erro ao conecta", err);
    })


// routes

app.get('/', (req, res) =>{

    let search = req.query.job;
    let query = "%"+search+"%"; // Htm -> html = jav -> java etc...

    if(!search){
        
        Job.findAll({order: 
            [['createdAt', 'DESC']
        ]}).then(jobs =>{
            res.render('index',{
                jobs
            });
     }).catch(err => {console.log(err)});
     

    }else{  
                
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: 
            [['createdAt', 'DESC']
        ]}).then(jobs =>{
            res.render('index',{
                jobs, search
            });
     }).catch(err => {console.log(err)});

    }

});

// job routes

app.use('/jobs', require('./routes/jobs'));

// refresh no servidor 
// alterar o script no package.json para "dev": "nodemon app.js"
// e iniciar via nodemon com o comando npm run dev

//adicionando o bootstrap

//head
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">


// last body
//<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
//<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
//<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

// adicionar no html