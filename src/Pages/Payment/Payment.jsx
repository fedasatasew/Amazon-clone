import React, {useContext, useState} from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import classes from './payment.module.css'
import { DataContext } from '../../Component/DataProvider/DataProvider'
import ProductCard from '../../Component/Product/ProductCard'
import {axiosInstance} from '../../Api/axios.js'
import {useStripe, useElements,  CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Component/CurrencyFormat/CurrencyFormat'
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import {Type} from '../../Utility/action.type.js'

function Payment() {
  const [carderror, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
const [{user, basket}, dispatch]=useContext(DataContext)

  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
   },0)
    const total=basket.reduce((amount, item)=>{
     return item.price * item.amount+ amount
   },0)


   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();

   const handleError=(event)=>{
      event?.error?.message? setCardError(event.error.message): setCardError(null);
      
      console.log(event.error.message);
  
  }

  const paymentHandle = async (e) => {
  e.preventDefault();

  // if (!stripe || !elements) return; // ✅ important

  try {
    setProcessing(true);
    const response = await axiosInstance({
      method: "post",
      url: `/payments/create?total=${total * 100}`,
    });

    const clientSecret = response.data?.clientSecret;

      //2. Confirm the card payment with the client secret
    const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });


const userOrdersRef = collection(db, "users", user.uid, "orders");
    const orderDocRef = doc(userOrdersRef, paymentIntent.id);

    await setDoc(orderDocRef, {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });

    // empty basket 

    dispatch({type:Type.EMPTY_BASKET})

     setProcessing(false);
     navigate("/orders", { state: {msg: "Order placed successfully!"} });

  } catch (error) {
    console.error(error); // ❗ you were hiding errors
    setProcessing(false);
  }
};
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
                <form onSubmit={paymentHandle}>
                  {carderror && <small style={{color:"red"}}>{carderror}</small>}
                  <CardElement onChange={handleError}/>
                  {/* price  */}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{display:"flex", gap:"10px" }}>
                      <p> Total Order |  </p>  <CurrencyFormat amount={total} />

                      </span>
                    </div>
                    <button type="submit">
                      {
                        processing? (
                          <div style={{display:"flex", alignItems:"center", gap:"10px"}}> 
                            <ClipLoader color='gray' size={15} />
                            <p>Processing...</p>
                          </div>
                        ): "Pay Now"
                      }
                      
                      </button>
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
