import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyABffknmOnLdf5ArB6zli338DT0MU-ZD3A",
    authDomain: "whack-a-mole-homework.firebaseapp.com",
    databaseURL: "https://whack-a-mole-homework.firebaseio.com",
    projectId: "whack-a-mole-homework",
    storageBucket: "whack-a-mole-homework.appspot.com",
    messagingSenderId: "286048375967"
};

firebase.initializeApp(config);
export const database = firebase.database();
