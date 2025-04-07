// signin.js
import { auth, firestore, signInWithEmailAndPassword, doc, setDoc, serverTimestamp } from './firebase.js';

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the default form submit behavior

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Login successful
            const user = userCredential.user;
            console.log("User logged in:", user.email);

            // Save user data in Firestore
            const userRef = doc(firestore, 'users', user.uid);
            await setDoc(userRef, {
                email: user.email,
                lastLogin: serverTimestamp()
            });

            // Redirect to stock market page
            window.location.href = 'stockmarket.html'; // Redirect to your stock page
        })
        .catch((error) => {
            console.error('Login error:', error.message);
            alert("Login failed: " + error.message);
        });
});
