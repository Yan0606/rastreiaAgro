const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const express = require('express');
const app = express();

const admin = require('./firebase');
const db = admin.database();

app.get('/', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/cultura/cultura.html', (e, dados) => {
                let tabela = "";
                const doccultura = db.ref("cultura");
                doccultura.once("value", function(snapshot){
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
            fs.readFile('src/cultura/nova_cultura.html', (e, dados) => {
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
            fs.readFile('src/cultura/cultura.html', (e, dados) => {
                let mensagem = "";
                try{
                    const doccultura = db.ref("cultura").push();
                    const cultura = {
                        nome: req.body.nome,
                        tempo: req.body.tempo

                    };
                    doccultura.set(cultura);
                    mensagem = "Cultura inserida com sucesso!";
                }catch(e){
                    mensagem = "Erro ao inserir a cultura!";
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
            fs.readFile('src/cultura/editar_cultura.html', (e, dados) => {
                let id = req.params.id;
                const doccultura = db.ref("cultura/"+id);
                doccultura.once("value", function(snapshot){
                    let nome = snapshot.val().nome;
                    let tempo = snapshot.val().tempo;
                    dados = dados.toString().replace("{nome}", nome);
                    dados = dados.toString().replace("{tempo}", tempo);
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
    let tempo = req.body.tempo;
    let doccultura = db.ref("cultura")  ;
    doccultura.child(id).update(
        {
            'nome': nome,
            'tempo': tempo
        }
    );
    res.redirect("/cultura");
});

app.get('/excluir/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/cultura/excluir_cultura.html', (e, dados) => {
                let id = req.params.id;
                const doccultura = db.ref("cultura/"+id);
                doccultura.once("value", function(snapshot){
                    let nome = snapshot.val().nome;
                    let tempo = snapshot.val().tempo;
                    dados = dados.toString().replace("{nome}", nome);
                    dados = dados.toString().replace("{tempo}", tempo);
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
    const doccultura = db.ref("cultura/"+id);
    doccultura.remove();
    res.redirect("/cultura");
});

function criarTabela(dados) {
    let tabela = `<table class="table table-striped zebrado">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da cultura</th>
                            <th>Tempo</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`;
    for (let chave in dados) {
        tabela += `<tr>
                        <td>${chave}</td>
                        <td>${dados[chave].nome}</td>
                        <td>${dados[chave].tempo}</td>
                        <td>
                            <a class="btn btn-outline-warning" href="/cultura/editar/${chave}">Alterar</a>
                        </td>
                        <td>
                            <a class="btn btn-outline-danger" href="/cultura/excluir/${chave}">Excluir</a>
                        </td>
                    </tr>`;
    }            
    tabela += `</tbody >
            </table > `;
    return tabela;
}

module.exports = app;