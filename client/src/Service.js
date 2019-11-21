// @flow

import axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:8080'});

export class Artikkel {
    id: number;
    tittel: String;
    tekst: String;
    bilde: String;
    forfatter: String;
    viktighet: String;
    kategoriid: String;
    alt: String;
    tidspunkt: String;
    constructor(id: number, tittel: String, tekst: String, bilde: String, forfatter: String, viktighet: String, kategoriid: String, alt: String, tidspunkt: String){
        this.id = id;
        this.tittel = tittel;
        this.tekst = tekst;
        this.bilde = bilde;
        this.forfatter = forfatter;
        this.viktighet = viktighet;
        this.kategoriid = kategoriid;
        this.alt = alt;
        this.tidspunkt = tidspunkt;
    }
}

export class Kategori {
    id: number;
    navn: String;
    constructor(id: number, navn: String){
        this.id = id;
        this.navn = navn;
    }
}

export class Kommentar {
    id: number;
    nickname: String;
    tekst: String;
    artikkelid: number;
    constructor(id: number, nickname: String, tekst: String, artikkelid: number){
        this.id = id;
        this.nickname = nickname;
        this.tekst = tekst;
        this.artikkelid = artikkelid;
    }
}

export class ArtikkelService {
    getArtikkler(){
        return instance.get<Artikkel[]>('/artikkler').then(response => response.data);
    }
    postArticle(article: Artikkel){
        return instance.post<Artikkel>('/artikkel', article).then(response => response.data);
    }
    getArticle(id: number){
        console.log("Henter artikkel");
        return instance.get<Artikkel>('/artikkel/' + id).then(response => response.data);
    }
    deleteArticle(id: number){
        console.log("Sletter artikkel");
        return instance.delete<Artikkel>('/artikkel/' + id).then(response => response.data);
    }
    getCategories(){
        return instance.get<Kategori[]>('/kategorier').then(response => response.data);
    }
    updateArticle(id: number, article: Artikkel){
        console.log("Oppdaterer artikkel");
        return instance.put<Artikkel>('/artikkel/' + id, article).then(response => response.data);
    }
    getNyheter(){
        return instance.get<Artikkel[]>('/artikkler/nyheter').then(response => response.data);
    }
    getSport(){
        return instance.get<Artikkel[]>('/artikkler/sport').then(response => response.data);
    }
    getTeknologi(){
        return instance.get<Artikkel[]>('/artikkler/teknologi').then(response => response.data);
    }
    getKultur(){
        return instance.get<Artikkel[]>('/artikkler/kultur').then(response => response.data);
    }
    getSiste(){
        return instance.get<Artikkel[]>('/artikkler/siste').then(response => response.data);
    }
    getKommentarer(id: number){
        return instance.get<Kommentar[]>('/kommentarer/' + id).then(response => response.data);
    }
    postKommentar(kommentar: Kommentar){
        return instance.post<Kommentar>('/kommentarer', kommentar).then(response => response.data)
    }
}