// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Button, Article, SelectedArticle, Comment} from './widgets';
import {ArtikkelService, Artikkel, Kategori, Kommentar} from './Service'

import { createHashHistory } from 'history';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


export let artikkelService = new ArtikkelService();

class Menu extends Component {
    kategorier: Kategori[] = [];
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                <a className="navbar-brand" href="/" style={{fontSize: 30}}>Varden</a>
                <div className="navbar" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <a className="nav-item nav-link" href="#nyheter">Nyheter</a>
                        {this.kategorier.map(i => (
                            <a className="nav-item nav-link" key={i.id} href={"#kategori/" + i.id}>{i.navn}</a>
                        ))}
                        <a className="nav-item nav-link" href="#lastopp">Last opp</a>
                        <a className="nav-item nav-link" href="#søk">Søk</a>
                    </div>
                </div>
            </nav>
        );
    }
    mounted() {
        artikkelService
            .getCategories()
            .then(kategorier => (this.kategorier = kategorier))
            .catch((error: Error) => console.error(error.message));
    }
}

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small special-color-dark pt-4" style={{backgroundColor: '#353942'}}>
                <div className="container">
                    <div className="row justify-content-center" style={{color: 'white', fontSize: 20}}>
                        Hold deg hydrert
                    </div>
                </div>
                <div className="footer-copyright text-center py-3" style={{color: 'white'}}>Laget av
                    Magnus Baugerud
                </div>

            </footer>
        );
    }
}

export class Scroll extends Component {
    siste: Artikkel[] = [];
    render() {
        return(
            <marquee behavior="scroll" direction="left">
                {this.siste.map(i => (
                    <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                        {i.tittel}
                    </NavLink>
                ))}
            </marquee>
        );
    }
    mounted(){
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }
}

class Sok extends Component{
    artikler: Artikkel[] = [];
    sok: string = "";
    antall: number = 4;
    render() {
        return (
            <div id="wrap">
                <div className="container" id="main">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        </div>
                        <input type="text"
                               className="form-control"
                               placeholder="Søk"
                               aria-label="søk"
                               aria-describedby="basic-addon1"
                               value={this.sok}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   this.sok = event.target.value;
                                   this.search();

                               }}/>
                    </div>
                    <div className="row justify-content-center">
                        {this.artikler.map(i => (
                            <NavLink exact to={'/article/' + i.id} className="custom-card" key={i.id}>
                                <Article title={i.tittel} image={i.bilde} alt={i.alt} id={i.id}>

                                </Article>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="row justify-content-center" style={{fontSize: 30, color: 'white', marginBottom: '50%'}}>
                    <Button.Info onClick={this.loadMore}>Last inn flere artikler</Button.Info>
                </div>
            </div>
        );
    }
    loadMore(){
        this.antall += 2;
        if(this.sok.length > 0){
            artikkelService
                .getSearch(this.sok, this.antall)
                .then(artikler => (this.artikler = artikler))
                .catch((error: Error) => console.error(error.message));
        }
    }

    search() {
        this.antall = 4;
        if(this.sok.length > 0){
            artikkelService
                .getSearch(this.sok, this.antall)
                .then(artikler => (this.artikler = artikler))
                .catch((error: Error) => console.error(error.message));
        }
    }
}

class Home extends Component {
    artikler: Artikkel[] = [];
    antall: number = 4;
    render() {
        return (
            <div>
            <div className="container">
                <div className="row justify-content-center">
                {this.artikler.map(i => (
                        <NavLink exact to={'/article/' + i.id} className="custom-card" key={i.id}>
                            <Article title={i.tittel} image={i.bilde} alt={i.alt} id={i.id}>

                            </Article>
                        </NavLink>
                ))}
                    </div>
                </div>
                <div className="row justify-content-center" style={{fontSize: 30, color: 'white', marginBottom: '10px'}}>
                    <Button.Info onClick={this.loadMore}>Last inn flere artikler</Button.Info>
                </div>
            </div>
        );
    }

    loadMore(){
        this.antall += 2;
        this.mounted();
    }

