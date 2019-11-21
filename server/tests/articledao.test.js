// @flow

var mysql = require("mysql");

const ArticleDao = require("../dao/articledao.js");
const runsqlfile = require("../dao/runsqlfile.js");

// GitLab CI Pool
var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
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
