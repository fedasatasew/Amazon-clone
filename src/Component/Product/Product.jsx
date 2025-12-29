import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './product.module.css'
import Loader from '../Loader/Loader'

function Product() {
  const [products, setProducts] = useState([])
  const [isLoading, setLoading]= useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://fakestoreapi.com/products')
        setProducts(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchProducts()   // run the function
  }, [])

  return (

  <div>

    {isLoading? (<Loader/>): (
            <section className={classes.product_container}>
               {products.map((singleproduct) => (
                 <ProductCard Product={singleproduct}
                  key={singleproduct.id}
                   renderAdd={true} />
              ))}
          </section>
      )}

 </div>
  )
}

export default Product
