import React from 'react'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";


import amazon_log from '../../assets/image/icons/amazon_logo.png'
import american_flag from '../../assets/image/img/american_flag.jpg'
import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
export default function Header() {
  return (
   
      <>
        <section className={classes.header_container}>
            {/* logo  */}
            <div className={classes.logo_container}>
               
               <a href=" ">
                   <img src={amazon_log} alt="Amazon log" />
               </a>
               {/* delivery  */}
               <div className={classes.delivery}>
                    <span>
                      {/* icon  */}
                       <SlLocationPin/>
                    </span>
                    <div>
                      <p>Delivered to</p>
                      <span>Ethiopia</span>
                    </div>
               </div>

            </div>

            {/* search  */}
            <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" placeholder='search product'/> <BsSearch size={25}/>
                {/* icon  */}
            </div>

            <div className={classes.order_container}>
                <a href="#" className={classes.language}>
                    <img src={american_flag} alt="" />
                    <select name="" id="">
                        <option value="">EN</option>
                    </select>
                </a>
                <a href="">
                    <div>
                        <p>Sign In</p>
                        <span>Account & Lists</span>
                    </div>
                </a>
                <a href="">
                    <p>returns</p>
                    <span>& Orders</span>
                </a>
                {/* icon  cart */}
                <a href="" className={classes.cart}>
                    <BiCart size={35}/>
                    <span>0</span>
                </a>
            </div>
        </section>
        <LowerHeader />
      </>
    
  )
}
