# ⚜️ Projeto Pokedex ⚜️

O projeto foi desenvolvido com o intuito de utilizar a API do ygoprodeck (https://ygoprodeck.com/api-guide/) para fazer uma ferramenta de busca de cartas dentro de um arquétipo específico, o escolhido para a aplicação foi o Blackwing!

### ⚜️ Instalação

Clone o repositório com o comando:
```
git clone https://github.com/thspanhol/project-ygo.git
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

Ao abrir a aplicação será renderizada uma tela de apresentação informando do que o projeto se trata junto com um botão SEARCH. Clicando nesse botão a página será direcionada para a tela de exibição dos cards, onde terá um input que pode ser usado para buscar cartas pelo nome e também 3 botões que filtram a lista para apenas as cartas do tipo monstro, mágica ou armadilha. Clicando em qualquer carta da lista, a página será redirecionada para uma terceira tela com os detalhes da carta clicada e um botão para voltar para a lista.

## ⚜️ Possiveis alterações

* O arquétipo de cartas escolhido pode ser alterado para outro, para isso basta alterar a string presente na linha 18 do arquivo AppContext (project-ygo\src\context\AppContext.jsx)
* Exemplos de possíveis substituições:
```
https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Dark%20Magician
```
```
https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes
```

## ⚜️ Executando os testes

Os testes da tela de apresentação podem ser feitos com o comando:
```
npm run test
```

## ⚜️ Construído com

* React - O framework usado para desenvolver os componentes JSX
* CSS - Para estilização da página
* YGO API - Usada para buscar e gerar as cartas
* Router Dom - Para determinar as rotas da aplicação
* Jest e Testing Library - Para desenvolver os testes
* Vanilla-Tilt - Para o efeito hover nas cartas

## ⚜️ Autor

* **Thales Spanhol** - [Perfil no GitHub](https://github.com/thspanhol)

---