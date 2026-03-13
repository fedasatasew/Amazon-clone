import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './product.module.css'
import {Link} from 'react-router'
import { DataContext } from '../DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'

function ProductCard({Product, flex, renderdesc,renderAdd }) {
  const {rating, title, image, id,  price, description}= Product

  const truncatedTitle = title?.length > 60 ? title.substring(0, 60) + '...' : title;
 const [state, dispatch]= useContext(DataContext)
const addToCart=()=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item:{
      rating, title, image, id,  price, description
    }
  })
}



  return (
    <div className={`${classes.card_container} ${flex?classes.product_flexed : ''} `}>
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div >
        {
          renderdesc?(<p>{title}</p>):(<p>{truncatedTitle}</p>)
             
        }
        
         <br />
         {
          renderdesc && <div style={{maxWidth:'600px'}}>{description} </div>
         }
         {
          rating &&(
             <div  className={classes.rating}>
             {/* rating */}
             <Rating value={rating?.rate} precision={0.1}/>
             {/* count  */}
              <small>{rating?.count}</small>

         </div>
          )
         }

         <div>
            {/* price  */}
            <CurrencyFormat amount={price}/>
         </div>
         {
          renderAdd && <button  className={classes.button} onClick={addToCart} >
          add to cart</button>
         }
         

      </div>
    </div>
  )
}

export default ProductCard
