import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [recordDetails, setRecordDetails] = useState({});
    const { cartId } = useParams(); // Destructure cartId from useParams
    console.log('Cart ID:', cartId);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                if (cartId) { // Ensure cartId is defined
                    const { data } = await axios.get(`/api/orders/cart/${cartId}`); 
                    setCartItems(data);

                    data.forEach(async (item) => {
                        const recordData = await fetchRecordDetails(item.records_id);
                        setRecordDetails(prevState => ({
                            ...prevState,
                            [item.records_id]: recordData
                        }));
                    });
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchCartItems();
    }, [cartId]);

    const fetchRecordDetails = async (recordId) => {
        try {
            const { data } = await axios.get(`/api/records/${recordId}`);
            console.log("Data::::", data)
            return data;
        } catch (error) {
            console.error(`Error fetching record details for record ID ${recordId}:`, error);
            return {};
        }
    };

    const removeFromCart = async (recordId) => {
        try {
            await axios.delete(`/api/orders/${recordId}`);
            setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== recordId));
            alert('Record removed from cart successfully!');
        } catch (error) {
            console.error('Error removing record from cart:', error);
        }
    };

    const increaseQuantity = (itemId) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (itemId) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * recordDetails[item.records_id]?.price || 0), 0);

    return (
        <>
            <h1 className='shoppingCartH1'>Cart</h1>
            <div className="cart">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div className="album-container">
                                        {recordDetails[item.records_id] && (
                                            <>
                                                <img className="albumcover" src={recordDetails[item.records_id].imageurl} alt="Album Cover" />
                                                <div className="item-details">
                                                    <h3>{recordDetails[item.records_id].albumname}</h3>
                                                    <h4>${recordDetails[item.records_id].price}</h4>
                                                    <div className="quantity-controls">
                                                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                                        <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} />
                                                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                    </div>
                                                    <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h2 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h2>
                    </>
                )}
            </div>
        </>
    );
}

export default Cart;