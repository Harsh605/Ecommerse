import React from "react";
// import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <>
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">

                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src={item.image}
                        className="w-100" alt="Blue Jeans Jacket" />
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                    </a>
                </div>

            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                <p><strong>{item.name}</strong></p>
                <p>{item.category}</p>
                <span>{`Price: ₹${item.price}`}</span>
                <p className="text-danger cursor-pointer" onClick={() => deleteCartItems(item.productId)}>Remove</p>
                

            </div>
        </>
        
    );
};

export default CartItemCard;
