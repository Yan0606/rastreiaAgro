const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const express = require('express');
const app = express();

const admin = require('./firebase')  ;
const db = admin.database();

function criarTabela(dados) {
    let tabela = `<table class="table table-striped zebrado">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da propriedade</th>
                            <th>longitude</th>
                            <th>latitude</th>
                            <th>cidade</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`;
    for (let chave in dados) {
        tabela += `<tr>
                        <td>${chave}</td>
                        <td>${dados[chave].nome}</td>
                        <td>${dados[chave].longitude}</td>
                        <td>${dados[chave].latitude}</td>
                        <td>${dados[chave].cidade}</td>
                        <td>
                            <a class="btn btn-outline-warning" href="/propriedade/editar/${chave}">Alterar</a>
                        </td>
                        <td>
                            <a class="btn btn-outline-danger" href="/propriedade/excluir/${chave}">Excluir</a>
                        </td>
                    </tr>`;
    }            
    tabela += `</tbody >
            </table > `;
    return tabela;
}

app.get('/', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/propriedade/propriedade.html', (e, dados) => {
                let tabela = "";
                const docPropriedade = db.ref("propriedade");
                docPropriedade.once("value", function(snapshot){
                    tabela = criarTabela(snapshot.val());
                    dados = dados.toString().replace("{tabela}", tabela);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(cabecalho + dados + rodape);
                    res.end();
                });
            });
        });
    });
});


app.get('/novo', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/Propriedade/nova_propriedade.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});


app.post('/novo', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/Propriedade/propriedade.html', (e, dados) => {
                let mensagem = "";
                try{
                    const docPropriedade = db.ref("propriedade").push();
                    const propriedade = {
                        nome: req.body.nome,
                        longitute: req.body.longitude,
                        latitude: req.body.latitude,
                        cidade: req.body.cidade

                    };
                    docPropriedade.set(propriedade);
                    mensagem = "Propriedade inserida com sucesso!";
                }catch(e){
                    mensagem = "Erro ao inserir a propriedade!";
                }
                dados = dados.toString().replace("{mensagem}", mensagem);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});


app.get('/editar/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/Propriedade/editar_propriedade.html', (e, dados) => {
                let id = req.params.id;
                const docPropriedade = db.ref("propriedade/"+id);
                docPropriedade.once("value", function(snapshot){
                    let nome = snapshot.val().nome;
                    let longitude = snapshot.val().longitude;
                    let latitude = snapshot.val().latitude;
                    let cidade = snapshot.val().cidade;
                    dados = dados.toString().replace("{nome}", nome);
                    dados = dados.toString().replace("{longitude}", longitude);
                    dados = dados.toString().replace("{latitude}", latitude);
                    dados = dados.toString().replace("{cidade}", cidade);
                    dados = dados.toString().replace("{id}", id);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(cabecalho + dados + rodape);
                    res.end();
                });
            });
        });
    });
});

app.post('/editar', urlencodedParser, (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let cidade = req.body.cidade;
    let docPropriedade = db.ref("propriedade");
    docPropriedade.child(id).update(
        {
            'nome': nome,
            'longitude': longitude,
            'latitude' : latitude,
            'cidade' : cidade
        }
    );
    res.redirect("/propriedade");
});

app.get('/excluir/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/propriedade/excluir_propriedade.html', (e, dados) => {
                let id = req.params.id;
                const docPropriedade = db.ref("propriedade/"+id);
                docPropriedade.once("value", function(snapshot){
                    let nome = snapshot.val().nome;
                    let longitude = snapshot.val().longitude;
                    let latitude = snapshot.val().latitude;
                    let cidade = snapshot.val().cidade;
                    dados = dados.toString().replace("{nome}", nome);
                    dados = dados.toString().replace("{longitude}", longitude);
                    dados = dados.toString().replace("{latitude}", latitude);
                    dados = dados.toString().replace("{cidade}", cidade);
                    dados = dados.toString().replace("{id}", id);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(cabecalho + dados + rodape);
                    res.end();
                });
            });
        });
    });
});

app.post('/excluir', urlencodedParser, (req, res) => {
    let id = req.body.id;
    const docPropriedade = db.ref("propriedade/" + id);
    docPropriedade.remove();
    res.redirect("/propriedade");
});



module.exports = app;