# Digital Store

## Projeto de desenvolvimento web com React

A Digital Store é um projeto de loja virtual desenvolvido utilizando React. A ideia é criar um site onde os usuários possam navegar pelos produtos, visualizar categorias, realizar cadastro e login e consultar seus pedidos.

O projeto faz parte de uma atividade prática de desenvolvimento Front-end, na qual estou colocando em prática os conhecimentos adquiridos durante os estudos de programação.

# 1. Tecnologias utilizadas

Durante o desenvolvimento, estou utilizando as seguintes tecnologias:

- **React:** para desenvolver as páginas e os componentes da aplicação.
- **JavaScript:** para implementar a lógica e as funcionalidades.
- **Vite:** para configurar e executar o projeto.
- **CSS3:** para estilizar as páginas e organizar os elementos visuais.
- **React Router DOM:** para controlar a navegação entre as páginas.
- **Lucide React:** para utilizar ícones na interface.

# 2. Funcionalidades desenvolvidas

Até o momento, foram desenvolvidas as seguintes partes do projeto:

### Página inicial

- Cabeçalho com logotipo, campo de pesquisa e menu de navegação.
- Carrossel de banners com controles para trocar as imagens.
- Área de coleções em destaque.
- Seção de produtos em alta.
- Banner promocional.
- Rodapé com informações e links.

### Página de produtos

- Exibição dos produtos em cartões.
- Apresentação das imagens, nomes e preços.
- Organização dos produtos em uma grade.
- Filtros e opções de ordenação.

### Página de categorias

- Página própria para apresentar as categorias da loja.
- Organização dos tipos de produtos.
- Opções para selecionar categorias.

### Cadastro

- Formulário com nome completo, e-mail e senha.
- Campo para confirmar a senha.
- Opção para mostrar ou ocultar as senhas.
- Aceitação dos termos de uso.
- Validação das informações preenchidas.
- Mensagem de confirmação após o cadastro.

### Login

- Formulário de acesso com e-mail e senha.
- Opção para mostrar ou ocultar a senha.
- Simulação de login no próprio Front-end.
- Armazenamento dos dados básicos do usuário no Local Storage.
- Mensagem de confirmação após o acesso.

### Minha conta e meus pedidos

- Página para visualizar os pedidos.
- Identificação e data de cada pedido.
- Apresentação dos produtos e valores.
- Identificação da situação de cada pedido.
- Filtros por status.
- Área para consultar os detalhes de cada pedido.

## 3. Organização das pastas

O projeto foi organizado separando as páginas, os componentes, os dados dos produtos e os arquivos de estilo.

A estrutura atual está organizada da seguinte forma:

```text
src/
├── components/
│   ├── BuyBox/
│   ├── FilterGroup/
│   ├── Footer/
│   ├── Header/
│   ├── Logo/
│   ├── ProductCard/
│   ├── ProductGallery/
│   ├── ProductListing/
│   ├── ProductOptions/
│   └── Section/
│
├── data/
│   └── products.js
│
├── pages/
│   ├── CategoriesPage/
│   ├── HomePage/
│   ├── LoginPage/
│   ├── MyPage/
│   ├── ProductListingPage/
│   └── RegisterPage/
│
├── styles/
├── App.jsx
└── index.css
```

Essa organização facilita a manutenção do código e permite que os componentes sejam utilizados em diferentes partes do site.

## 4. Como executar o projeto

Para executar a aplicação em outro computador, é necessário ter o Node.js instalado.

Depois de baixar o projeto, basta abrir o terminal na pasta principal e executar os comandos abaixo.

**Instalar as dependências:**

```bash
npm install
```

**Iniciar o servidor de desenvolvimento:**

```bash
npm run dev
```

Após iniciar, o terminal apresentará o endereço para acessar a aplicação. Normalmente, será:

```text
http://localhost:5173
```

## 5. Situação atual do projeto

Nesta etapa, algumas funcionalidades ainda estão sendo desenvolvidas e utilizam dados de exemplo.

- Os produtos são carregados a partir de um arquivo JavaScript local.
- O cadastro e o login funcionam como simulações no Front-end, sem integração com banco de dados ou sistema real de autenticação.
- A página de pedidos utiliza informações fictícias para demonstrar como os pedidos serão apresentados.
- O carrinho de compras ainda não foi implementado.

## 6. Próximas etapas

Ainda pretendo realizar algumas melhorias antes de finalizar o projeto:

- Desenvolver a página individual de cada produto.
- Conferir o visual das páginas com base no protótipo disponibilizado no Figma.
- Ajustar a responsividade para computadores, tablets e celulares.
- Desenvolver o carrinho de compras.
- Testar os botões, links e demais funcionalidades.
- Atualizar esta documentação com as alterações realizadas.

## 7. Considerações finais

O desenvolvimento da Digital Store está sendo uma oportunidade de colocar em prática os conhecimentos de React, JavaScript e CSS.

Durante a construção do projeto, trabalhei na organização das pastas, criação de componentes, desenvolvimento das páginas e implementação da navegação entre elas.

O objetivo é concluir uma loja virtual funcional, com uma interface organizada e que atenda aos requisitos propostos na atividade.

**Projeto Digital Store.**
