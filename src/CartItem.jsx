import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total amount of all items in cart
    const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const cost = parseFloat(item.cost.substring(1));
            total += cost * item.quantity;
        });
        return total.toFixed(2);
    };

    // Calculate individual item cost
    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.substring(1));
        return (cost * item.quantity).toFixed(2);
    };

    // Increment item quantity using updateQuantity action
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // Decrement item quantity using updateQuantity action
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item completely using removeItem action
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Continue shopping handler
    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    // Checkout placeholder
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cartItems.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginTop: '50px' }}>
                        Your cart is empty. Start shopping!
                    </p>
                ) : (
                    cartItems.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">{item.cost}</div>
                                <div className="cart-item-quantity">
                                    <button 
                                        className="cart-item-button cart-item-button-dec" 
                                        onClick={() => handleDecrement(item)}
                                    >
                                        -
                                    </button>
                                    <span className="cart-item-quantity-value">{item.quantity}</span>
                                    <button 
                                        className="cart-item-button cart-item-button-inc" 
                                        onClick={() => handleIncrement(item)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    Subtotal: ${calculateTotalCost(item)}
                                </div>
                                <button 
                                    className="cart-item-delete" 
                                    onClick={() => handleRemove(item)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                    className="get-started-button" 
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>
                <br />
                <button 
                    className="get-started-button1" 
                    onClick={handleCheckoutShopping}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartItem;
