import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array to store cart items
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to cart
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.name === newItem.name);
            
            if (existingItem) {
                // If item already exists, increase quantity
                existingItem.quantity++;
            } else {
                // If new item, add to cart with quantity 1
                state.items.push({
                    name: newItem.name,
                    image: newItem.image,
                    description: newItem.description,
                    cost: newItem.cost,
                    quantity: 1
                });
            }
        },
        
        // Remove item from cart by name
        removeItem: (state, action) => {
            const name = action.payload;
            // Filter out the item with matching name
            state.items = state.items.filter(item => item.name !== name);
        },
        
        // Update quantity of a specific item
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            
            if (itemToUpdate) {
                // Update the quantity to the new amount
                itemToUpdate.quantity = quantity;
            }
        }
    }
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default
export default CartSlice.reducer;
