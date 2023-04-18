import React from 'react'
import Stepperui from './steppers'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, shippingInfo } = useSelector((state) => state.custom4)


  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 499 ? 0 : 99;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    console.log(data)

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };


  return (
    <>
      <Stepperui activeStep={1} />


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

                      {items.map((item, key) => (
                        <div key={key}>
                          <div className="row ">
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0" >

                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                <img src={item.image}
                                  className="w-100"alt="Blue Jeans Jacket" />
                                <a href="#!">
                                  <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                </a>
                              </div>

                            </div>

                            <div className="flex flex-col justify-center items-center col-lg-3 col-md-4 mb-4 mb-lg-0">

                              <p><strong>{item.name}</strong></p>
                              {/* <p>{item.category}</p> */}
                              <span>{`Quantity: ${item.quantity}`}</span>


                            </div>
                            <div className="flex justify-center items-center col-lg-3 col-md-4 mb-4 mb-lg-0">
                             
                              <span>{`₹${item.price}`}</span>

                            </div>

                            <div className="flex flex-col justify-center items-center col-lg-3 col-md-4 mb-4 mb-lg-0">
                              <p>{item.quantity}N x {`₹${item.price}`} = ₹{item.quantity * item.price} </p>
                              {/* <p>=</p>
                              <p>₹{item.quantity * item.price}</p> */}

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
                      <h5 className="mb-0">Shipping Details</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {shippingInfo.Name}
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {shippingInfo.address}
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {shippingInfo.city}, {shippingInfo.state},  {shippingInfo.country}
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {shippingInfo.phoneNo}
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {shippingInfo.email}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Summary</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Products
                          <span>{subtotal}</span>
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Tax
                          <span>{tax}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Shipping
                          <span>{shippingCharges}</span>
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                           
                          </div>
                          <span><strong>{totalPrice}</strong></span>
                        </li>
                      </ul>

                      <button type="button" style={{ backgroundColor: "#0d6efd" }} className="btn btn-primary btn-lg " onClick={proceedToPayment}>
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        }
      </>


    </>
  )
}

export default ConfirmOrder