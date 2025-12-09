import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './product.module.css'

function Product() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()   // run the function
  }, [])

  return (
    <section className={classes.product_container}>
      {products.map((singleproduct) => (
        <ProductCard Product={singleproduct} key={singleproduct.id} />
      ))}
    </section>
  )
}

export default Product
