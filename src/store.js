// Import configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the cart reducer from CartSlice
import cartReducer from './CartSlice';

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' is the name of the slice in the store, and it's managed by cartReducer
        // This means the cart state will be accessible via state.cart in your components
        cart: cartReducer,
    },
});

// Export the store for use in the app (e.g., in <Provider store={store}>)
export default store;
