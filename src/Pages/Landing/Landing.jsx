import React from 'react'
import LayOut from '../../Component/LayOut/LayOut'
import Category from '../../Component/Category/Category'
import Product from '../../Component/Product/Product'
import CarouselEffect from '../../Component/Carousel/CarouselEffect'

function Landing() {
  return (
    <div>
      <LayOut>
        <CarouselEffect/>
        <Category/>
        <Product/>
      </LayOut>
    </div>
  )
}

export default Landing
