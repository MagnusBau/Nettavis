// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, Card, CardWrap, NavBar, Button, Row, Column, Article, SelectedArticle, Comment} from './widgets';
import {ArtikkelService, Artikkel, Kategori, Kommentar} from './Service'

import { createHashHistory } from 'history';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


let artikkelService = new ArtikkelService();

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                <a className="navbar-brand" href="#">Nettavis</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="#nyheter">Nyheter</a>
                        <a className="nav-item nav-link" href="#sport">Sport</a>
                        <a className="nav-item nav-link" href="#kultur">Kultur</a>
                        <a className="nav-item nav-link" href="#teknologi">Teknologi</a>
                        <a className="nav-item nav-link" href="#lastopp">Last opp</a>
                    </div>
                </div>
            </nav>
        );
    }
}

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small special-color-dark pt-4" style={{backgroundColor: '#353942'}}>
                <div className="container">
                    <div className="row justify-content-center" style={{fontSize: 30, color: 'white'}}>
                        <Button.Info onClick={this.loadMore}>Last inn flere artikler</Button.Info>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3" style={{color: 'white'}}>Laget av
                    Magnus Baugerud
                </div>

            </footer>
        );
    }
    loadMore(){

    }
}

class Home extends Component {
    artikler: Artikkel[] = [];
    siste: Artikkel[] = [];
    render() {
        return (
            <div>
                <marquee behavior="scroll" direction="left">
                    {this.siste.map(i => (
                        <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                            {i.tittel}
                        </NavLink>
                    ))}
                </marquee>
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
            </div>
        );
    }

    mounted() {
        artikkelService
            .getArtikkler()
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }

}

class Nyheter extends Component {
    artikler: Artikkel[] = [];
    siste: Artikkel[] = [];
    render() {
        return (
            <div>
                <marquee behavior="scroll" direction="left">
                    {this.siste.map(i => (
                        <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                            {i.tittel}
                        </NavLink>
                    ))}
                </marquee>
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
            </div>
        );
    }

    mounted() {
        artikkelService
            .getNyheter()
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }

}

class Sport extends Component {
    artikler: Artikkel[] = [];
    siste: Artikkel[] = [];
    render() {
        return (
            <div>
                <marquee behavior="scroll" direction="left">
                    {this.siste.map(i => (
                        <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                            {i.tittel}
                        </NavLink>
                    ))}
                </marquee>
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
            </div>
        );
    }

    mounted() {
        artikkelService
            .getArticleBycat(2)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }

}

class Teknologi extends Component {
    artikler: Artikkel[] = [];
    siste: Artikkel[] = [];
    render() {
        return (
            <div>
                <marquee behavior="scroll" direction="left">
                    {this.siste.map(i => (
                        <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                            {i.tittel}
                        </NavLink>
                    ))}
                </marquee>
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
            </div>
        );
    }

    mounted() {
        artikkelService
            .getArticleBycat(3)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }

}

class Kultur extends Component {
    artikler: Artikkel[] = [];
    siste: Artikkel[] = [];
    render() {
        return (
            <div>
                <marquee behavior="scroll" direction="left">
                    {this.siste.map(i => (
                        <NavLink exact to={'/article/' + i.id} key={i.id} className="scroll" style={{paddingRight: 100}}>
                            {i.tittel}
                        </NavLink>
                    ))}
                </marquee>
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
            </div>
        );
    }

    mounted() {
        artikkelService
            .getArticleBycat(4)
            .then(artikler => (this.artikler = artikler))
            .catch((error: Error) => console.error(error.message));
        artikkelService
            .getSiste()
            .then(artikler => (this.siste = artikler))
            .catch((error: Error) => console.error(error.message))
    }

}

class article extends Component<{match : {params: {id: number}}}>{
    selectedArticle: Artikkel = new Artikkel(1, "init", "init", "init", "init", "init", "init", "init", "init");
    comments: Kommentar[] = [];

