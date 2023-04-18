import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addItemsToCart, removeItemsFromCart } from '../../slices/addToCartSlice'
import CartItemCard from './CartItemCard'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items } = useSelector((state) => state.custom4)

    const increaseQuantity = (id, quantity, stock) => {
        const qty = 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart({ id, qty }));
    };

    const decreaseQuantity = (id, quantity) => {
        const qty = -1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart({ id, qty }));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart({ id }));
    };

    const checkoutHandler = () => {
        navigate("/shipping");
      };

    return (
        items.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <RemoveShoppingCartIcon  className='fs-1'/>

                <Typography className='fs-1'>No Product in Your Cart</Typography>
                <Link className='fs-4 rounded-full py-2 px-3 bg-blue-500 ' to="/products">View Products</Link>
            </div>
        ) : (
            <>
                {items &&
                    <section className="h-100 gradient-custom">
                        <div className="container py-5">
                            <div className="row d-flex justify-content-center my-4">

                                <div className="col-md-8">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Cart - {items.length} items</h5>
                                        </div>
                                        <div className="card-body">

                                            {items.map((item,key) => (
                                                <div key={key}>
                                                    <div className="row">

                                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />

                                                        <div className="d-flex justify-center items-center col-lg-3 col-md-4 mb-4 mb-lg-0">
                                                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                                <button className="btn btn-primary px-3 me-2"
                                                                    onClick={() => decreaseQuantity(item.productId, item.quantity)}>
                                                                    -
                                                                </button>
                                                                <input type="number" value={item.quantity} readOnly style={{ maxWidth: "30px", textAlign: "center", border: "none", outline: "none" }} />
                                                                <button className="btn btn-primary px-3 ms-2"
                                                                    onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    {items.length > 1 ? (<hr className="my-4" />) : null}
                                                </div>
                                            ))}

                                        </div>
                                    </div>


                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Summary</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Products
                                                    <span>{`₹${items.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Shipping
                                                    <span>₹0</span>
                                                </li>
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>Total amount</strong>
                                                        <strong>
                                                            <p className="mb-0">(including Gst)</p>
                                                        </strong>
                                                    </div>
                                                    <span><strong>{`₹${items.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</strong></span>
                                                </li>
                                            </ul>

                                            <button type="button" onClick={checkoutHandler} style={{ backgroundColor: "#0d6efd" }} className="btn btn-primary btn-lg ">
                                                Go to checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                }
            </>
         
        ))
}

export default Cart