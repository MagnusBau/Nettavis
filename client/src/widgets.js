// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { createHashHistory } from 'history';

import Modal from 'react-bootstrap/Modal';
import {ArtikkelService} from './Service'

const history = createHashHistory();

let artikkelService = new ArtikkelService();


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
          <img src={this.props.image} onError={this.addDefault} className="card-img-top" title={this.props.alt} alt={this.props.alt}/>
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
