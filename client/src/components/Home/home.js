import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import ProductCard from './ProductCard'
import Metadata from '../Layouts/Metadata'
import {useDispatch,useSelector} from "react-redux"
import { getProductsApi } from '../../slices/ProductSlice'

const Home = () => {
const dispatch = useDispatch()

const {data,isLoading} = useSelector((state)=>state.custom)
  useEffect(() => {
    dispatch(getProductsApi())
  }, [])
  
  if(isLoading){
    return <h1>Loading..........</h1>
  }
  return (
    <Fragment>
      <Metadata title="ECOMMERCE" />

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
{
  data.products && data.products.map((curPro)=>(
    <ProductCard key={curPro._id} product={curPro}/>
  ))
}
      </div>
    </Fragment>
  )
}

export default Home