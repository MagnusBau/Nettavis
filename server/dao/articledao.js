// @flow


const Dao = require("./dao.js");

module.exports = class ArticleDao extends Dao {
    getAll(limit: number, callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, DATE_FORMAT(`tidspunkt`, '%Y-%m-%d %H:%i') AS `tidspunkt` from artikkel where viktighet = 1 order by tidspunkt desc limit ?", [limit], callback);
    }

    getNyheter(limit: number, callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where tidspunkt >= DATE_SUB(NOW(), INTERVAL 1 DAY) order by tidspunkt desc limit ?", [limit], callback);
    }
    getSiste(callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where tidspunkt >= DATE_SUB(NOW(), INTERVAL 12 hour ) and viktighet = 1 order by tidspunkt desc", [], callback);
    }

    getArticleByCat(id: number, limit: number, callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, tidspunkt from artikkel where kategoriid = ? order by tidspunkt desc limit ?",
            [id, limit],
            callback);
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

    updateOne(id: number, Artikkel: Object, callback: () => void) {
        var val = [Artikkel.tittel, Artikkel.tekst, Artikkel.bilde, Artikkel.forfatter, Artikkel.viktighet, Artikkel.kategoriid, Artikkel.alt, id];
        super.query(
            "update artikkel set tittel = ?, tekst = ?, bilde = ?, forfatter = ?, viktighet = ?, kategoriid = ?, alt = ? where id = ?",
            val,
            callback
        );
    }

    deleteComments(artikkelid: number, callback: () => void) {
        super.query(
            "delete from kommentar where artikkelid = ?",
            artikkelid,
            callback
        )
    }

    getSearch(search: string, limit: number, callback: () => void) {
        super.query("Select id, tittel, tekst, bilde, forfatter, viktighet, kategoriid, alt, DATE_FORMAT(`tidspunkt`, '%Y-%m-%d %H:%i') AS `tidspunkt` from artikkel where tittel like ? order by tidspunkt desc limit ?", ['%' + search + '%', limit], callback);
    }
};
