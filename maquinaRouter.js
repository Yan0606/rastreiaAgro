const fs = require('fs');
const bodyParser = require('body-parser') ;
const urlencodedParser = bodyParser.urlencoded({extended: true});
const express = require('express');
const app = express();

const admin = require('./firebase') ;
const db = admin.database();

app.get('/', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/maquina/maquina.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});


app.get('/novo', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/maquina/nova_maquina.html', (e, dados) => {
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
            fs.readFile('src/maquina/maquina.html', (e, dados) => {
                let mensagem = "";
                try{
                    const docmaquina = db.ref("maquina").push();
                    const maquina = {
                        marca: req.body.marca,
                        modelo: req.body.modelo,
                        placa: req.body.placa


                    };
                    docmaquina.set(maquina);
                    mensagem = "maquina inserida com sucesso!";
                }catch(e){
                    mensagem = "Erro ao inserir a maquina!";
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
            fs.readFile('src/maquina/editar_maquina.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para editar os dados de um registro de livro
app.post('/editar', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/index.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para abrir formulário para excluir um registro de um livro
app.get('/excluir/:id', (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/maquina/excluir_maquina.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

// Rota da página para excluir um registro de um livro
app.post('/excluir', urlencodedParser, (req, res) => {
    fs.readFile('src/cabecalho.html', (e, cabecalho) => {
        fs.readFile('src/rodape.html', (e, rodape) => {
            fs.readFile('src/index.html', (e, dados) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(cabecalho + dados + rodape);
                res.end();
            });
        });
    });
});

module.exports = app;