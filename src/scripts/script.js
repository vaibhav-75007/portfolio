// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
require(['dotenv'])

// Your web app's Firebase configuration
// import firebaseConfig from '../dat.json' assert { type: 'json' };
// const dat = await fetch('../../src/dat.json');
// const firebaseConfig = await dat.json();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesRef = ref(database, "messages");

/* function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
} */


const submitForm = (e) => {
    e.preventDefault();

    // getting values from the form
    const name = getInputVal('name');
    const email = getInputVal('email');
    const message = getInputVal('message');

    // saving the message
    saveMessage(name, email, message)

    document.querySelector('.alert').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 2000);

    document.getElementById('contactForm').reset();
};

// function to get values instead of typing out that line every single time
const getInputVal = (id) => {
    return document.getElementById(id).value;
};

//function to save message to firebase
const saveMessage = (name, email, message) => {
    const newMessagesRef = push(messagesRef);
    set(newMessagesRef, {
        name,
        email,
        message
    })
};

document.getElementById('contactForm').addEventListener('submit', submitForm);
