import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
    <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /> </Link>{/*`props` is used to pass dynamic data (like image URLs) from a parent component to a child component in React.*/}
       <p>{props.name} </p>
       <div className="item-prices">

        <div className="item-price-new">
        ${props.new_price}

        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
       </div>

    </div>
  )
}

export default Item
/* This page is used for passing the props of popular.jsx file where we fetch api from assets folder that is {data.js file} */