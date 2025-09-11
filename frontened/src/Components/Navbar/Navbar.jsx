import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_down_icon from '../Assets/nav_dropdown.png'

const Navbar = () => {
  const [menu,setMenu] = useState("shop")
  const {getTotalCartItems} = useContext(ShopContext);

  const menuRef = useRef()

  const dropdown_toggle=(e)=>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open'); // .toggle is a javascript DOM  method   /** */

  }
  /*DOM stands for Document Object Model.
    It is a programming interface (API) that represents an HTML or XML document as a tree structure, where each element is an object (called a "node") that can be accessed and manipulated using JavaScript.*/



  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Vastra</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={drop_down_icon} alt="" />


      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}> <Link style={{textDecoration:"none"}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LogOut</button>:  <Link to='/login'><button>LogIn</button></Link>}
    
        <Link to='/cart'><img src={cart_icon} alt="" /> </Link>
        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>
      </div>
       
    </div>
  )
}

export default Navbar