import ReactStars from "react-rating-stars-component"
import React from 'react'
import { Link } from "react-router-dom"


let image = {
    url: "https://i.ibb.co/DRST11n/1.webp"
}

const ProductCard = ({ product }) => {


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
    }
    return (
        <Link className="productCard" to={`product/${product._id}`}>
            <div className="productImage">
                <img src={product.images[0].url} alt={product.name} />
            </div>
            <div className="productDetails">
                <p>{product.name}</p>
                <div className="mid-productDetails">
                    <ReactStars {...options} />
                    <span style={{ marginLeft: "20px" }}>{`(${product.reviews.length} reviews)`}</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </div>

        </Link>


    )
}

export default ProductCard