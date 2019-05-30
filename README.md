# Signage.js

### Introdução

**Signage.js** é uma ferramenta de Digital Signage web criada para substituir aplicações Digital Signage como Rise Vision em usos simples.

A documentação detalhada se encontra no arquivo **doc.pdf** localizado em **/doc/doc.pdf**

### Execução com Docker - Ubuntu 16.04

**Signage.js** utiliza um container com imagem `node:10-alpine` como descrito no arquivo **docker-compose.yml** na pasta root da aplicação. O container utiliza as versões: 
* `Docker versão 18.06.1-ce`
* `Docker Compose versão 1.22.0`

Para exibição utilizamos:

* `Google Chrome Version 74.0.3729.157 (Official Build) (64-bit)`

A aplicação pode não funcionar corretamente em outras versões.

### Uso
Abra o terminal no diretório **root** de **Signage.js** e execute os comandos
* `sudo docker-compose up -d`

Após a criação do container, **Signage.js** estará rodando em **localhost:3000**.

