import React from 'react'
import { category_info } from './category_info'
import classes from './Category.module.css'
import CategoryCard from './CategoryCard'

function Category() {
  return (
    <section className={classes.category_container}>
      {category_info.map((info, index) => (
        <CategoryCard key={index} info={info} />

      ))}
    </section>
  )
}

export default Category
