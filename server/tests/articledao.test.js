//flow

var mysql = require("mysql");

const ArticleDao = require("../dao/articledao.js");
const runsqlfile = require("../dao/runsqlfile.js");

// GitLab CI Pool
var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "jegharproblemer",
    debug: false,
    multipleStatements: true
});

let articleDao = new ArticleDao(pool);

beforeAll(done => {
    runsqlfile("./dao/create_tables.sql", pool, () => {
        runsqlfile("./dao/create_testdata.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});


test("get article drom db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].tittel).toBe("Testartikkel");
        done();
    }

    articleDao.getOne(1, callback);
});

test("get all articles from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    articleDao.getAll(callback);
});

test("get Nyheter from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    articleDao.getNyheter(callback);
});

test("get Siste from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    articleDao.getSiste(callback);
});

test("get Star Wars from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].tittel).toBe("Testartikkel2");
        done();
    }

    articleDao.getArticleByCat(1, callback);
});

test("get Kategorier from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        expect(data[0].navn).toBe("Star Wars");
        done();
    }

    articleDao.getCategories(callback);
});

test("get comments from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        expect(data[0].nickname).toBe("Curious Betsy");
        done();
    }

    articleDao.getComments(1, callback);
});

test("add comment to db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    articleDao.createOne(
        { tittel: "test", tekst: "hahaha", bilde: "test.png", forfatter: "meg", viktighet: 1, kategoriid: 2, alt: "bra"},
        callback
    );
});

// test("remove one article from db", done => {
//     function callback(status, data) {
//         console.log(
//             "Test callback: status=" + status + ", data=" + JSON.stringify(data)
//         );
//         expect(data.affectedRows).toBe(1);
//         done();
//     }
//
//     articleDao.deleteOne(3, callback);
// });

test("update one article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    articleDao.updateOne(
        { tittel: "test", tekst: "hahaha", bilde: "test.png", forfatter: "meg", viktighet: 1, kategoriid: 2, alt: "bra", id: 1},
        callback
    );
});
// test("get one person from db", done => {
//     function callback(status, data) {
//         console.log(
//             "Test callback: status=" + status + ", data=" + JSON.stringify(data)
//         );
//         expect(data.length).toBe(1);
//         expect(data[0].navn).toBe("Hei Sveisen");
//         done();
//     }
//
//     articleDao.getOne(1, callback);
// });
//
// test("get unknown person from db", done => {
//     function callback(status, data) {
//         console.log(
//             "Test callback: status=" + status + ", data=" + JSON.stringify(data)
//         );
//         expect(data.length).toBe(0);
//         done();
//     }
//
//     articleDao.getOne(0, callback);
// });
//
// test("add person to db", done => {
//     function callback(status, data) {
//         console.log(
//             "Test callback: status=" + status + ", data=" + JSON.stringify(data)
//         );
//         expect(data.affectedRows).toBeGreaterThanOrEqual(1);
//         done();
//     }
//
//     articleDao.createOne(
//         { navn: "Nils Nilsen", alder: 34, adresse: "Gata 3" },
//         callback
//     );
// });
//
// test("get all persons from db", done => {
//     function callback(status, data) {
//         console.log(
//             "Test callback: status=" + status + ", data.length=" + data.length
//         );
//         expect(data.length).toBeGreaterThanOrEqual(2);
//         done();
//     }
//
//     articleDao.getAll(callback);
// });
