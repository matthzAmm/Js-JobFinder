const express   = require("express");
const router    = express.Router();
const Job       = require('../models/Job');


// teste
router.get('/test', (req, res) =>{
    res.send("deu certo");
})

// detalhes da vaga
router.get("/job_view/:id", (req, res) => Job.findOne({
    where: {id: req.params.id}
}).then(job =>{
    res.render('job_view', {job});
}).catch(err => console.log(err)));

// rota de envio - form
router.get("/add", (req, res) =>{
    res.render("add");
})

// add job via post
router.post('/add', (req, res) => {

    let {title, salary, company, description, email, new_job, updatedAt, createdAt} = req.body;

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        updatedAt,
        createdAt,
        new_job
    })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));

});

module.exports = router;