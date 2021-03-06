// @flow



var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
const ArticleDao = require("../dao/articledao.js");

app.use(function(req: express$Request, res: express$Response, next) {
    res.header("Access-Control-Allow-Origin",/*"http://localhost:3000"*/'*'); // update to match the domain you will make the request from
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

app.post("/artikkel", (req: express$Request, res: express$Response) => {
    console.log("Fikk POST-request fra klienten");
    articleDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/kommentarer", (req: express$Request, res: express$Response) => {
    console.log("Fikk POST-request fra klienten");
    articleDao.postComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/artikkel/:id", (req: express$Request, res: express$Response) => {
    console.log("Fikk UPDATE-request fra klienten");
    articleDao.updateOne(parseInt(req.params.id), req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/:limit", (req: express$Request, res: express$Response) => {
    console.log("/artikler: fikk request fra klient");
    articleDao.getAll(parseInt(req.params.limit), (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkl/nyheter/:limit", (req: express$Request, res: express$Response) => {
    console.log("/artikler/nyheter: fikk request fra klient");
    articleDao.getNyheter(parseInt(req.params.limit),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/scroll/siste", (req: express$Request, res: express$Response) => {
    console.log("/artikler/siste: fikk request fra klient");
    articleDao.getSiste((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/artikkler/kategori/:id/:limit", (req: express$Request, res: express$Response) => {
    console.log("/artikler/kategori: fikk request fra klient");
    articleDao.getArticleByCat(req.params.id, parseInt(req.params.limit),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/search/:search/:limit", (req: express$Request, res: express$Response) => {
    console.log("/artikler/kategori: fikk request fra klient");
    articleDao.getSearch(String(req.params.search), parseInt(req.params.limit),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get('/artikkel/:id', (req: express$Request, res: express$Response) => {
    console.log("/article/:id: fikk request fra klient");
    articleDao.getOne(req.params.id,(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/kategorier", (req: express$Request, res: express$Response) => {
    console.log("/kategorier: fikk request fra klient");
    articleDao.getCategories((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/artikkel/:id", (req: express$Request, res: express$Response) => {
    console.log("/article/:id: fikk slett-request fra klient");
    articleDao.deleteOne(parseInt(req.params.id),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/kommentarer/:artikkelid", (req: express$Request, res: express$Response) => {
    console.log("/article/:id: fikk slett-request fra klient");
    articleDao.deleteComments(parseInt(req.params.artikkelid),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/kommentarer/:id", (req: express$Request, res: express$Response) => {
    console.log("Fikk get-request fra klienten");
    articleDao.getComments(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

var server = app.listen(8080);
