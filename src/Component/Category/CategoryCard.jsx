import React from 'react'
import {Link} from 'react-router'
import classes from './Category.module.css'
function CategoryCard({ info }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${info.name}`}>
        <span>
          <h2>{info.title}</h2>
        </span>
        <img src={info.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  )
}


export default CategoryCard
