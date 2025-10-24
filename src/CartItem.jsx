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
                {cartIt
