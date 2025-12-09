import React, { useEffect, useState } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import {useParams} from 'react-router'
import ProductCard from '../../Component/Product/ProductCard'
import { productUrl } from '../../Api/endPoint'
import classes from '../../Component/Product/product.module.css'
import axios from 'axios'
function Result() {
    const [products, setPrducts]= useState([])
    const {categoryName} =useParams()

    useEffect(()=>{
             axios.get(`${productUrl}/products/category/${categoryName}`)
             .then((res)=>{
                 setPrducts(res.data)
             }).catch((err)=>{
                 console.log(err)
             })
    },[])

    console.log(products)
  return (
    <div>
      <LayOut>
        <section>
           <h1 style={{padding:"30px"}}> Results</h1>
           <h4 style={{padding : "10px"}}>Category / {categoryName}</h4>
           <hr />
           <div className={classes.product_container}>
              
      {products.map((singleproduct) => (
        <ProductCard Product={singleproduct} key={singleproduct.id} />
      ))}
            {/* <CategoryCard info={products}/> */}
           </div>
        </section>
        
      </LayOut>
    </div>
  )
}

export default Result
