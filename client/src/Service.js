// @flow

import axios from "axios";

const instance = axios.create({baseURL: 'http://10.22.152.12:8080'}); //bytt ut ip med localhost

export class Artikkel {
    id: number;
    tittel: string;
    tekst: string;
    bilde: string;
    forfatter: string;
    viktighet: string;
    kategoriid: string;
    alt: string;
    tidspunkt: string;
    constructor(tittel: string, tekst: string, bilde: string, forfatter: string, viktighet: string, kategoriid: string, alt: string){
        this.tittel = tittel;
        this.tekst = tekst;
        this.bilde = bilde;
        this.forfatter = forfatter;
        this.viktighet = viktighet;
        this.kategoriid = kategoriid;
        this.alt = alt;
    }
}

export class Kategori {
    id: number;
    navn: string;
    constructor(id: number, navn: string){
        this.id = id;
        this.navn = navn;
    }
}

export class Kommentar {
    id: number;
    nickname: string;
    tekst: string;
    artikkelid: number;
    constructor(nickname: string, tekst: string, artikkelid: number){
        this.nickname = nickname;
        this.tekst = tekst;
        this.artikkelid = artikkelid;
    }
}

export class ArtikkelService {
    getArtikkler(limit: number){
        return instance.get<Artikkel[]>('/artikkler/' + parseInt(limit)).then(response => response.data);
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
        this.deleteKommentarer(id)
            .catch((error: Error) => console.error(error.message));
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
        return instance.get<Artikkel[]>('/artikkl/nyheter').then(response => response.data);
    }
    getArticleBycat(id: number){
        return instance.get<Artikkel[]>('/artikkler/kategori/' + id).then(response => response.data);
    }
    getSiste(){
        return instance.get<Artikkel[]>('/artikkler/scroll/siste').then(response => response.data);
    }
    getKommentarer(id: number){
        return instance.get<Kommentar[]>('/kommentarer/' + id).then(response => response.data);
    }
    postKommentar(kommentar: Kommentar){
        return instance.post<Kommentar>('/kommentarer', kommentar).then(response => response.data)
    }
    deleteKommentarer(artikkelid: number){
        console.log("Sletter kommentarer");
        return instance.delete<Kommentar>('/kommentarer/' + artikkelid).then(response => response.data);
    }
}