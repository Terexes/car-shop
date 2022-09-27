# Car Shop

API desenvolvida durante o módulo de backend da Trybe, cujo objetivo é fornecer os endpoints para o gerenciamento de uma concessionária,
onde é possível criar, visualizar, deletar e atualizar veículos.
Foram desenvolvidos testes unitários para essa API utilizando Mocha, Chai e Sinon.
Para o gerenciamento dos dados foi utlizado o banco de dados não relacional MongoDB.

## Ferramentas utilizadas

* Node.js
* Express.js
* TypeScript
* Sequelize
* MongoDB
* Mongoose
* Mocha.js
* Chai.js
* Sinon.js
* Docker
* Conceitos de POO e SOLID

## Rodando aplicação
<details> 
  <summary>
    <strong>🐳 Rodando o servidor no Docker</strong>
  </summary>

Clone o projeto

```bash
  git@github.com:Terexes/car-shop.git
```

Entre no diretório do projeto

```bash
  cd car-shop
```

Instale as dependências

```bash
  npm install
```

Suba o container Docker

```bash
  docker-compose up -d
```

Execute o container

```bash
   docker exec -it car_shop bash
```

Inicie o servidor dentro do container

```bash
   npm run dev
```
</details>

<details> 
  <summary>
    <strong>✅ Rodando localmente</strong>
  </summary>
  
  Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker, basta seguir os passos a seguir:

  Baixe a imagem do MongoDB:
  
  ```bash
    docker pull mongo
  ```
  
  Crie o container do MongoDB:
  
   ```bash
    docker run --name <nome-do-container> -p 27017:27017 -d mongo
   ```
   
  Confira se o container está rodando:
  
   ```bash
    docker container ls
   ```
  Execute o servidor localmente:
    
   ```bash
    npm run dev
   ```
 
 </details>
 
 ## Rodando os testes

Para rodar os testes, execute o seguinte comando:

```bash
  npm run test:dev
```