    nickname: string = "Curious Betsy";
    tekst: string = "Bra Artikkel!";
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
                            <input type="text" className="form-control" placeholder="Curious Betsy" aria-label="nickname"
                                   aria-describedby="basic-addon1" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.nickname = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url" style={{marginLeft: '3%'}}>Kommentar: </label>
                        <div className="input-group" style={{width: '90%', marginLeft: '3%', marginBottom: '3%'}}>
                            <div className="input-group-prepend">
                            </div>
                            <textarea className="form-control" aria-label="tekst" rows="3" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tekst = event.target.value)}></textarea>
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
        let tempKommentar = new Kommentar(0, this.nickname, this.tekst, this.props.match.params.id);
        artikkelService
            .postKommentar(tempKommentar)
            .then((response) => {
                window.location.reload();
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
    render() {
        return(
            <div className="row justify-content-center">
                <div className="mb-4 border-0 " style={{width: '75%'}}>
                    <div className="card-body">

                        <label htmlFor="basic-url">Tittel: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Tittel" aria-label="tittel"
                                   aria-describedby="basic-addon1" value={this.tittel} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tittel = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Bilde-url: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Lim inn en bildeadresse her!" aria-label="bildeurl"
                                   aria-describedby="basic-addon4"  value={this.bilde} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.bilde = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Alt: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Dette er et bilde" aria-label="alt"
                                   aria-describedby="basic-addon2"  value={this.alt} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.alt = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Forfatter: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Ola Nordmann" aria-label="forfatter"
                                   aria-describedby="basic-addon3"  value={this.forfatter} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.forfatter = event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="kategori">Kategori: </label>
                            <select className="form-control" id="kategori"
                            value={this.kategori} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.kategori = event.target.value)}>
                                {this.kategorier.map(i =>(
                                    <option key={i.id} value={i.id}>{i.navn}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="viktighet" onChange={this.handleViktighet}/>
                            <label className="form-check-label" htmlFor="viktighet">Viktig</label>
                        </div>

                        <label htmlFor="basic-url">Tekst: </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            </div>
                            <textarea className="form-control" aria-label="tekst" rows="10" value={this.tekst} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.tekst = event.target.value)}></textarea>
                        </div>

                    </div>
                    <Button.Info onClick={this.post}> Last opp </Button.Info>
                </div>
            </div>
        );
    }
    handleViktighet(event){
        if (event.target.checked){
            this.viktighet = '1';
        }
        else {
            this.viktighet = '2';
        }
    }
    handleKategori(event){
        this.kategori = event.target.value;
    }

    post(){
        let tempArticle = new Artikkel(0, this.tittel, this.tekst, this.bilde, this.forfatter, this.viktighet, this.kategori, this.alt, '0');
        artikkelService.postArticle(tempArticle)
            .then((response) => {
                history.push('/nyheter');
            }, console.log("Artikkel lastet opp"))
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
    selectedArticle: Artikkel =  new Artikkel(1, "init", "init", "init", "init", "init", "init", "init", "init");
    kategorier: Kategori[] = [];
    kategori = 1;
    render() {
        return(
            <div className="row justify-content-center">
                <div className="mb-4 border-0 " style={{width: '75%'}}>
                    <div className="card-body">

                        <label htmlFor="basic-url">Tittel: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Tittel" aria-label="tittel"
                                   aria-describedby="basic-addon1" value={this.selectedArticle.tittel} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.tittel = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Bilde-url: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Lim inn en bildeadresse her!" aria-label="bildeurl"
                                   aria-describedby="basic-addon4"  value={this.selectedArticle.bilde} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.bilde = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Alt: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Dette er et bilde" aria-label="alt"
                                   aria-describedby="basic-addon2"  value={this.selectedArticle.alt} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.alt = event.target.value)}/>
                        </div>

                        <label htmlFor="basic-url">Forfatter: </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Ola Nordmann" aria-label="forfatter"
                                   aria-describedby="basic-addon3"  value={this.selectedArticle.forfatter} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.forfatter = event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="kategori">Kategori: </label>
                            <select className="form-control" id="kategori"
                                    value={this.kategori} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.kategori = event.target.value)}>
                                {this.kategorier.map(i =>(
                                    <option key={i.id} value={i.id}>{i.navn}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="viktighet" onChange={this.handleViktighet}/>
                            <label className="form-check-label" htmlFor="viktighet">Viktig</label>
                        </div>

                        <label htmlFor="basic-url">Tekst: </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            </div>
                            <textarea className="form-control" aria-label="tekst" rows="10" value={this.selectedArticle.tekst} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.selectedArticle.tekst = event.target.value)}></textarea>
                        </div>

                    </div>
                    <Button.Info onClick={this.post}> Oppdater </Button.Info>
                </div>
            </div>
        );
    }
    handleViktighet(event){
        if (event.target.checked){
            this.selectedArticle.viktighet = '1';
        }
        else {
            this.selectedArticle.viktighet = '2';
        }
    }


    post(){
        this.kategori = 1;
        let tempArticle = new Artikkel(this.selectedArticle.id, this.selectedArticle.tittel, this.selectedArticle.tekst, this.selectedArticle.bilde, this.selectedArticle.forfatter, this.selectedArticle.viktighet, this.selectedArticle.kategoriid, this.selectedArticle.alt, '0');
        artikkelService.updateArticle(this.selectedArticle.id, tempArticle)
            .then((response) => {
                history.push('/article/' + this.selectedArticle.id);
            }, console.log("Artikkel oppdatert"))
            .catch((error: Error) => console.error(error.message));
    }
    mounted() {
        artikkelService
            .getArticle(this.props.match.params.id)
            .then(article => (this.selectedArticle = article[0]))
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
                <Alert />
                <Menu />
                <Route exact path="/" component={Home} />
                <Route exact path = "/lastopp" component={LastOpp} />
                <Route exact path = "/article/:id" component={article}/>
                <Route exact path = "/edit/:id" component={edit}/>
                <Route exact path="/nyheter" component={Nyheter} />
                <Route exact path="/sport" component={Sport} />
                <Route exact path="/teknologi" component={Teknologi} />
                <Route exact path="/kultur" component={Kultur} />
                <Footer/>
            </div>
        </HashRouter>,
        root
    );
