import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './product.module.css'
function ProductCard({Product}) {
  const {title, image, id, rating, price}= Product
  // console.log(Product)
  return (
    <div className={classes.card_container}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div >
         <h4>{title}</h4>
         <div  className={classes.rating}>
             {/* rating */}
             <Rating value={rating.rate} precision={0.1}/>
             {/* count  */}
              <small>{rating.count}</small>

         </div>
         <div>
            {/* price  */}
            <CurrencyFormat amount={price}/>
         </div>
         <button  className={classes.button}>add to cart</button>

      </div>
    </div>
  )
}

export default ProductCard
