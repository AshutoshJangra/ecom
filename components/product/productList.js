/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import Link from "next/link";
import { useSession } from "next-auth/react";
import { type } from "os";
import { useState } from "react";

export default function ProductList({products, wishlist}) {
  //   const products = props.data.data;
console.log("old data",products)
  const [productsData , setProductsData] = useState(products);

  console.log("old data2",productsData)

  const { data: session } = useSession();

  const handleChange = (val) =>{

    console.log(val);
    setProductsData(
      products.filter(p => {
        console.log("xzcZ" ,p)
        return p.name.toLowerCase().includes(val.toLowerCase());
      }
    ))

    console.log("new data", productsData)
  }

  const handleWishlist = async (product) => {
    const result = await fetch("/api/wishlist", {
      method: "POST",
      mode: "cors",

      body: JSON.stringify({
        email: session.user.email,
        ...product,
      }),
    });

    console.log(result);
  };

  return (
    <div className="bg-white ">

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <input onChange={(e)=>handleChange(e.target.value)} className="p-2 mb-10 border border-gray-400 font-normal text-sm outline-none mx-auto lg:max-w-2xl max-w-2xl mb-2 mt-2" type="text" placeholder="Search"/>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Collection</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsData.map((product) => (
            <div key={product.id} className="group relative">
              <Link
                href={`/detail/${product.name}`}
                className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
              >
                <img
                  src={product.images[0].src}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </Link>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link  href={`/detail/${product.name}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.colors[0].name}
                  </p>
                </div>
                <div className="grid justify-items-end">
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>

                  {!wishlist && <button
                    onClick={() => handleWishlist(product)}
                    className="mt-1 text-xs text-pink-500"
                  >
                    Add to Wishlist
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

