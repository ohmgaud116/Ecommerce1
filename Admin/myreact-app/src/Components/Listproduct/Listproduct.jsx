import React, { useState, useEffect } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

// ✅ Backend URL here
const BASE_URL = "https://ecommerce1-8j8k.onrender.com";

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/allproducts`);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`${BASE_URL}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      await fetchInfo(); // refresh list after removal
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => remove_product(product.id)}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt="remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
