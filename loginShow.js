import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG7xpj4vW6hHOry-5_350fMbOohbucoaA",
  authDomain: "form-login-fd687.firebaseapp.com",
  projectId: "form-login-fd687",
  storageBucket: "form-login-fd687.firebasestorage.app",
  messagingSenderId: "250025418161",
  appId: "1:250025418161:web:7401140f416e46225ff190",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Enhanced DOM Selectors
const getElements = () => ({
  joinNowButtons: document.querySelectorAll("#joinNowButton"),
  joinNowLinks: document.querySelectorAll("#joinNowLink"),
  userInfoCards: document.querySelectorAll("#userInfoCard"),
  userFullNames: document.querySelectorAll("#userFullName"),
  userEmails: document.querySelectorAll("#userEmail"),
});

// Apply function to all matching elements
const applyToElements = (elements, callback) => {
  elements.forEach(callback);
};

// Handle user logout
const handleLogout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("loggedInUserId");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Update UI based on authentication state
const updateUIForAuthState = (isLoggedIn) => {
  const elements = getElements();

  if (isLoggedIn) {
    // Update all Join Now buttons to Logout
    applyToElements(elements.joinNowButtons, (button) => {
      button.innerText = "Logout";
      button.onclick = handleLogout;
    });

    // Remove href from all Join Now links
    applyToElements(elements.joinNowLinks, (link) => {
      link.removeAttribute("href");
    });
  } else {
    // Reset buttons to Join Now state
    applyToElements(elements.joinNowButtons, (button) => {
      button.innerText = "Join Now";
      button.onclick = null;
    });

    // Set login page link
    applyToElements(elements.joinNowLinks, (link) => {
      link.setAttribute("href", "login.html");
    });

    // Hide all user info cards
    applyToElements(elements.userInfoCards, (card) => {
      card.classList.add("hidden");
    });
  }
};

// Fetch and display user data
const displayUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const elements = getElements();

      // Update all instances of user full name
      applyToElements(elements.userFullNames, (element) => {
        element.innerText = `${userData.firstName} ${userData.lastName}`;
      });

      // Update all instances of user email
      applyToElements(elements.userEmails, (element) => {
        element.innerText = userData.email;
      });

      // Show all user info cards
      applyToElements(elements.userInfoCards, (card) => {
        card.classList.remove("hidden");
      });
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};

// Add touch event handling for mobile
const addTouchSupport = () => {
  const elements = getElements();

  applyToElements(elements.joinNowButtons, (button) => {
    button.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        this.click();
      },
      false
    );
  });
};

// Auth state observer
onAuthStateChanged(auth, (user) => {
  const isLoggedIn = !!user;
  updateUIForAuthState(isLoggedIn);

  if (isLoggedIn) {
    displayUserData(user.uid);
  }
});

// Initialize touch support
document.addEventListener("DOMContentLoaded", addTouchSupport);
