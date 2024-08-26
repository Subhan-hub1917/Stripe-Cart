import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
    const [payment, setPayment] = useState(9835);
    const [products, setProducts] = useState([
        {
            name: "Apple Watch",
            quantity: 1,
            price: 599,
            image: 'https://flowbite.com/docs/images/products/apple-watch.png'
        },
        {
            name: "iMac 27",
            quantity: 1,
            price: 2499,
            image: 'https://flowbite.com/docs/images/products/imac.png'
        },
        {
            name: "iPhone 12",
            quantity: 1,
            price: 999,
            image: 'https://flowbite.com/docs/images/products/iphone-12.png'
        },
    ]);

    const handleQuantity = (product, increment) => {
        setProducts(products.map(p => 
            p === product ? { ...p, quantity: p.quantity + increment } : p
        ));
    };
    const makePayment=async()=>{
        const stripe = await loadStripe("pk_test_51PoNFaI0ZL3476hW80Dq4YrtuNEOaJvWmOYz6lKTcdMd3QvtvmUQZZXvwczp2Pj6lnk5CTzeXF5wjHOTQXyxNbXT00hSSWQW18");
        const body ={
            products:products
        }
        const headers={
            "Content-Type":"application/json"
        }
        const response= await fetch('http://localhost:5000/checkout-session',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(body)
        }) 
        const session=await response.json()
        const result=stripe.redirectToCheckout({
            sessionId:session.id
        })
        console.log(result);
    }
    useEffect(() => {
        const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setPayment(total);
    }, [products]);

    return (
        <div className="relative overflow-x-hidden shadow-md">
            <div className='bg-indigo-900 text-white'>
                <h1 className='text-center text-5xl font-bold py-3'>CART</h1>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold lg:text-3xl">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold lg:text-3xl">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold lg:text-3xl">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold lg:text-3xl">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.image} className="w-16 md:w-32 max-w-full max-h-full" alt={product.name} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => handleQuantity(product, -1)}
                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            <span className="sr-only">Increase Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input 
                                            type="number" 
                                            value={product.quantity} 
                                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            readOnly 
                                        />
                                        <button 
                                            onClick={() => handleQuantity(product, +1)}
                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                        >
                                            <span className="sr-only">Decrease Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {`$${product.price}`}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='text-center'>
                <button onClick={makePayment} className='px-20 py-1 text-3xl bg-indigo-900 text-white rounded-lg'>{`Pay $${payment}`}</button>
            </div>
        </div>
    );
}

export default Cart;
