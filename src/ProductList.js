// ProductList.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const ProductList = ({ products, onProductClick }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {/* Map through products and render a list item for each */}
        {products.map((product) => (
          <li key={product.id}>
            {/* Use Link to navigate to the ProductDetail page with the corresponding product ID */}
            <Link to={`/product/${product.id}`}>
              {/* Display product information: image, name, and price */}
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
