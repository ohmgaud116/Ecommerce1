import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrumps from '../Components/Breadcrumps/Breadcrumps'
import Productdisplay from '../Components/ProductDisplay/Productdisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProduct from '../Components/RelatedProducts/RelatedProduct'



const Product = () => {
  const {all_product}=useContext(ShopContext)
  const {productId} = useParams();
  const product =all_product.find((e)=> e.id === Number(productId))
  return (
    <div>
      <Breadcrumps product={product}/>
      <Productdisplay product={product} />
      <DescriptionBox />
      <RelatedProduct />
    </div>
  )
}

export default Product