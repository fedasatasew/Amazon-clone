import React from 'react'
import classes from './carousel.module.css'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {img} from './img/data'
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      
      >
        { img.map((imgItem)=>{
              return <img src={imgItem} alt='' />
         })}
      </Carousel>
      <div className={classes.carousel_fade}>

      </div>
    </div>
  )
}

export default CarouselEffect
