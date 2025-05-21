// Import auth from firebase.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Get the login form
const loginForm = document.getElementById('loginForm');

// Add event listener for form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get user inputs
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    // Attempt to sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // User signed in successfully
    const user = userCredential.user;
    console.log("Login successful!", user);
    
    // Create success message
    const successMessage = document.createElement('p');
    successMessage.textContent = "Login successful! Redirecting...";
    successMessage.style.color = "green";
    loginForm.appendChild(successMessage);
    
    // Redirect to dashboard or home page after successful login
    // You can replace this with your own redirect logic
    setTimeout(() => {
      window.location.href = 'dashboard.html'; // Replace with your dashboard page
    }, 2000);
    
  } catch (error) {
    // Handle errors
    console.error("Login error:", error.code, error.message);
    
    // Display error message to user
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `Login failed: ${error.message}`;
    errorMessage.style.color = "red";
    loginForm.appendChild(errorMessage);
  }
});