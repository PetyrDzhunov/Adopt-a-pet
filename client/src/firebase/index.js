import firebase from 'firebase/compat/app';
import "firebase/compat/storage";


const firebaseConfig = {
	apiKey: "AIzaSyAgunaHCgK-es_b0HmVTjGXYdeYHyxODeU",
	authDomain: "adopt-a-pet-ae0fb.firebaseapp.com",
	projectId: "adopt-a-pet-ae0fb",
	storageBucket: "adopt-a-pet-ae0fb.appspot.com",
	messagingSenderId: "1061977746819",
	appId: "1:1061977746819:web:99ace837bd4b1af26d5ab6"
};


firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
