let url = "http//localhost:8080";



export class communication{


    constructor(){}
    hentSheev(){
        fetch("http://localhost:8080/artikkel/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=ut+++6+f-8"
            },
        })
            .then(response => response.json())
            .then(json =>this.handleResponse(json))
            .catch(error => console.error("Error: ", error));
    }
    handleResponse(json){
        document.getElementById("test").innerHTML = json.tittel;
        document.getElementById("bilde").src = json.bilde;
    }

    hentViktige(){
        fetch("http://localhost:8080/artikkel/viktighet/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=ut+++6+f-8"
            },
        })
            .then(response => response.json())
            .then(json =>this.handleViktige(json))
            .catch(error => console.error("Error: ", error));
    }
    handleViktige(json){
        var node;
        var para;
        json.map(i => (
            para = document.createElement("p"),
            node = document.createTextNode(i.bilde),
            para.appendChild(node)))
    }

    postArticle(tittel: string, tekst: string, bilde: string, forfatter: string, viktighet: string, kategori: string){
        let article = {
            tittel: tittel,
            tekst: tekst,
            bilde: bilde,
            forfatter: forfatter,
            viktighet: viktighet,
            kategori: kategori,
        };
        fetch("http://localhost:8080/artikkel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({article})
        })
            .then(response => response.json())
            .then(json => alert("Lastet opp artikkel" + json))
            .catch(error => console.error("Error: ", error));
    }
}