    mounted() {
        artikkelService
            .getArtikkler(this.antall)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
    }

}

export class Nyheter extends Component {
    artikler: Artikkel[] = [];
    antall: number = 4;
    render() {
        return (
            <div>
            <div className="container">
                <div className="row justify-content-center">
                    {this.artikler.map(i => (
                        <NavLink exact to={'/article/' + i.id} className="custom-card" key={i.id}>
                            <Article title={i.tittel} image={i.bilde} alt={i.alt} id={i.id}>

                            </Article>
                        </NavLink>
                    ))}
                </div>
            </div>
                <div className="row justify-content-center" style={{fontSize: 30, color: 'white', marginBottom: '10px'}}>
                    <Button.Info onClick={this.loadMore}>Last inn flere artikler</Button.Info>
                </div>
            </div>
        );
    }

    loadMore(){
        this.antall += 2;
        this.mounted();
    }
    mounted() {
        artikkelService
            .getNyheter(this.antall)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
    }

}

export class Kategorier extends Component<{match : {params: {id: number}}}>{
    artikler: Artikkel[] = [];
    antall: number = 4;
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        {this.artikler.map(i => (
                            <NavLink exact to={'/article/' + i.id} className="custom-card" key={i.id}>
                                <Article title={i.tittel} image={i.bilde} alt={i.alt} id={i.id}>

                                </Article>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="row justify-content-center" style={{fontSize: 30, color: 'white', marginBottom: '10px'}}>
                    <Button.Info onClick={this.loadMore}>Last inn flere artikler</Button.Info>
                </div>
            </div>
        );
    }

    loadMore(){
        this.antall += 2;
        artikkelService
            .getArticleBycat(this.props.match.params.id, this.antall)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
    }
    mounted() {
        this.antall = 4;
        artikkelService
            .getArticleBycat(this.props.match.params.id, this.antall)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
    }
}

class article extends Component<{match : {params: {id: number}}}>{
    selectedArticle: Artikkel = new Artikkel("", "", "", "", "", "", "");
    comments: Kommentar[] = [];

    nickname: string = "Curious Betsy";
    tekst: string = "";
    render(){
        return(
            <div>
                <SelectedArticle title={this.selectedArticle.tittel} timestamp={this.selectedArticle.tidspunkt} forfatter={this.selectedArticle.forfatter} image={this.selectedArticle.bilde} id={this.selectedArticle.id} alt={this.selectedArticle.alt}>
                    {this.selectedArticle.tekst}
                </SelectedArticle>
                <div className="row justify-content-center">
                    <div className="card mb-4 border-0" style={{width: '50%'}}>
                        <h5 className="card-title" style={{marginTop: '3%', marginLeft: '3%'}}>Legg til Kommentar</h5>

                        <label htmlFor="basic-url" style={{marginLeft: '3%'}}>Nickname: </label>
                        <div className="input-group mb-3" style={{width: '50%', marginLeft: '3%'}}>
                            <div className="input-group-prepend">
                            </div>
                            <input id="nick" type="text" className="form-control" placeholder="Curious Betsy" aria-label="nickname"
                                   aria-describedby="basic-addon1" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.nickname = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url" style={{marginLeft: '3%'}}>Kommentar: </label>
                        <div className="input-group" style={{width: '90%', marginLeft: '3%', marginBottom: '3%'}}>
                            <div className="input-group-prepend">
                            </div>
                            <textarea id ="kommentar" className="form-control" value={this.tekst} aria-label="tekst" rows="3" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tekst = event.target.value)}></textarea>
                        </div>
                        <Button.Info onClick={this.post}> Kommenter </Button.Info>
                    </div>
                </div>
                {this.comments.map(i => (
                    <Comment key={i.id} tekst={i.tekst} nickname={i.nickname}/>
                ))}
            </div>
        );
    }

    post(){
        let tempKommentar = new Kommentar(this.nickname, this.tekst, this.props.match.params.id);
        artikkelService
            .postKommentar(tempKommentar)
            .then((response) => {
                this.tekst = "";
                this.mounted();
            })
            .catch((error: Error) => console.error(error.message));
    }

