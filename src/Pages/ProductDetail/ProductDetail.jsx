import React, { useEffect, useState } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import {useParams} from 'react-router'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Component/Product/ProductCard'
import Loader from '../../Component/Loader/Loader'

function ProductDetail() {
const [products, setProduct]= useState({})
const [isLoading, setLoading]= useState(false)

  const {productId}= useParams()

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${productUrl}/products/${productId}`)
        setProduct(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchProducts()   // run the function
  }, [productId])

  return (



    <div>
      <LayOut>
      {isLoading? (<Loader/>): (
        <ProductCard Product={products} flex={true} renderdesc={true}renderAdd={true}/>
      )}
           
        
      </LayOut>
    </div>
  )
}

export default ProductDetail
