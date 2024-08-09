# Porcentagem de Acesso à Internet no Brasil (2005-2011)

<div align="center">
  <a href="https://dayangomes.github.io/scrollytelling-dados-internet-ibge/">
    <img alt="Página Web Acesso à Internet" src="assets/gif/gif_pagina.gif" style="border-radius: 500px;">
  </a>
</div>

## Visão Geral

Este projeto visa visualizar a porcentagem de acesso à internet nos diferentes estados do Brasil entre 2005 e 2011, utilizando uma combinação de **Mapbox** e dados **GeoJSON**. O projeto oferece uma experiência interativa de narrativa guiada (scrollytelling) que permite aos usuários explorar a evolução do acesso à internet no Brasil ao longo dos anos.

## Funcionalidades do Projeto

- **Experiência de Scrollytelling**: O site foi projetado para guiar os usuários através de uma narrativa que explica as tendências e disparidades no acesso à internet entre os estados brasileiros ao longo dos anos.
  
- **Mapas Interativos**: Utiliza o Mapbox para mapas dinâmicos, com zoom, que destacam as bordas e as cores de preenchimento dos estados com base nas porcentagens de acesso à internet. 

- **Análise Temática**: Inclui mapas temáticos com paletas de cores personalizadas para diferenciar os estados com maior e menor acesso à internet.


## Instalação e Configuração

Para executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório**:
   ```sh
   git clone https://github.com/dayangomes/percentage-of-internet-access.git](https://github.com/dayangomes/scrollytelling-dados-internet-ibge.git)
   cd scrollytelling-dados-internet-ibge

2. **Abra o projeto**:

Abra o arquivo `index.html` no seu navegador preferido para visualizar o site localmente.

## GeoJSON Files (Brasil e Estados do brasil)

Caso você precise apenas dos arquivos GeoJSON do Brasil ou dos seus estados, eles foram utilizados no projeto e estão disponíveis para download [aqui](https://github.com/dayangomes/scrollytelling-dados-internet-ibge/tree/main/geojson).

## Hospedagem
O projeto está hospedado no GitHub Pages. Se quiser ver a versão ao vivo, [clique aqui.](https://dayangomes.github.io/scrollytelling-dados-internet-ibge/).

## Tecnologias Utilizadas

- **HTML5/CSS3:** Estruturação e estilização das páginas.
- **JavaScript:** Implementação da interatividade e manipulação dos mapas.
- **Mapbox GL JS:** Para a criação de mapas dinâmicos e interativos.
- **GeoJSON:** Formato de dados usado para representar os estados e suas fronteiras geográficas.
- **GitHub Pages:** Plataforma utilizada para a hospedagem do site.

## Como Contribuir

1. `Fork` o repositório
2. Crie uma branch para sua feature: 
    ```sh
    git checkout -b minha-nova-feature
3. Commit suas mudanças: 
    ```sh
    git commit -m 'Adiciona alguma feature'

4. Push para a branch: 
    ```sh
    git push origin minha-nova-feature
5. Crie um novo `Pull Request`

## Licença

Este projeto está licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/). Para mais informações, consulte o arquivo LICENSE.

## Agradecimentos
Agradeço ao professor  Alexandre Ribeiro Cajazeira Ramos da matéria de Tópicos Especiais em Computação 2024.1 pela orientação e suporte durante o desenvolvimento deste projeto e ao decorrer de todas a matéria.

## Documentação

MapBox [Documentação](https://docs.mapbox.com/help/getting-started/).