    mounted() {
        artikkelService
            .getArticle(this.props.match.params.id)
            .then(article => (this.selectedArticle = article[0]))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getKommentarer(this.props.match.params.id)
            .then(comment => (this.comments = comment))
            .catch((error: Error) => console.error(error.message));
    }
}

class LastOpp extends Component {
    tittel: string = "";
    tekst: string = "";
    bilde: string = "";
    forfatter: string = "";
    viktighet: string = "2";
    kategorier: Kategori[] = [];
    alt: string = "";
    kategori: string = '1';

    form = null;
    melding: string = "";
    knapp: string = "Legg til på forsiden";
    viktig: boolean = false;
    render() {
        return(
            <div className="row justify-content-center">
                <div className="mb-4 border-0 " style={{width: '75%'}}>
                    <div className="card-body">
                        <form ref={e => (this.form = e)}>

                            <label htmlFor="basic-url">Tittel: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       required
                                       minLength={1}
                                       maxLength={80}
                                       placeholder="Tittel"
                                       aria-label="tittel"
                                       aria-describedby="basic-addon1"
                                       value={this.tittel}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tittel = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Bilde-url: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Lim inn en bildeadresse her!"
                                       aria-label="bildeurl"
                                       aria-describedby="basic-addon4"
                                       value={this.bilde}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.bilde = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Alt: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Dette er et bilde"
                                       aria-label="alt"
                                       aria-describedby="basic-addon2"
                                       value={this.alt}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.alt = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Forfatter: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       required
                                       minLength={1}
                                       maxLength={40}
                                       placeholder="Ola Nordmann"
                                       aria-label="forfatter"
                                       aria-describedby="basic-addon3"
                                       value={this.forfatter}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.forfatter = event.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="kategori">Kategori: </label>
                                <select className="form-control"
                                        id="kategori"
                                        value={this.kategori}
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.kategori = event.target.value)}>
                                        {this.kategorier.map(i =>(
                                            <option key={i.id} value={i.id}>{i.navn}</option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <button type="button" className="btn btn-info" onClick={this.handleViktighet}>{this.knapp}</button>
                            </div>

                            <label htmlFor="basic-url">Tekst: </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <textarea className="form-control"
                                          required
                                          minLength={1}
                                          aria-label="tekst"
                                          rows="10"
                                          value={this.tekst}
                                          placeholder="Skriv her"
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tekst = event.target.value)}> </textarea>
                            </div>
                        </form>

                    </div>
                    <Button.Info onClick={this.post}> Last opp </Button.Info>
                    <p style={{color: "red"}}>{this.melding}</p>
                </div>
            </div>
        );
    }
    handleViktighet(){
        if(this.viktig){
            this.knapp = "Legg på forsiden";
            this.viktig = false;
            this.viktighet = '2';
        }else if(!this.viktig){
            this.knapp = "Ikke legg på forsiden";
            this.viktig = true;
            this.viktighet = '1';
        }
    }

    post(){
        if(!this.form || !this.form.checkValidity()){
            this.melding = "Fyll ut de røde feltene";
            this.mounted();
            return;
        }
        let tempArticle = new Artikkel( this.tittel, this.tekst, this.bilde, this.forfatter, this.viktighet, this.kategori, this.alt);
        artikkelService.postArticle(tempArticle)
            .then((response) => {
                window.location.reload()
            }, console.log("Artikkel lastet opp"))
            .then(history.push('/'))
            .catch((error: Error) => console.error(error.message))
    }

    mounted() {
        artikkelService
        .getCategories()
            .then(kategori => (this.kategorier = kategori))
            .catch((error: Error) => console.error(error.message))
    }
}

class edit extends Component<{match : {params: {id: number}}}>{
    selectedArticle: Artikkel =  new Artikkel("init", "init", "init", "init", "init", "init", "");
    kategorier: Kategori[] = [];

