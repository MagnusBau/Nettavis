// @flow



var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
const ArticleDao = require("../dao/articledao.js");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
app.use(bodyParser.json());
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.idi.ntnu.no",
    user: "magnubau",
    password: "Xu859jfN",
    database: "magnubau",
    debug: false
});

let articleDao = new ArticleDao(pool);

app.post("/artikkel", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    articleDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/kommentarer", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    articleDao.postComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/artikkel/:id", (req, res) => {
    console.log("Fikk UPDATE-request fra klienten");
    articleDao.updateOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler", (req, res) => {
    console.log("/artikler: fikk request fra klient");
    articleDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/nyheter", (req, res) => {
    console.log("/artikler/nyheter: fikk request fra klient");
    articleDao.getNyheter((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/siste", (req, res) => {
    console.log("/artikler/siste: fikk request fra klient");
    articleDao.getSiste((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/sport", (req, res) => {
    console.log("/artikler/sport: fikk request fra klient");
    articleDao.getSport((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/teknologi", (req, res) => {
    console.log("/artikler/teknologi: fikk request fra klient");
    articleDao.getTeknologi((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/kultur", (req, res) => {
    console.log("/artikler/kultur: fikk request fra klient");
    articleDao.getKultur((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get('/artikkel/:id', (req, res) => {
    console.log("/article/:id: fikk request fra klient");
    articleDao.getOne(req.params.id,(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/kategorier", (req, res) => {
    console.log("/kategorier: fikk request fra klient");
    articleDao.getCategories((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/artikkel/:id", (req, res) => {
    console.log("/article/:id: fikk slett-request fra klient");
    articleDao.deleteOne(req.params.id,(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/kommentarer/:id", (req, res) => {
    console.log("Fikk get-request fra klienten");
    articleDao.getComments(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

var server = app.listen(8080);
