// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
//$FlowFixMe
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import {ArtikkelService, Artikkel, Kategori} from './Service'
import {ImageProps} from "react-bootstrap";

const history = createHashHistory();

let artikkelService = new ArtikkelService();

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  static nextId = 0;

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              type="button"
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'danger' });
    });
  }
}

class NavBarLink extends Component<{ exact?: boolean, to: string, children?: React.Node }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" exact={this.props.exact} to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a navigation bar using Bootstrap classes
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        {
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}

/**
 * Renders an information card using Bootstrap classes
 */
export class Card extends Component<{ title: React.Node, children?: React.Node }> {
  render() {
    return (
        <div className="">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{this.props.title}</h3>
              <div className="card-text">{this.props.children}</div>
            </div>
          </div>
        </div>
    );
  }
}

export class Article extends Component<{title: React.Node, image?: React.Node, alt?: React.Node, id: React.Node}> {
  render() {
    return(
        <div className="card mb-4 border-0" style={{width: 500, minHeight: 420}}>
          <img src={this.props.image} onError={this.addDefault} className="card-img-top" title={this.props.alt} alt={this.props.alt}/>
          <div id={"card" + String(this.props.id)} className="card-img-overlay">

          </div>
            <div className="card-body">
              <h3 className="card-title">{this.props.title}</h3>
            </div>
        </div>
    );
  }
  addDefault(ev: SyntheticInputEvent<HTMLImageElement>){
    ev.target.src = "https://gotrips.lk/site/images/uploads/img.jpg";
    var h5 = document.createElement("h5");
    h5.style.color = "#FFFFFF";
    h5.innerHTML = String(this.props.alt);

    //$FlowFixMe
    document.getElementById("card" + String(this.props.id)).appendChild(h5);
  }
}

export class SelectedArticle extends Component<{title: React.Node, children?: React.Node, timestamp: React.Node, forfatter: React.Node, image?: React.Node, id?: React.Node, alt?: React.Node}>{
  show = false;
  render() {
    return(
        <div className="row justify-content-center">
        <div className="card mb-4 border-0" style={{width: '50%'}}>
          <img src={this.props.image} onError={this.addDefault} className="card-img-top" title={this.props.alt}/>
          <div id={"card"} className="card-img-overlay"></div>
          <div className="card-body">
            <h3 className="card-title">{this.props.title}</h3>
            <div className="card-text" style={{whiteSpace: 'pre-line'}}>{this.props.children}</div>
            <br/>
            <footer className="blockquote-footer">
              {"Forfatter: " + String(this.props.forfatter)}
            </footer>
            <br/>
            <Row>
              <Column width={2}>
            <ButtonInfo onClick={this.edit}>Rediger</ButtonInfo>
              </Column>
              <Column>
            <ButtonDanger onClick={this.handleShow}>Slett</ButtonDanger>
              </Column>
            </Row>
            <footer>
              {"Sist oppdatert: " + String(this.props.timestamp)}
            </footer>
          </div>
        </div>
          <Modal show={this.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Er du sikker på at du vil slette denne artikkelen?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <ButtonNormal onClick={this.handleClose}>Avbryt</ButtonNormal>
              <ButtonDanger onClick={this.delete}>Yeet!</ButtonDanger>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
  handleShow(){
    this.show = true;
  }
  handleClose(){
    this.show = false;
  }
  edit(){
    history.push("/edit/" + String(this.props.id))
  }

  delete(){
    artikkelService
        .deleteArticle(parseInt(this.props.id))
        .then((response) => {
          window.location.reload()
        })
        .then(history.push("/"))
        .catch((error: Error) => console.error(error.message));
  }

  addDefault(ev: SyntheticInputEvent<HTMLImageElement>){
    ev.target.src = "https://gotrips.lk/site/images/uploads/img.jpg";
    var h5 = document.createElement("h5");
    h5.style.color = "#FFFFFF";
    h5.innerHTML = String(this.props.alt);

    //$FlowFixMe
    document.getElementById("card").appendChild(h5);
  }
}

export class Comment extends Component<{tekst: React.Node, nickname: React.Node}>{
  render() {
    return(
        <div className="row justify-content-center">
          <div className="card mb-4 border-0" style={{width: '50%'}}>
            <div className="card-body">
              <div className="card-text" style={{whiteSpace: 'pre-line'}}>
                {this.props.tekst}
              </div>
              <div className="blockquote-footer">
                {this.props.nickname}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export class CardWrap extends Component<{children?: React.Node }> {
  render() {
    return (
        <div className="col d-flex justify-content-center">
          <div className="card mb-4 border-0">
              <div className="card-body">
                <div className="card-text">{this.props.children}</div>
              </div>
          </div>
        </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
      <div
        className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
      >
        {this.props.children}
      </div>
    );
  }
}

class ButtonDanger extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonInfo extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {
  render() {
    return (
        <button type="button" className="btn btn-info" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    );
  }
}

class ButtonNormal extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {
  render() {
    return (
        <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    );
  }
}

/**
 * Renders a button using Bootstrap classes
 */
export class Button {
  static Danger = ButtonDanger;
  static Info = ButtonInfo;
}
