import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Modal, Image, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import "./shop.css";
// ******************
// Start product specifications
// ******************
const product = [
  {
    id: 1,
    name: "Waffle with Berries",
    shortName: "Waffle",
    price: 6.5,
    image: "images/image-waffle-desktop.jpg",
    imagePhone: "images/image-waffle-mobile.jpg",
    imageTablet: "images/image-waffle-tablet.jpg",
    cartImage: "images/image-waffle-thumbnail.jpg",
  },
  {
    id: 2,
    name: "Vanilla Bean Crème Brûlée",
    shortName: "Crème Brûlée",
    price: 7.0,
    image: "images/image-creme-brulee-desktop.jpg",
    imagePhone: "images/image-creme-brulee-mobile.jpg",
    imageTablet: "images/image-creme-brulee-tablet.jpg",
    cartImage: "images/image-Crème-Brûlée-thumbnail.jpg",
  },
  {
    id: 3,
    name: "Macaron Mix of Five",
    shortName: "Macaron",
    price: 8.0,
    image: "images/image-macaron-desktop.jpg",
    imagePhone: "images/image-macaron-mobile.jpg",
    imageTablet: "images/image-macaron-tablet.jpg",
    cartImage: "images/image-macaron-thumbnail.jpg",
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    shortName: "Tiramisu",
    price: 5.5,
    image: "images/image-tiramisu-desktop.jpg",
    imagePhone: "images/image-tiramisu-mobile.jpg",
    imageTablet: "images/image-tiramisu-tablet.jpg",
    cartImage: "images/image-tiramisu-thumbnail.jpg",
  },
  {
    id: 5,
    name: "Pistachio Baklava",
    shortName: "Baklava",
    price: 4.0,
    image: "images/image-baklava-desktop.jpg",
    imagePhone: "images/image-baklava-mobile.jpg",
    imageTablet: "images/image-baklava-tablet.jpg",
    cartImage: "images/image-baklava-thumbnail.jpg",
  },
  {
    id: 6,
    name: "Lemon Meringue Pie",
    shortName: "Pie",
    price: 5.0,
    image: "images/image-meringue-desktop.jpg",
    imagePhone: "images/image-meringue-mobile.jpg",
    imageTablet: "images/image-meringue-tablet.jpg",
    cartImage: "images/image-macaron-thumbnail.jpg",
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    shortName: "Cake",
    price: 4.5,
    image: "images/image-cake-desktop.jpg",
    imagePhone: "images/image-cake-mobile.jpg",
    imageTablet: "images/image-cake-tablet.jpg",
    cartImage: "images/image-cake-thumbnail.jpg",
  },
  {
    id: 8,
    name: "Salted Caramel Brownie",
    shortName: "Brownie",
    price: 4.5,
    image: "images/image-brownie-desktop.jpg",
    imagePhone: "images/image-brownie-mobile.jpg",
    imageTablet: "images/image-brownie-tablet.jpg",
    cartImage: "images/image-brownie-thumbnail.jpg",
  },
  {
    id: 9,
    name: "Vanilla Panna Cotta",
    shortName: "Panna Cotta",
    price: 6.5,
    image: "images/image-panna-cotta-desktop.jpg",
    imagePhone: "images/image-panna-cotta-mobile.jpg",
    imageTablet: "images/image-panna-cotta-tablet.jpg",
    cartImage: "images/image-panna-cotta-thumbnail.jpg",
  },
];
// ******************
// End product specifications
// ******************

// ******************
// Starting the main component
// ******************

