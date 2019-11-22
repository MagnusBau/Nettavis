// @flow


const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {
    getAll(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, DATE_FORMAT(`tidspunkt`, '%Y-%m-%d %H:%i') AS `tidspunkt` from artikkel where viktighet = 1 order by tidspunkt desc", [], callback);
    }

    getNyheter(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where tidspunkt >= DATE_SUB(NOW(), INTERVAL 1 DAY) order by tidspunkt desc", [], callback);
    }
    getSiste(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where tidspunkt >= DATE_SUB(NOW(), INTERVAL 6 hour ) and viktighet = 1 order by tidspunkt desc", [], callback);
    }

    getSport(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where kategoriid = 2 order by tidspunkt desc", [], callback);
    }

    getTeknologi(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where kategoriid = 3 order by tidspunkt desc", [], callback);
    }

    getKultur(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where kategoriid = 4 order by tidspunkt desc", [], callback);
    }

    getCategories(callback: () => void) {
        super.query("Select id, navn from kategori", [], callback);
    }

    getOne(id: number, callback: () => void) {
        super.query(
            "Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, DATE_FORMAT(`tidspunkt`, '%Y-%m-%d %H:%i') AS `tidspunkt` from artikkel where id=?",
            [id],
            callback
        );
    }

    getComments(id: number, callback: () => void) {
        super.query(
            "Select * from kommentar where artikkelid = ? order by id desc",
            [id],
            callback
        );
    }

    postComment(Kommentar: Object, callback: () => void) {
        var val = [Kommentar.nickname, Kommentar.tekst, Kommentar.artikkelid];
        super.query(
          "insert into kommentar (nickname, tekst, artikkelid) values (?,?,?)",
            val,
            callback
        );
    }

    createOne(Artikkel: Object, callback: () => void) {
        var val = [Artikkel.tittel, Artikkel.tekst, Artikkel.bilde, Artikkel.forfatter, Artikkel.viktighet, Artikkel.kategoriid, Artikkel.alt];
        super.query(
            "insert into artikkel (tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt) values (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    deleteOne(id: number, callback: () => void) {
        super.query(
            "delete from artikkel where id = ?",
            id,
            callback
        )
    }

    updateOne(Artikkel: Object, callback: () => void) {
        var val = [Artikkel.tittel, Artikkel.tekst, Artikkel.bilde, Artikkel.forfatter, Artikkel.viktighet, Artikkel.kategoriid, Artikkel.alt, Artikkel.id];
        super.query(
            "update artikkel set tittel = ?, tekst = ?, bilde = ?, forfatter = ?, viktighet = ?, kategoriid = ?, alt = ? where id = ?",
            val,
            callback
        );
    }
};
