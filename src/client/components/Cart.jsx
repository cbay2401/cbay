import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [recordDetails, setRecordDetails] = useState({}); // State to store record details
    let {cartId} = useParams();

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const { data } = await axios.get(`/api/orders/cart/${cartId}`); 
                setCartItems(data);
                console.log("DATA:", data)

                data.forEach(async (item) => {
                    const recordData = await fetchRecordDetails(item.records_id);
                    setRecordDetails(prevState => ({
                        ...prevState,
                        [item.records_id]: recordData
                    }));
                });
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchCartItems();
    }, [cartId]);

    const fetchRecordDetails = async (recordId) => {
        try {
            const { data } = await axios.get(`/api/records/${recordId}`); // Assuming the endpoint is /api/records/:recordId
            return data;
        } catch (error) {
            console.error(`Error fetching record details for record ID ${recordId}:`, error);
            return {};
        }
    };


    console.log("CART ITEMS:", cartItems); 

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
        <div className="cart">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <> 
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <div>
                                {recordDetails[item.records_id] && (
                                    <>
                                        <img className='albumcover' src={recordDetails[item.records_id].imageurl} alt="Album Cover" />
                                        <p>{recordDetails[item.records_id].albumname}</p>
                                        <p>${recordDetails[item.records_id].price}</p>
                                        <p>Quantity:{item.quantity}</p>
                                        
                                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    </>
                                )}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </>
            )}
        </div>
    );
}

export default Cart;
