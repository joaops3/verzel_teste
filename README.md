<div align="center"> 
 <img align="center" alt="tech" width="40" height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> 
 <img align="center" alt="tech" width="40" height="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" />
            
</div>

<h3 align="center">Teste verzel Desenvolvedor FullStack</h3>

---

## Sumário

- [Regras de negocio](#regra)
- [Backend](#backend)
	- [Tecnologias](#tecnologias_back)
	- [Diagrama](#diagrama)
	- [Rotas](#rotas)
- [Frontend](#frontend)
	- [Tecnologias](#tecnologias_front)
	- [Funcionamento](#funcionamento_front)
- [Executar Projeto](#executar)

## Regras de Negocio <a name = "regra"></a>
Desenvolver um sistema com catálogo de veículos a venda.
- Homepage exibindo os veículos
- Os veiculos devem estar osdenados por ordem de valor
- Para cadastros de veículos devera ter login administrativo com token JWT
- Todas as requisições privadas precisam de um token JWT valido
- Atributos obrigatorios para veículos são: id, nome, marca modelo, foto
- O backend devera ser uma API Rest
- Todos os dados devem ser persistidos em banco de dados


## BackEnd<a name = "backend"></a>
### Tech utilizada: <a name = "tecnologias_back"></a>

- node 16.17.0
- express
- passport - jwt 
- jsonWebToken
- Multer
- Prisma
- mySQL

### Diagrama:

Foi utilizado como bando de dados o mySQL, e o Prisma como ORM.
O projeto possui 3 models, sendo elas user, car, photo. Podendo ser visto com mais detalhes no diagrama abaixo: 

<img src="./backend/public/diagrama_bd.png">

### Rotas <a name = "rotas"></a>
<p>O projeto é dividido nas seguintes rotas:</p>

**/car**: 
<p>Para utilizar as rotas de POST, UPDATE, DELETE é necessario que o user seja admin e fornecer token JWT valido.Campos Post: name, model, brand, price, Photo </p>

- /car (GET, POST)
- /car/:id (GET, UPDATE, DELETE)



**/user**:
<p>Para utilizar as rotas de POST, UPDATE, DELETE é necessario fornecer token JWT valido. Campos Post: name, password, admin?:boolean </p>


- /user (GET, POST)
- /user/:id (GET, UPDATE, DELETE)



**/login**:

- /login (POST)

As rotas podem ser testadas utilizando a interface gráfica do frontend. O projeto tambem acompanha um esquema das rotas que pode ser utilizado no postman

## FrontEnd <a name = "frontend"></a>

### Principais lib utilizadas: <a name = "tecnologias_front"></a>

- node 16.17.0
- Next
- scss
- Bootsrap React
- React Hook Forms

## Funcionamento <a name = "funcionamento_front"></a>

**Estrutura do Projeto:**

- `./pages`: É a páginas e rotas do projeto
- `./components`: Todos os componentes e utilizados nas páginas
- `./services`: Custom Hooks, que possui funções responsaveis por armazenar as rotas e interargir com a API
- `./context`: Provedores de contexto da aplicação, neste caso temos somente o AuthProvider
- `./styles`: Onde fica todos os stilos da aplicação,  temos o arquivo _app que importa todos os outros arquivos e globals responsavel por importar o _app e os styles globais
	-  `./styles/components`: Onde fica todos os stilos utilizados nos components.
- `./helpers`: Onde fica todas as funções e arquivos de ajuda, como por exemplo funções responsaveis por colocar maskara.


**Projeto em execução:**

<div > 
<img align="center" alt="tech" width="300" height="250" src="./backend/public/listagem" /> 
<img align="center" alt="tech" width="300" height="250" src="./backend/public/edicao" />
<img align="center" alt="tech" width="300" height="250" src="./backend/public/login" />
</ div>


## Como executar Projeto ? <a name = "executar"></a>

#### Alterar env com dados do banco para acessar

Alterar na env do backend. Colocar usuario e senha, onde fica root e password. O banco utilizado é  o MYSQL

DATABASE_URL="mysql://root:password@localhost:3306/verzel_teste"


#### Rodar Backend

- executar npx prisma migrate dev (Para criar banco, models e popular)
- npm start, para executar backend

#### Rodar Frontend
# Rodar frontend 

Para rodar o frontend utilizar o comando:

- npm run dev
- O banco possui 2 usuarios pre-cadastrados para teste; usuario: admin, client; senha: 123
- Apenas o admin pode incluir, alterar, excluir produtos.
