import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

// ✅ Backend URL defined here
const BASE_URL = "https://ecommerce1-8j8k.onrender.com";

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: ''
  });

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  // Handle image selection
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image and then send product data
  const add_Product = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('product', image);

    try {
      // Upload image
      const uploadRes = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed.");
        return;
      }

      const productToSend = {
        ...productDetails,
        image: uploadData.image_url,
        new_price: Number(productDetails.new_price),
        old_price: Number(productDetails.old_price)
      };

      console.log("Sending product to backend:", productToSend);

      // Add product
      const res = await fetch(`${BASE_URL}/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(productToSend)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Product added successfully!");
        setProductDetails({
          name: '',
          image: '',
          category: 'women',
          new_price: '',
          old_price: ''
        });
        setImage(null);
      } else {
        alert("❌ Failed to add product.");
      }

    } catch (err) {
      console.error("Error during product add:", err);
      alert("Something went wrong while adding the product.");
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Enter product name"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Original Price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Discounted Price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="thumbnail"
            className='thunbnailimg'
          />
        </label>
        <input
          type="file"
          id="file-input"
          name="image"
          hidden
          onChange={imageHandler}
        />
      </div>

      <button onClick={add_Product} className="add-product-btn">Add</button>
    </div>
  );
};

export default Addproduct;
