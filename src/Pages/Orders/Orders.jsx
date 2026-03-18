import React,{useState, useEffect, useContext} from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import {db} from '../../Utility/firebase'
import { collection, doc, query, orderBy, onSnapshot } from "firebase/firestore";



import { DataContext } from '../../Component/DataProvider/DataProvider'
import classes from './Orders.module.css'
import ProductCard from '../../Component/Product/ProductCard';
import { padding } from '@mui/system';

function Orders() {
const [{user}, dispatch]= useContext(DataContext)
const [orders, setOrders] =useState([])
  useEffect(()=>{
    
    if (user) {
  const ordersRef = collection(db, "users", user.uid, "orders");

  const q = query(ordersRef, orderBy("created", "desc"));

  onSnapshot(q, (snapshot) => {
  
    setOrders(
      snapshot.docs.map((doc)=>({
         id:doc.id,
         data:doc.data(),

      }))
    )
  });
}else{
       setOrders([])
    }

  },[])
  return (
    <div>
      <LayOut>
        <section className={classes.container}>
          <div className={classes.orders_container}>
            <h2>Your Orders</h2>
            {
              orders?.length===0 && <div style={{padding: "20px"}}> You don't have orders yet.</div>
            }
            {/* ordered items  */}
            <div>
                {
                  orders?.map((eachOrder, i)=>{
                    return (
                      <div key={i} className={classes.order_container}>
                        <hr />
                        <p>Order ID : {eachOrder?.id}</p>
                        {
                          eachOrder?.data?.basket?.map((order)=>{

                          return  <ProductCard 
                                Product={order}
                                flex={true}
                                key={order.id} />
                                
                           
                          })
                        }
                      </div>
                    )
                  })
                }
            </div>
          </div>
        </section>
        
      </LayOut>
    </div>
  )
}

export default Orders
