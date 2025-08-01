import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='DescriptionBox'>
         <div className="DescriptionBox-navigator">
          <div className="DescriptionBox-nav-box">Description</div>
          <div className="DescriptionBox-nav-box fade">Reviews</div>
         </div>
         <div className="DescriptionBox-description">
          <p>An e-commerce shopping website is an online platform that enables users to browse, search, and purchase products or services from a variety of categories, all from the convenience of their devices. These websites typically feature a wide range of items such as clothing, electronics, home goods, and more, each accompanied by detailed descriptions, images, prices, and customer reviews. Users can create personal accounts, manage their shopping carts, and proceed through a secure checkout process that supports multiple payment options including credit/debit cards, digital wallets, and UPI. </p>
          <p>
                 The website also provides functionalities like order tracking, return processing, and customer support to enhance the overall user experience. On the backend, administrators can manage product inventory, monitor sales, and analyze customer behavior through an admin panel. E-commerce websites are designed to streamline the buying and selling process, offering a fast, user-friendly, and accessible alternative to traditional brick-and-mortar stores.
          </p>
         </div>

    </div>
  )
}

export default DescriptionBox