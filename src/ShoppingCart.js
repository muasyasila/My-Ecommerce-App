// ShoppingCart.js

import React from 'react';

// ShoppingCart component receives an array of items in the cart and callbacks for quantity adjustment and removal
const ShoppingCart = ({ cartItems, onAdjustQuantity, onRemoveItem }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {/* Map through cart items and render a list item for each */}
        {cartItems.map((item) => (
          <li key={item.id}>
            {/* Display cart item information: image, name, price, quantity */}
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            {/* Buttons for adjusting quantity and removing the item from the cart */}
            <button onClick={() => onAdjustQuantity(item.id, 'increase')}>+</button>
            <button onClick={() => onAdjustQuantity(item.id, 'decrease')}>-</button>
            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Display the total price of items in the cart */}
      <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
    </div>
  );
};

export default ShoppingCart;
