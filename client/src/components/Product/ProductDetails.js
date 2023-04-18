import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component"
import { getSingleProductsApi } from "../../slices/ProductSlice";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { addItemsToCart, removeItemsFromCart } from "../../slices/addToCartSlice";

const ProductDetails = ({ setProgress }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleProductData, isLoading } = useSelector((state) => state.custom);

    const [qty, setQty] = useState(1)

    const handleIncrease = (e) => {
        if(qty>=singleProductData.product.stock){
            return
        }
        setQty(qty + 1)
    }
    const handleDecrease = (e) => {
        if(qty<=1){
            return
        }
        setQty(qty - 1)
    }

    const handleAddToCart=()=>{
        dispatch(addItemsToCart({id,qty}))
    }
    const handleRemoveCart=()=>{
        dispatch(removeItemsFromCart({id}))
    }


    useEffect(() => {
        dispatch(getSingleProductsApi(id));
    }, []);

    if (singleProductData) {
        setProgress(100);
    }

    const options = {
        value: singleProductData.product && singleProductData.product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return isLoading ? (
        <h1>Loading..........</h1>
    ) : (singleProductData.product &&
        <Fragment>
            <div className="productDetails-main">
                <div className="productDetails-left">
                    <Carousel className="productDetails-carousel">
                        {singleProductData.product.images &&
                            singleProductData.product.images.map((img, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={img.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>
                <div className="productDetails-right">
                    <div className="detailsBlock-1">
                        <h2>{singleProductData.product.name}</h2>
                        <p>Product # {singleProductData.product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options} />
                        <span className="detailsBlock-2-span">
                            {" "}
                            ({singleProductData.product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${singleProductData.product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={handleDecrease}>-</button>
                                <input type="number" readOnly value={qty} />

                                <button onClick={handleIncrease}>+</button>
                            </div>
                            <button
                                disabled={singleProductData.product.stock < 1 ? true : false}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>

                            
                        </div>

                        <p>
                            Status:
                            <b
                                className={
                                    singleProductData.product.stock < 10
                                        ? "redColor"
                                        : "greenColor"
                                }
                            >
                                {singleProductData.product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{singleProductData.product.description}</p>
                    </div>

                    <button className="submitReview">Submit Review</button>
                </div>
            </div>

        </Fragment>
    );
};

export default ProductDetails;
