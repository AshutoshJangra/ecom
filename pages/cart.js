import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Cart({ cartItems }) {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (cartItems) {
      setItems(cartItems);
    }
  }, [cartItems]);

  // const handleQuantityDecrease = async (_id) => {
  //   try {
  //     // Update the quantity of the item
  //     const response = await fetch("http://localhost:3000/api/cart", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId:_id, quantity: -1 }),
  //     });
  //     const updatedItem = await response.json();

  //     // Update the local state with the updated item
  //     setItems((prevItems) =>
  //       prevItems.map((item) =>
  //         item._id === updatedItem._id ? updatedItem : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Failed to update item quantity", error);
  //   }
  // };

  // const handleQuantityIncrease = async (_id) => {
  //   try {
  //     // Update the quantity of the item
  //     const response = await fetch("http://localhost:3000/api/cart", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId:_id, quantity: 1 }),
  //     });
  //     const updatedItem = await response.json();

  //     // Update the local state with the updated item
  //     setItems((prevItems) =>
  //       prevItems.map((item) =>
  //         item._id === updatedItem._id ? updatedItem : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Failed to update item quantity", error);
  //   }
  // };
 

  const handleCheckout = async () =>{
    try {
          // Update the quantity of the item
          const response = await fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(items),
          });
          const updatedItem = await response.json();
    
          if(updatedItem){
            router.push("/checkout")
          }
        } catch (error) {
          console.error("Failed to update CHECKOUT quantity", error);
        }
  }

 
  const handleQuantityIncrease = (_id) => {
    
    setItems((prevItems) =>
    prevItems.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
   
  };

  const handleQuantityDecrease = (_id) => {
    

    setItems((prevItems) =>
    prevItems.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity > 0? item.quantity - 1:0 } : item
    )
  );
  
};

  const handleRemoveItem =  (_id) => {

   
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== _id)
        );
   
  };

  const totalCost = items.length
    ? items.reduce(
        (total, item) => total + item.quantity * parseFloat(item.price),
        0
      )
    : 0;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <Link
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                            href="/"
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.images[0].src}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>
                                          {product.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4">${product.quantity * product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex">
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500 mr-2 ml-2"
                                        onClick={() =>
                                          handleQuantityDecrease(product._id)
                                        }
                                      >
                                        <MinusIcon className="h-5 w-5" />
                                      </button>
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500 mr-2 ml-2"
                                        onClick={() =>
                                          handleQuantityIncrease(product._id)
                                        }
                                      >
                                        <PlusIcon className="h-5 w-5" />
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={()=>handleRemoveItem(product._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalCost}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6 flex justify-center items-center">
                        <button
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link
                            type="button"
                            href="/"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

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
      `http://localhost:3000/api/cart?email=${session.user.email}`
    );

    const { data } = await res.json();

    return {
      props: {
        cartItems: data || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch cart data", error);
    return {
      props: {
        cartItems: [],
      },
    };
  }
}
