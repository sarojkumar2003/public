// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG7xpj4vW6hHOry-5_350fMbOohbucoaA",
  authDomain: "form-login-fd687.firebaseapp.com",
  projectId: "form-login-fd687",
  storageBucket: "form-login-fd687.appspot.com",
  messagingSenderId: "250025418161",
  appId: "1:250025418161:web:7401140f416e46225ff190",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Select all buttons with the class "enroll-button"
const enrollButtons = document.querySelectorAll(".enroll-button");

// Add event listeners to each button
enrollButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    // Retrieve course details from the button's data attributes
    const courseId = button.getAttribute("data-course-id");
    const courseName = button.getAttribute("data-course-name");
    const courseAmount = parseInt(
      button.getAttribute("data-course-amount"),
      10
    );

    // Call the enroll handler with these values
    enrollHandler(courseId, courseName, courseAmount);
  });
});

// Enroll handler function
async function enrollHandler(courseId, courseName, courseAmount) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "login.html"; // Redirect to login if user is not logged in
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // Check if the user has already purchased the course
      if (
        userDoc.exists() &&
        userDoc.data().courses &&
        userDoc.data().courses[courseId]
      ) {
        alert("You have already purchased this course!");
        window.location.href = "dashboard.html"; // Redirect to dashboard if already enrolled
        return;
      }

      // Razorpay payment options
      const options = {
        key: "rzp_test_hzlvTbqdlW8ZUn",
        amount: courseAmount, // Amount in paise
        currency: "INR",
        name: courseName,
        description: "Complete your enrollment",
        handler: async function (response) {
          try {
            // Update Firestore with payment info and course details
            await updateDoc(userRef, {
              [`courses.${courseId}`]: {
                courseName: courseName,
                paymentId: response.razorpay_payment_id,
                purchaseDate: new Date().toISOString(),
                courseAmount: courseAmount, // Store the course amount (in paise)
              },
            });

            alert("Payment successful! Redirecting to dashboard...");
            window.location.href = "dashboard.html"; // Redirect to dashboard after success
          } catch (error) {
            console.error("Error updating Firestore:", error);
            alert("Failed to update enrollment information. Please try again.");
          }
        },
        prefill: {
          name: user.displayName || "Student",
          email: user.email || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during enrollment:", error);
      alert("An error occurred. Please try again.");
    }
  });
}
