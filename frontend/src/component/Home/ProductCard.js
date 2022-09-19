// import Rating from '@mui/material/Rating';
import React from 'react'
import ReactStars from "react-rating-stars-component";

import { Link } from 'react-router-dom';




const ProductCard = ({product}) => {

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:product.ratings,
    isHalf:true,
};
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt=""/>
        <p>{product.name}</p>
        <div>
        {/* <Rating {...options} /> */}
        <ReactStars {...options}/>{" "}
        <span className="productCardSpan">
        {" "}
         
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`৳${product.price}`}</span>

    </Link>
  )
}

export default ProductCard
