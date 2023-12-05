// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ShoppingCart from './ShoppingCart';
import UserProfile from './UserProfile'; // Create UserProfile component for authenticated views

// Initialize Firebase with your project configuration
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // Track the authenticated user

  const products = [
    // ... your mock product data
  ];

  // Function to handle when a product is clicked in the ProductList
  const handleProductClick = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setSelectedProduct(selectedProduct);
  };

  // Function to handle adding a product to the shopping cart
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  // Function to handle adjusting the quantity of a product in the shopping cart
  const handleAdjustQuantity = (productId, action) => {
    // Logic to adjust the quantity of a product in the cart; implement increase or decrease based on the 'action'
    // For simplicity, let's say we'll only increase the quantity for now
  };

  // Function to handle removing a product from the shopping cart
  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Function to handle user registration
  const handleRegistration = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Registration successful:', user);
      setUser(user); // Set the user in the state after registration
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  // Function to handle user login
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful:', user);
      setUser(user); // Set the user in the state after login
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logout successful');
      setUser(null); // Clear the user from the state after logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          {/* Link to the ProductList page */}
          <Link to="/">Home</Link>
          {/* Link to the ShoppingCart page */}
          <Link to="/cart">Cart</Link>
          {/* Conditional rendering based on user authentication */}
          {user ? (
            <div>
              {/* Link to the UserProfile page */}
              <Link to="/profile">Profile</Link>
              {/* Button to trigger user logout */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // If not authenticated, show links to login and registration pages
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>

        {/* Implementing React Router's Routes component */}
        <Routes>
          {/* Route for the ProductList page */}
          <Route path="/" element={<ProductList products={products} onProductClick={handleProductClick} />} />
          {/* Route for the ProductDetail page */}
          <Route path="/product/:id" element={<ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} />} />
          {/* Route for the ShoppingCart page */}
          <Route path="/cart" element={<ShoppingCart cartItems={cartItems} onAdjustQuantity={handleAdjustQuantity} onRemoveItem={handleRemoveItem} />} />
          {/* Route for the UserProfile page */}
          <Route path="/profile" element={<UserProfile user={user} />} />
          {/* Route for the Login page */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Route for the Registration page */}
          <Route path="/register" element={<Registration onRegister={handleRegistration} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Placeholder components for Login and Registration pages
const Login = ({ onLogin }) => {
  // Implement your login form here
  return <div>Login Form</div>;
};

const Registration = ({ onRegister }) => {
  // Implement your registration form here
  return <div>Registration Form</div>;
};

export default App;
