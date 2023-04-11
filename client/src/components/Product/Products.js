import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../Home/ProductCard'
import { useDispatch, useSelector } from "react-redux"
import { getFilterProductsApi } from '../../slices/ProductSlice'
import "./Products.css"
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";
// import MetaData from "../layout/MetaData";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


const categories = [
    "electronics",
    "clothes",
    "vehicle",
    "grocery",
    "home"



]

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 500000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const { filterProductsdata, isLoading } = useSelector((state) => state.custom)
    const { resultPerPage, productsCount } = filterProductsdata

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        dispatch(getFilterProductsApi({keyword, currentPage, price, category,ratings }))
    }, [keyword, currentPage, price, category,ratings])


    return (
        isLoading ? (
            <h1>Loading..........</h1>
        ) :
            (
                <Fragment>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {filterProductsdata.products && filterProductsdata.products.map((curPro) => (
                            <ProductCard key={curPro._id} product={curPro} />
                        ))
                        }
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={500000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )

    )
}

export default Products