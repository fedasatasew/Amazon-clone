import React from 'react'
import { IoMdMenu } from "react-icons/io";
import classes from './Header.module.css'
export default function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
            <IoMdMenu size={25}/>
             
            <p>All</p>
        </li>
        <li>Todays Deals</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}
