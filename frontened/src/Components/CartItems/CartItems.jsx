import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removefromCart } = useContext(ShopContext)

  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <div className='cartitems-format'>
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
        </div>
      </div>
      <hr />
      {all_product
          .filter((e) => cartItems[e.id] > 0)
          .map((e) => {
            const quantity = cartItems[e.id];
            return (
              <div className="cartitems-format cartitem-format-main" key={e.id}>
                <img src={e.image} alt={e.name} className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cart-item-quantity">{quantity}</button>
                <p>${e.new_price * quantity}</p>
                <img 
                  src={remove_icon}
                  onClick={() => removefromCart(e.id)}
                  alt="remove"
                  className="remove-icon"
                />
      </div>
    );
  })}
  <div className="cartitemsdown">
    <div className="cartitemstotal"><h1>Cart Totals</h1>
    <div><div className="cartitemstotalitems">
            <p>SubTotal</p>
            <p>${getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cartitemstotalitems">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <hr />
      <div className="cartitemstotalitems">
        <h3>Total</h3>
        <h3>${getTotalCartAmount()}</h3>
      </div>
      </div>
      <button>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cartitems-promocode">
        <p>If you have a promo code, Enter it here</p>
        <div className="carditems-promobox">
          <input type="text" placeholder='promo code' />
          <button>  Submit </button>
        </div>
      </div>
  </div>


    </div>
  )
}

export default CartItems
