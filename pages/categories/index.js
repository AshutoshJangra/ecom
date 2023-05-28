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


import Header from "../../components/header";
import Link from "next/link";
const callouts = [
    {
      name: 'Mobile',
      description: 'Mobile & Accessories',
      imageSrc: 'https://www.expertreviews.co.uk/sites/expertreviews/files/styles/er_main_wide/public/2023/03/best_mid_range_smartphone_uk_2023_phones.jpeg?itok=oi8vcTrY',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: 'mobile',
    },
    {
      name: 'Smartwatch',
      description: 'Smartwatch & Accessories',
      imageSrc: 'https://hips.hearstapps.com/hmg-prod/images/best-smartwatches-64392fca75547.png?crop=1.00xw:1.00xh;0,0&resize=1200:*',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: 'Smartwatch',
    },
    {
      name: 'Laptop',
      description: 'Laptop & Accessories',
      imageSrc: 'https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: 'laptop',
    },
  ]
  
  export default function Categories() {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <Link href={`/categories/${callout.href}`} key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                   
                      <span className="absolute inset-0" />
                      {callout.name}
                    
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  