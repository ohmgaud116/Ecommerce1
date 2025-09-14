import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

// ✅ Backend URL defined here
const BASE_URL = "https://ecommerce1-8j8k.onrender.com";

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ✅ Fetch products from deployed backend
  useEffect(() => {
    fetch(`${BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removefromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  // Log updated cart
  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  // ✅ Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (iteminfo) {
          totalAmount += iteminfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Get total cart items (for navbar/cart icon)
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removefromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
