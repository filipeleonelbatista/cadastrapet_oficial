<a href="https://github.com/filipeleonelbatista/cadastrapet_oficial/blob/master/README_EN.md" target="_blank">
  <img src="https://raw.githubusercontent.com/filipeleonelbatista/filipeleonelbatista/master/assets/usa_flag.png" width="28px" />
  Version in English
</a>
</br>
</br>

<img width="100%" src=".github/1.png">

# Indice

- [Sobre](#-sobre)
- [Tecnologias](#Tecnologias)
- [Instalação](#Instalação)

## 🔖&nbsp; Sobre

Aplicação para cadastrar registros medicos dos seus pets para conseguir apresentar tudo em um unico local para seu veterinário, com localização do seu pet.

[Link do projeto rodando na WEB](https://cadastrapet.vercel.app/)


## Objetivo

Tinha um Gatinho preto chamado NEGO e então me inspirei nele e nos desafios de manter os registros medicos do pet, com isso criei essa plataforma com várias funcionalidades
para poder atender melhor a parte de saúde dos pets.
 
---
## Tecnologias

Esse projeto foi desenvolvido com as seguintes principais tecnologias:

- [Typescript](https://www.typescriptlang.org/)
- [React JS](https://legacy.reactjs.org/docs/getting-started.html)
- [Firebase](https://firebase.google.com/?hl=pt)
- [Material UI](https://mui.com/material-ui/)

e mais...

---
## Instalação

O projeto roda com [Node.js](https://nodejs.org/) v20+.

Instruções para instalar as dependencias e inicie o projeto.

### Web

```sh
cd ./cadastrapet_oficial
npm i
npx run dev
```

## Base de dados no FIREBASE

É possivel que o site esteja fora do ar ou com algum problema então será necessário configurar o firebase
para poder rodar a aplicação.

Lembre de criar uma instancia no firebase e completar com as configurações do firebase nos arquivos `firebase-config.ts`
nas duas aplicações que fica em `src/services/firebase-config.ts`

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "<SUA CHAVE AQUI>",
  authDomain: "<SUA CHAVE AQUI>",
  projectId: "<SUA CHAVE AQUI>",
  storageBucket: "<SUA CHAVE AQUI>",
  messagingSenderId: "<SUA CHAVE AQUI>",
  appId: "<SUA CHAVE AQUI>",
  measurementId: "<SUA CHAVE AQUI>",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

<h3 align="center" >Vamos nos conectar 😉</h3>
<p align="center">
  <a href="https://www.linkedin.com/in/filipeleonelbatista/">
    <img alt="LinkedIn" width="22px" src="https://github.com/filipeleonelbatista/filipeleonelbatista/blob/master/assets/052-linkedin.svg" />
  </a>&ensp;
  <a href="mailto:filipe.x2016@gmail.com">
    <img alt="Email" width="22px" src="https://github.com/filipeleonelbatista/filipeleonelbatista/blob/master/assets/gmail.svg" />
  </a>&ensp;
  <a href="https://instagram.com/filipeleonelbatista">
    <img alt="Instagram" width="22px" src="https://github.com/filipeleonelbatista/filipeleonelbatista/blob/master/assets/044-instagram.svg" />
  </a>
</p>
<br />
<p align="center">
    Desenvolvido 💜 por Filipe Batista 
</p>
