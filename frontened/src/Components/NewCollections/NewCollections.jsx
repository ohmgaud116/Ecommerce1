import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

// ✅ Use your deployed backend URL
const BASE_URL = "https://ecommerce1-8j8k.onrender.com";

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/allproducts`);
        const data = await res.json();
        console.log("Fetched products:", data);

        // You can filter only "new collections" if needed, e.g. latest 8
        setNewCollections(data.slice(-8)); // last 8 products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.length > 0 ? (
          newCollections.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
