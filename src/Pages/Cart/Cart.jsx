import React, { useContext } from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from './cart.module.css'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

function Cart() {
  const [{basket,user}, dispatch]= useContext(DataContext);
   const total=basket.reduce((amount, item)=>{
     return item.price * item.amount+ amount
   },0)
   
   const increment =(item)=>{
       dispatch({
        type:Type.ADD_TO_BASKET,
        item 
       })
   }
   const decrement=(id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
   }
  return (
    
      <LayOut>
        
        <section className={classes.container}>
          <div className={classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your shoping basket</h3>
            <hr />
             {
              
              basket?.length==0?(<p>Opps! No item in your cart</p>):(
                basket?.map((item, i)=>{
                  return (
                  <section key={i} className={classes.cart_product}>
                   <ProductCard 
                    
                     Product={item}
                     renderdesc={true}
                     flex={true}
                     renderAdd={false}
                     cart={true}

                  />
                  <div className={classes.btn_product}>
                    <button onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                    <span>{item.amount}</span>
                    <button onClick={()=>decrement(item.id)}><IoIosArrowDown  size={20}/></button>
                  </div>
                  </section>
                )
                })
  
              )
             }
          </div>
          {basket?.length !==0&& (
                  <div  className={classes.subtotal}>
                      <div>
                         <p>Subtotal ({basket.length}) items </p>
                         <CurrencyFormat amount= {total}/>
                      </div>
                      <span>
                        <input type="checkbox" />
                        <small>This order contain a gift</small>
                      </span>
                      <Link to='/payment'>Continue to checkout</Link>
                  </div>
          )}
                    
                    

        </section>
      </LayOut> 

  )
}

export default Cart
