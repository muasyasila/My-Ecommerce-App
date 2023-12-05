// ProductDetail.js

import React from 'react';

// ProductDetail component receives a single product and a callback for adding to the cart
const ProductDetail = ({ product, onAddToCart }) => {
  // If there is no selected product, display a message
  if (!product) {
    return <p>Select a product to view details.</p>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      {/* Display detailed product information: image, name, price */}
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>${product.price}</p>
      {/* Button to add the product to the cart */}
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
