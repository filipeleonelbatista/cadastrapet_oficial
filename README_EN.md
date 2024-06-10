<a href="https://github.com/filipeleonelbatista/delivery-generic/blob/master/readme.md" target="_blank">
  <img src="https://raw.githubusercontent.com/filipeleonelbatista/filipeleonelbatista/master/assets/brasil_bandeira.png" width="28px" />
  Version in Brasilian Portuguese
</a>
</br>
</br>

<img width="100%" src=".github/4.png">

# Index

- [About](#-about)
- [Technologies](#technologies)
- [Installation](#installation)

## 🔖&nbsp; About

Application to register your pet's medical records, allowing you to present everything in one place to your veterinarian, including your pet's location.

[Link to the project running on the WEB](https://cadastrapet.vercel.app/)

## Objective

I had a black kitten named NEGO, and he inspired me along with the challenges of keeping pet's medical records. With this in mind, I created this platform with various features to better address pet's health needs.

---

## Technologies

This project was developed with the following main technologies:

- [Typescript](https://www.typescriptlang.org/)
- [React JS](https://legacy.reactjs.org/docs/getting-started.html)
- [Firebase](https://firebase.google.com/?hl=en)
- [Material UI](https://mui.com/material-ui/)
  
and more...

---

## Installation

The project runs on [Node.js](https://nodejs.org/) v20+.

Instructions to install dependencies and start the project.

### Web

```sh
cd ./cadastrapet_oficial
npm i
npx run dev
```

## Firebase Database

It's possible that the website is down or experiencing some issues, so it will be necessary to configure Firebase to run the application.

Remember to create an instance in Firebase and complete the Firebase configurations in the `firebase-config.ts` files in both applications located at `src/services/firebase-config.ts`

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "<YOUR KEY HERE>",
  authDomain: "<YOUR KEY HERE>",
  projectId: "<YOUR KEY HERE>",
  storageBucket: "<YOUR KEY HERE>",
  messagingSenderId: "<YOUR KEY HERE>",
  appId: "<YOUR KEY HERE>",
  measurementId: "<YOUR KEY HERE>",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

<h3 align="center">Let's connect 😉</h3>
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
    Developed 💜 by Filipe Batista 
</p>
