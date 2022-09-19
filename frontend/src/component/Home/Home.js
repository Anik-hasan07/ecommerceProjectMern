// import React, { Fragment, useEffect } from 'react';
// import MetaData from "../layout/MetaData";
// // import { CgMouse } from 'react-icons/fa';
// import {  getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";

// import "./Home.css";
// import Product from './ProductCard.js';
// import Loader from '../layout/Loader/Loader';
// import ProductCard from './ProductCard.js';






// const Home = () => {
//     const dispatch = useDispatch();
//     const { loading,products } = useSelector((state) => state.products);

//     useEffect(() => {
      
//         dispatch(getProduct());
//       }, [dispatch]);



//   return (
//     <Fragment>
//         {
//             loading ? (
//                 <Loader/>
//             ):(
//                 <Fragment>
//          <MetaData title="ECOMMERCE" />
//         <div className='banner'>
//             <p>Welcome to E-commerce</p>
//             <h1>Find Amazing Product</h1>
//             <a href='#container'>
//                 <button>
//                     Scroll
//                 </button>
//             </a>
            

//         </div>
//         <h2 className="homeHeading">Featured Products</h2>

//         <div className="container" id="container" >
//         {products &&
//               products.map((product) => 
//               <ProductCard product={product}/>
                
//               )}
//           </div>

//     </Fragment>
//             )
//         }

//     </Fragment>
//   )
// }

// export default Home


import React, { Fragment, useEffect } from "react";
import { CgMouse } from 'react-icons/fa';
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {
//   const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
    //   alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Ecommerce</p>
            <h1>Anik hasan Shop</h1>

            <a href="#container">
              <button>
                Click me 
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
