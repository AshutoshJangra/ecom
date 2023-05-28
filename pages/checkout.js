import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/header";

const CheckoutPage = ({orderData}) => {
    console.log("order",orderData)
  const [orders, setOrders] = useState(orderData);
  const router = useRouter();

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("/api/orders");
//       if (response.ok) {
//         const data = await response.json();
//         setOrders(data.orders);
//       } else {
//         console.error("Failed to fetch orders");
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//     }
//   };

  const handleCheckout = () => {
    // Handle the checkout process
    // Add your own logic here
    router.push("/thank")
    
  };

  const totalCost = orders.length
  ? orders.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    )
  : 0;

  return (
    <div className="container mx-auto p-8">
        <Header/>
      <div className="grid grid-cols-2 mt-10 gap-8">
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-4">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="bg-gray-100 p-4 rounded">
                  <h3 className="text-sm font-medium">{order.name}</h3>
                  <p className="text-xs">{order.description}</p>
                  <p className="text-sm mt-2">Qty. {order.quantity}</p>
                  <p className="text-sm mt-2">Price. ${order.quantity * order.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders available</p>
          )}
 <h2 className="text-sm font-bold mt-4">Total Cost : ${ totalCost}</h2>

        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-4">Checkout</h2>
          <form className="space-y-4">
            
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium text-sm">
                Card Number
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 text-sm p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium text-sm">
                Expiry Date
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 text-sm p-2 rounded"
              />
            </div>
            {/* Add more form fields for the checkout information */}
            <button
              type="button"
              onClick={handleCheckout}
              className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    // console.log("Session", session)
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders?email=${session.user.email}`
      );
  
      const { data } = await res.json();
  
      return {
        props: {
            orderData: data || [],
        },
      };
    } catch (error) {
      console.error("Failed to fetch cart data", error);
      return {
        props: {
          orderData: [],
        },
      };
    }
  }