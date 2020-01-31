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

let data = 0;

firestore.collection('tasks')
  .orderBy('createdDate', 'desc')
  .onSnapshot(snapshot => {
    console.log(snapshot.docs);
    data = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, data);
    });
  });

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.action) {
    case 'init':
      response(data);
      break;
    case 'submit':
      firestore.collection('tasks').add(msg.data);
      response('ok');
      break;
    case 'resolve':
      firestore.doc(`tasks/${msg.data.task}`).update({
        [`receivers.${msg.data.user}`]: true
      });
      response('ok');
      break;
    default:
      response('unknown request');
      break;
  }
});
