import React, {useContext, useState} from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import classes from './payment.module.css'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'

import {useStripe, useElements,  CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'

function Payment() {
  const [carderror, setCardError] = useState(null);
const [{basket}]=useContext(DataContext)

  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
   },0)
    const total=basket.reduce((amount, item)=>{
     return item.price * item.amount+ amount
   },0)


   const stripe = useStripe();
   const elements = useElements();

   const handleError=(event)=>{
      event?.error?.message? setCardError(event.error.message): setCardError(null);
      
      console.log(event.error.message);
  
  }
  return (
    <div>
      <LayOut>
        {/* header  */}
        <div className={classes.payment_header}>
          Checkout  ({totalItem}) items
        </div>
        {/* payment method  */}

        <section className={classes.payment}>
          {/* address  */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>feda@gmail.com</div>
              <div>2026 React Lane</div>
              <div>Ethiopia, Arjo</div>
            </div>
          </div>
          <hr />
          {/* product details  */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {
                basket?.map(item=><ProductCard key={item.id} Product={item} flex={true} />
            
                )
              }
            </div>
 
          </div>
          <hr />

          {/* card form  */}
          <div className={classes.flex}>
            <h3>Payment Method</h3>
            <div  className={classes.payment_card_container}>
              <div className={classes.payment_details}>
                <form action="">
                  {carderror && <small style={{color:"red"}}>{carderror}</small>}
                  <CardElement onChange={handleError}/>
                  {/* price  */}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{display:"flex", gap:"10px" }}>
                      <p> Total Order |  </p>  <CurrencyFormat amount={total} />

                      </span>
                    </div>
                    <button>Pay Now</button>
                  </div>

                </form>
              </div>
            </div>
           
          </div>
        </section>
      </LayOut>
    </div>
  )
}

export default Payment
