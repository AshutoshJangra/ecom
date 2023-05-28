
export default function Promo() {
    return (
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Blockbuster Deals are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://m.media-amazon.com/images/I/71k3gOik46L._SL1200_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="data:image/jpeg;base64,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"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-pink-500 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  