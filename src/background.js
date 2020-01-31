import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCnNQquV-hgC_5L0xxZ805ShdVWvKoCerU",
  authDomain: "unblock-menow.firebaseapp.com",
  databaseURL: "https://unblock-menow.firebaseio.com",
  projectId: "unblock-menow",
  storageBucket: "unblock-menow.appspot.com",
  messagingSenderId: "193158147857",
  appId: "1:193158147857:web:cc15d56e32c8f2c98426b0",
  measurementId: "G-Y0MJNPLW4L"
});

const firestore = firebase.firestore();
console.log(firestore);

let data = 0;

firestore.doc('test/test').onSnapshot(snapshot => {
  data = snapshot.data();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
      console.log('sent');
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.action) {
    case 'init':
      response(data);
      break;
    default:
      response('unknown request');
      break;
  }
});
