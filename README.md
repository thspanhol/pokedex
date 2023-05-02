# ⚜️ Projeto Pokedex ⚜️

O projeto foi desenvolvido com o intuito de utilizar a API do Pokéapi (pokeapi.co) para desenvolver uma pokedex, um buscador de pokemons que podem ser filtrados por tipo e/ou nome, além de conter as estatísticas individuais em uma segunda página!

### ⚜️ Instalação

Clone o repositório com o comando:
```
git clone https://github.com/thspanhol/pokedex.git
```

Depois entre na pasta do projeto e instale as dependências com o comando:
```
npm install
```

Após isso, para abrir a aplicação basta usar o comando:
```
npm start
```
### ⚜️ Como Utilizar

Ao abrir a aplicação será renderizada uma tela com todos os pokémons da primeira e segunda geração. A tela também conta com um input para pesquisa por nome e botões para filtro por tipo, além disso, clicando em cima do pokémon escolhido será aberta outra página contendo as estatísticas do mesmo.

## ⚜️ Possiveis alterações

* Alterando o valor atribuído a variável limit contida na linha 12 do arquivo Home (src\Pages\Home\index.js), é possível aumentar ou diminuir o número de pokémons elencados na aplicação.

## ⚜️ Construído com

* React - O framework usado para desenvolver os componentes JSX.
* CSS - Para estilização da página.
* Pokéapi - Usada para buscar as informações dos pokémons.
* Axios - Usado para buscar os dados fornecidos pela API.
* Router Dom - Para determinar as rotas da aplicação.

## ⚜️ Autor

* **Thales Spanhol** - [Perfil no GitHub](https://github.com/thspanhol)

---