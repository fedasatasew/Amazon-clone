import React, { useEffect, useState } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import {useParams} from 'react-router'
import ProductCard from '../../Component/Product/ProductCard'
import { productUrl } from '../../Api/endPoint'
import classes from '../../Component/Product/product.module.css'
import axios from 'axios'
import Loader from '../../Component/Loader/Loader'
function Result() {
    const [products, setPrducts]= useState([])
    const [isLoading, setLoading]= useState(false)
    const [networkError, setnatworkError] =useState(false)
    const {categoryName} =useParams()

    useEffect(()=>{
      setLoading(true)
             axios.get(`${productUrl}/products/category/${categoryName}`)
             .then((res)=>{
                 setPrducts(res.data)
                 setLoading(false)
             }).catch((err)=>{
                 console.log(err)
                 setLoading(false)
                 setnatworkError(true)
             })
    },[])

  return (
    <div>
      <LayOut>
         {
          isLoading? (<Loader/>):  (
            
             <section>
              {networkError?(<p>helloooo</p>):(
<div>
                  <h1 style={{padding:"30px"}}> Results</h1>
                  <h4 style={{padding : "10px"}}>Category / {categoryName}</h4>
                  <hr />
                  <div className={classes.product_container}>
                     
                    {products.map((singleproduct) => (
                      <ProductCard Product={singleproduct} key={singleproduct.id}
                      renderAdd={true}
                       />
                    ))}
                    </div>
                </div>
              )}
                    
              </section>
          )
         }
     
        
      </LayOut>
    </div>
  )
}

export default Result