    form = null;
    melding: string = "";
    knapp: string = "Legg til på forsiden";
    viktig: boolean = false;
    render() {
        return(
            <div className="row justify-content-center">
                <div className="mb-4 border-0 " style={{width: '75%'}}>
                    <div className="card-body">
                        <form ref={e => (this.form = e)}>

                            <label htmlFor="basic-url">Tittel: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       required
                                       minLength={1}
                                       maxLength={80}
                                       placeholder="Tittel"
                                       aria-label="tittel"
                                       aria-describedby="basic-addon1"
                                       value={this.selectedArticle.tittel}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.tittel = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Bilde-url: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Lim inn en bildeadresse her!"
                                       aria-label="bildeurl"
                                       aria-describedby="basic-addon4"
                                       value={this.selectedArticle.bilde}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.bilde = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Alt: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Dette er et bilde"
                                       aria-label="alt"
                                       aria-describedby="basic-addon2"
                                       value={this.selectedArticle.alt}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.alt = event.target.value)}/>
                            </div>

                            <label htmlFor="basic-url">Forfatter: </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                </div>
                                <input type="text"
                                       className="form-control"
                                       required
                                       minLength={1}
                                       maxLength={40}
                                       placeholder="Ola Nordmann"
                                       aria-label="forfatter"
                                       aria-describedby="basic-addon3"
                                       value={this.selectedArticle.forfatter}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.forfatter = event.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="kategori">Kategori: </label>
                                <select className="form-control"
                                        id="kategori"
                                        value={this.selectedArticle.kategoriid}
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.kategoriid = event.target.value)}>
                                        {this.kategorier.map(i =>(
                                            <option key={i.id} value={i.id}>{i.navn}</option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <button type="button" className="btn btn-info" onClick={this.handleViktighet}>{this.knapp}</button>
                            </div>

                            <label htmlFor="basic-url">Tekst: </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                </div>
                                <textarea
                                    className="form-control"
                                    required
                                    minLength={1}
                                    aria-label="tekst"
                                    rows="10"
                                    value={this.selectedArticle.tekst}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.tekst = event.target.value)}> </textarea>
                            </div>
                        </form>

                    </div>
                    <Button.Info onClick={this.post}> Oppdater </Button.Info>
                    <p style={{color: "red"}}>{this.melding}</p>
                </div>
            </div>
        );
    }
    handleViktighet(){
        if(this.viktig){
            this.knapp = "Legg på forsiden";
            this.viktig = false;
            this.selectedArticle.viktighet = '2';
        }else if(!this.viktig){
            this.knapp = "Ikke legg på forsiden";
            this.viktig = true;
            this.selectedArticle.viktighet = '1';
        }
    }


    post(){
        if(!this.form || !this.form.checkValidity()){
            this.melding = "Fyll ut de røde feltene";
            this.mounted();
            return;
        }
        else{
            let tempArticle = new Artikkel(this.selectedArticle.tittel, this.selectedArticle.tekst, this.selectedArticle.bilde, this.selectedArticle.forfatter, this.selectedArticle.viktighet, this.selectedArticle.kategoriid, this.selectedArticle.alt);
            artikkelService.updateArticle(this.selectedArticle.id, tempArticle)
                .then((response) => {
                    window.location.reload()
                }, console.log("Artikkel oppdatert"))
                .then(history.push('/article/' + this.selectedArticle.id))
                .catch((error: Error) => console.error(error.message));
        }
    }
    mounted() {
        artikkelService
            .getArticle(this.props.match.params.id)
            .then(article => {
                this.selectedArticle = article[0];
                if(parseInt(article[0].viktighet) === 1){
                    this.viktig = true;
                    this.knapp = "Ikke legg på forsiden";
                }
            })
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getCategories()
            .then(kategori => (this.kategorier = kategori))
            .catch((error: Error) => console.error(error.message));
    }
}

const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Menu />
                <Scroll />
                <Route exact path="/" component={Home} />
                <Route exact path = "/lastopp" component={LastOpp} />
                <Route exact path = "/article/:id" component={article}/>
                <Route exact path = "/edit/:id" component={edit}/>
                <Route exact path="/nyheter" component={Nyheter} />
                <Route exact path="/kategori/:id" component={Kategorier} />
                <Route exact path="/søk" component={Sok} />
                <Footer/>
            </div>
        </HashRouter>,
        root
    );
