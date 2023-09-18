# Talker Manager

## :page_with_curl: Sobre

O projeto Talker Manager consolida a utilização de Node.js e Express.js juntamente com as ferramentas Docker e MySQL para a criação de uma API RESTful com CRUD completo. Foi criada uma API CRUD para cadastro de pessoas palestrantes, em que é possível ler, cadastrar, editar e deletar informações do banco de dados.

Este projeto utiliza o módulo fs do Node.js para visualização e manipulação do banco de dados, permitindo o gerenciamento das informações das pessoas palestrantes de forma dinâmica e eficiente. Para me desafiar e me preparar para os próximos projetos, também fiz a conexão com o banco de dados relacional MySQL, fazendo uso da biblioteca mysql/promise.

## :woman_technologist: Habilidades desenvolvidas

. Docker
. Node.js
. Express.js
. MySQL
. Construção de uma API CRUD

## 🛠️ Ferramentas Utilizadas

. Docker
. Node.js
. Express.js
. MySQL

## ⚙️ Como Executar

> :warning: &nbsp; _Para executar este projeto é necessário ter o Docker instalado_

<details>
  <summary> Como iniciar </summary>
  <br>

1. Clone o repositório em uma pasta de preferência

```
git clone git@github.com:JessicaLopesDev/project-talker-manager.git
```

2. É necessario executar o comando abaixo no diretório raiz do projeto para rodar o projeto.

```
docker-compose up -d
```

3. As dependências do projeto serão instaladas juntamente com o início do container. Depois, digite os comandos abaixo para acessar o bash do container e iniciar o servidor no mesmo terminal em que o container foi orquestrado.

```
docker exec -it talker_manager bash
npm start
```

4. Para iniciar o servidor com live-reload, ao invés de <code>npm start</code> digite o comando abaixo

```
npm run dev
```

5. Para visualização da interface da API podem ser utilizados o Thunder Client, Postman, Insomnia ou alguma outra ferramenta de sua preferência
</details>
