import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../Home/ProductCard'
import { useDispatch, useSelector } from "react-redux"
import { getProductsApi } from '../../slices/ProductSlice'
import "./Products.css"
import Pagination from "react-js-pagination"
import { useParams } from "react-router-dom";
// import MetaData from "../layout/MetaData";

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const { keyword } = useParams();
    
    const { data, isLoading } = useSelector((state) => state.custom)
    const { resultPerPage, productsCount } = data

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    console.log(currentPage)

    useEffect(() => {
        dispatch(getProductsApi(keyword, currentPage))
    }, [keyword, currentPage])
    console.log(currentPage)


    return (
        isLoading ? (
            <h1>Loading..........</h1>
        ) :
            (
                <Fragment>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {data.products && data.products.map((curPro) => (
                            <ProductCard key={curPro._id} product={curPro} />
                        ))
                        }
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