function App() {
  // Using the useState hook to update items
  const [carts] = useState(product);
  const [buyCarts, setBuyCarts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [showCounter, setShowCounter] = useState(null);
  const [modalBox, setModalBox] = useState(false);
  const [focusedCartId, setFocusedCartId] = useState(null);

  // Metode clickshow to hide and display products
  const clickShow = (id) => {
    setShowCounter(showCounter === id ? null : id);
  };
  // Metode plusHandler to increase product quantity and add product to cart
  const plusHandler = (id) => {
    setQuantity((prev) => {
      const updatedQuantity = { ...prev, [id]: (prev[id] || 0) + 1 };
      if (!buyCarts.some((item) => item.id === id)) {
        const productToAdd = carts.find((item) => item.id === id);
        setBuyCarts([...buyCarts, productToAdd]);
      }
      return updatedQuantity;
    });
  };
  // Metode minusHandler to reduce product quantity and remove it from cart
  const minusHandler = (id) => {
    setQuantity((prev) => {
      if (!prev[id] || prev[id] === 1) {
        setBuyCarts((prevCart) => prevCart.filter((item) => item.id !== id));
        const updatedQuantity = { ...prev };
        delete updatedQuantity[id];
        return updatedQuantity;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  // it is  used to remove, hide active counters,zero the amount or number of products.
  const trashHandler = (id) => {
    setBuyCarts(buyCarts.filter((item) => item.id !== id));
    setShowCounter(null);
    setQuantity((prev) => {
      const updatedQuantity = { ...prev };
      delete updatedQuantity[id];
      return updatedQuantity;
    });
  };
  // in totalprice variable we collect the amount of money in the  shopping
  const totalPrice = buyCarts.reduce(
    (num, item) => num + (quantity[item.id] || 0) * item.price,
    0
  );
  // in totalQuantity variable we add all the number of products in the cart
  const totalQuantity = Object.values(quantity).reduce(
    (num, item) => num + item,
    0
  );
  // with this  method we will display the confirmation sheet
  const modalShowHandler = () => {
    setModalBox(true);
  };
  // In this section, when the page is approved, the scroll returns to the top of the page.
  useEffect(() => {
    if (modalBox !== false) {
      window.scrollTo(0, 0);
    }
  }, [modalBox]);
  // In the clearHandler method, we return the quantity, counter, confirmation page, and shopping cart to their default state.
  const clearHandler = () => {
    setQuantity({});
    setShowCounter(null);
    setModalBox(false);
    setBuyCarts([]);
  };
  const handleFocus = (id) => setFocusedCartId(id);
  const handleBlur = () => setFocusedCartId(null);
  // In this section we display our HTML codes.
  return (
    <div className="container-fluid">
      <h1>Desserts</h1>
      <Row>
        {/* Calling the Products component inside the main component */}
        <Col xs={12} md={12} className="cart-container">
          {carts.map((cart) => (
            <Cart
              cart={cart}
              key={cart.id}
              showCounter={showCounter}
              clickShow={clickShow}
              quantity={quantity}
              plusHandler={plusHandler}
              minus={minusHandler}
              isFocused={focusedCartId === cart.id}
              onFocus={() => handleFocus(cart.id)}
              onBlur={handleBlur}
            />
          ))}
        </Col>
        {/* Calling the shopping cart component in the main component */}
        <Col xs={12} md={12} className="cart-shoping">
          <Card className="cart-shoping-item">
            <Card.Header>Your Cart({totalQuantity || 0}) </Card.Header>
            <Card.Body>
              {buyCarts.length === 0 ? (
                <div className="empty-box">
                  <img src="images/illustration-empty-cart.svg" alt="empty" />
                  <p className="empty-text">
                    Your added items will appear here
                  </p>
                </div>
              ) : (
                buyCarts.map((cart) => (
                  <CartShoping
                    key={cart.id}
                    cart={cart}
                    quantity={quantity}
                    trashHandler={trashHandler}
                  />
                ))
              )}
              {buyCarts.length !== 0 ? (
                <div className="end-box">
                  <p className="total-price">
                    {" "}
                    Order
                    <span>${totalPrice.toFixed(2)}</span>
                  </p>
                  <div className="brand">
                    <img src="images/icon-carbon-neutral.svg" />
                    <p className="brandName">
                      This is a <span> carbon-neutral</span> delivery
                    </p>
                  </div>
                  <button onClick={modalShowHandler} className="confirm-btn">
                    Confirm Order
                  </button>
                </div>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Product purchase confirmation form structure */}
      {modalBox !== false ? (
        <Modal show={true}>
          <Modal.Header className="modal-header">
            <img src="images/icon-order-confirmed.svg" alt="confirmed" />
            <h2>Order confirmed</h2>
            <p className="">we hope you enjoy your food</p>
          </Modal.Header>
          <Modal.Body>
            {buyCarts.map((cart) => (
              <div key={cart.id} className="modal-cartBox">
                <div className="cartBox">
                  <img className="img-thumbnail" src={cart.cartImage} alt="thumbnail" />
                  <div className="cartBox-items">
                    <p className="shping-name">{cart.name}</p>
                    <p className="cartBox-item">
                      <span className="item-quanty">{quantity[cart.id]}x</span>
                      <span className="item-price">
                        @ ${cart.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="cartBox-item-price">
                  ${(quantity[cart.id] * cart.price).toFixed(2)}
                </span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <div className="footer-text">
              <span className="item-order">Order</span>
              <span className="totalPrice">${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={clearHandler} className="clear">
              Start New Order
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
// Product components
function Cart({
  cart,
  showCounter,
  clickShow,
  quantity,
  plusHandler,
  minus,
  isFocused,
  onFocus,
  onBlur,
}) {
  return (
    <Card className="cart-box">
      <Card
        className="cart-imag"
        style={{
          border: isFocused ? "2px solid red" : "none",
        }}
      >
        <picture>
          <source srcSet={cart.imagePhone} media="(max-width:600px)" />
          <source srcSet={cart.imageTablet} media="(max-width:1200px)" />
          <Image className="photo" src={cart.image} alt="photo" rounded />
        </picture>
        <div className="btn-box" tabIndex="0" onFocus={onFocus} onBlur={onBlur}>
          {showCounter !== cart.id && (
            <span onClick={() => clickShow(cart.id)} className="btn-text">
              <FaShoppingCart />
              Add to Cart
            </span>
          )}
          {showCounter === cart.id && (
            <div className="counter">
              <button
                onClick={() => minus(cart.id)}
                className="btn-counter minus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="2"
                  fill="none"
                  viewBox="0 0 10 2"
                  className="icon-minus-custom"
                >
                  <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </button>
              <span className="counter-count">{quantity[cart.id] || 0}</span>
              <button
                onClick={() => plusHandler(cart.id)}
                className="btn-counter plus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                  className="icon-minus-custom"
                >
                  <path
                    fill="currentColor"
                    d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Card>
      <p className="shortName">{cart.shortName}</p>
      <p className="name">{cart.name}</p>
      <p className="price">{cart.price.toFixed(2)}$</p>
    </Card>
  );
}
// Shopping Cart Component
function CartShoping({ cart, quantity, trashHandler }) {
  return (
    <div className="shoping">
      <div className="shoping-text">
        <p className="shping-name">{cart.name}</p>
        <p className="shoping-item">
          <span className="item-quanty ">{quantity[cart.id]}x</span>
          <span className="item-price">@ ${cart.price.toFixed(2)}</span>
          <span className="item-total">
            {(quantity[cart.id] * cart.price).toFixed(2)}
          </span>
        </p>
      </div>
      <button onClick={() => trashHandler(cart.id)} className="delet-btn">
        <FaTrash size={40} />
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
