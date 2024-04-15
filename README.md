# RastreiaAgro
<div align="center">
  <p align="center">
    <a href="https://skillicons.dev">
      <img src="https://skillicons.dev/icons?i=nodejs,firebase" />
    </a>
</div>

Este é um repositório GitHub para um projeto desenvolvido em Node.js e Firebase. O projeto tem como objetivo realizar operações básicas de CRUD (Criar, Ler, Atualizar e Deletar) em um banco de dados. As entidades principais do banco de dados são Agricultor, Cultura, Máquina, Produto e Propriedade.

## Funcionalidades
- Registro de dados para Agricultor, Cultura, Máquina, Produto e Propriedade.
- Atualização de dados existentes.
- Exclusão de registros.
  
## Pré-requisitos
Para executar o projeto localmente, você precisará ter:
- Node.js
- Conta no Firebase
- Visual Studio Code (ou qualquer editor de código de sua preferência)

## Instruções para Execução
1. Clone o repositório para sua máquina local:
  ```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
````

2. Navegue até o diretório do projeto:
  ```bash
cd nome-do-repositorio
````

3. Instale as dependências do projeto:
  ```bash
npm install
```

4. Configure suas credenciais do Firebase:
Certifique-se de ter um arquivo \`serviceAccountKey.json\` com as credenciais do seu projeto Firebase. Você pode obtê-lo na sua conta Firebase Console.


5. Execute o projeto:
  ```bash
node app.js
````

Isso iniciará o servidor localmente e você poderá acessar as funcionalidades CRUD através das rotas definidas no projeto.
