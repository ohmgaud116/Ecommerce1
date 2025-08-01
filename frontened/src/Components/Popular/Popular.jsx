import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Items/Item'
const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {/*Map function is used to find fetch eacg item from the Api and display on the screen , The props are used in Item.jsx file */}
        {data_product.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
{/*This file fetch the API from data.js present in Assets folder  */}