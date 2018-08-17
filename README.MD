# Desafio implementador front-end: React, HTML, CSS & JS


### Desafio
- O desafio consiste em implementar uma *SPA* a partir de um layout pré-estabelecido, conforme abaixo:
    - Realizar uma consulta de processos e visualizar o resultado
    - Visualizar os detalhes de processo
    - Inserir, editar e excluir um processo
- Siga os [protótipos](https://www.figma.com/proto/BTa9Vpz4S1XUscURxANvFH5Z/DESAFIO?node-id=19%3A70&scaling=scale-down&redirected=1) e o [guideline](https://www.figma.com/proto/BTa9Vpz4S1XUscURxANvFH5Z/DESAFIO?node-id=27%3A1&scaling=contain&redirected=1) disponibilizados ao máximo


### Informações sobre desenvolvimento
- Tempo Gasto 12 horas.
- O react-route foi utilizado para a criação de rotas indepentes para compartilhamento de uma busca ou processo.
- A Bilioteca @material-ui e @fontawsome4 foram adotadas por conter mais similaridades ao guideline e protótipo enviados, principalmente com os formulários, porém apenas os Inputs e Grid foram utilizados o restante dos Estilos foram criados do zero com SASS.


### Considerações
Algumas partes ainda podem ser melhoradas como:
- Criação de repositórios para as consultas de API ou a criação de um componente HOC com essas funcionalidades.


##  Scripts

No diretório /app, rode:

### `npm start`

Executa o app em modo desenolvimento.<br>
Abra [http://localhost:3000](http://localhost:3000) para ver o projeto.

### `npm run watch`

Para deenvolver e editar estilos SASS.

### `npm test`

Executa testes<br>

### `npm run build`

Builda o Projeto para produção minificando css e js anexos.
Projeto final será disponibilizado na pasta /public.

## Docker
Executar o backend desenvolvido pela Sofplan
(`docker run -p 3002:3002 gcpasquadproduto/softplan-desafio-frontend`)

Executar o react app
(`docker run -p 80:80 gabrielcabola/softplan-desafio-react:v1.0`)

Abrir (http://localhost)


## Estrutura de pastas

```
app/
  README.md
  node_modules/
  package.json  
  public/
    index.html
    favicon.ico
  styles/
    css/
      index.css
    scss/
      _....scss
      index.scss
  config/
  pages/
    App.js
    Error404.js
    Processo.js
    Search.js
    componentes/
      Button.js
      Label.js
      List.js
      Listitem.js
      Loading.js
      Searchbar.js
  src/
    App.test.js
    index.css
    index.js
    registerServiceWorkers.js
```


O projeto foi desenvovlifo com base nos recursos nativos do React

* `create-react-app`
* `react-scripts`


## Enviar Feedback

Envie seu feedback para  [gabriel@cabola.com.br](mailto:gabriel@cabola.com.br).


Muito Obrigado
