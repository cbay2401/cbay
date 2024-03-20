import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const { data } = await axios.get('/api/orders/records'); 
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchCartItems();
    }, []);

    const removeFromCart = async (recordId) => {
        try {
            await axios.delete(`/api/orders/${recordId}`);
            setCartItems(cartItems.filter(item => item.id !== recordId));
            alert('Record removed from cart successfully!');
        } catch (error) {
            console.error('Error removing record from cart:', error);
        }
    };

    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.imageurl} alt="Album Cover" />
                            <div>
                                <h2>{item.artist}</h2>
                                <p>{item.albumname}</p>
                                <p>${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
