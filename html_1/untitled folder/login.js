// Firebase Configuration
const firebaseConfig = {
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
      };
};

// Performance Timing Utility
const PerformanceTracker = {
    startTime: {},
    
    start(label) {
        this.startTime[label] = performance.now();
    },
    
    end(label) {
        if (!this.startTime[label]) {
            console.warn(`No start time found for ${label}`);
            return;
        }
        
        const endTime = performance.now();
        const duration = endTime - this.startTime[label];
        
        console.group(`🕒 Performance Metrics: ${label}`);
        console.log(`Duration: ${duration.toFixed(2)} ms`);
        console.groupEnd();
        
        return duration;
    }
};

// Timed Login Function
async function timedLogin(email, password) {
    PerformanceTracker.start('loginOperation');
    
    try {
        const startAuth = performance.now();
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const authTime = performance.now() - startAuth;
        
        console.group('📊 Login Performance Breakdown');
        console.log('Total Authentication Time:', authTime.toFixed(2), 'ms');
        console.log('User UID:', userCredential.user.uid);
        console.groupEnd();
        
        return PerformanceTracker.end('loginOperation');
    } catch (error) {
        PerformanceTracker.end('loginOperation');
        throw error;
    }
}

// Timed Google Login Function
async function timedGoogleLogin() {
    PerformanceTracker.start('googleLoginOperation');
    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
        const startAuth = performance.now();
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const authTime = performance.now() - startAuth;
        
        console.group('📊 Google Login Performance Breakdown');
        console.log('Total Authentication Time:', authTime.toFixed(2), 'ms');
        console.log('User UID:', userCredential.user.uid);
        console.log('Provider:', userCredential.credential.providerId);
        console.groupEnd();
        
        return PerformanceTracker.end('googleLoginOperation');
    } catch (error) {
        PerformanceTracker.end('googleLoginOperation');
        throw error;
    }
}

// Authentication State Monitoring with Timing
function monitorAuthState() {
    PerformanceTracker.start('authStateMonitoring');
    
    firebase.auth().onAuthStateChanged((user) => {
        const monitorTime = PerformanceTracker.end('authStateMonitoring');
        
        if (user) {
            console.group('🔐 User Authentication State');
            console.log('User Signed In:', user.email);
            console.log('Authentication State Detection Time:', monitorTime.toFixed(2), 'ms');
            console.groupEnd();
        } else {
            console.log('No user signed in');
        }
    }, (error) => {
        console.error('Auth State Monitoring Error:', error);
    });
}

// Comprehensive Performance Profiler
async function runAuthenticationBenchmark(email, password) {
    console.group('🚀 Authentication Performance Benchmark');
    
    try {
        // Email Login Performance
        await timedLogin(email, password);
        
        // Google Login Performance
        await timedGoogleLogin();
        
        // Auth State Monitoring
        monitorAuthState();
    } catch (error) {
        console.error('Benchmark Failed:', error);
    }
    
    console.groupEnd();
}

// Usage Example
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await runAuthenticationBenchmark(email, password);
    } catch (error) {
        console.error('Login Error:', error);
    }
});