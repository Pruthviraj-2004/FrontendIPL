import React from "react";
import { images } from "../../constants";

const Quote = () => {
  return (
    <div>
      <section class="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div class="px-4 mx-auto w-[95vw] lg:w-screen max-w-screen sm:px-6 lg:px-8">
          <div class="flex flex-col items-center">
            <div class="text-center">
              <p class="mt-2 lg:text-2xl text-2xl font-bold text-gray-900 sm:text-4xl  font-pj">
                Here's what a few of the legends have to say about the IPL.
              </p>
            </div>

            <div class="relative mt-6 md:mt-24 md:order-2">
              <div class="absolute -inset-x-1 inset-y-14 md:-inset-x-2 md:-inset-y-6">
                <div
                  class="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                  }}
                ></div>
              </div>

              <div class="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                <div class="flex flex-col overflow-hidden shadow-xl">
                  <div class="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div class="flex-1">
                      <blockquote class="flex-1 mt-8">
                        <p class="text-lg leading-relaxed text-gray-900 font-pj">
                          "IPL has changed the landscape of Indian cricket. It
                          has taken cricket to a whole new level, both on and
                          off the field."
                        </p>
                      </blockquote>
                    </div>

                    <div class="flex items-center mt-8">
                      <img
                        class="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src={images.sachin}
                        alt=""
                      />
                      <div class="ml-4">
                        <p class="text-base font-bold text-gray-900 font-pj">
                          Sachin Tendulkar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col overflow-hidden shadow-xl">
                  <div class="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div class="flex-1">
                      <blockquote class="flex-1 mt-8">
                        <p class="text-lg leading-relaxed text-gray-900 font-pj">
                          "IPL has provided a platform for young talents to
                          showcase their skills and has brought innovation to
                          the game."
                        </p>
                      </blockquote>
                    </div>

                    <div class="flex items-center mt-8">
                      <img
                        class="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQfVr7cLYeA9dAbYWxSgVo6hkoFf5bs3znQZaK5Ojjmm2T2780LwbXmzOm-rImtZpJ18FHjeZR06NPTTZQ"
                        alt=""
                      />
                      <div class="ml-4">
                        <p class="text-base font-bold text-gray-900 font-pj">
                          Rahul Dravid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col overflow-hidden shadow-xl">
                  <div class="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div class="flex-1">
                      <blockquote class="flex-1 mt-8">
                        <p class="text-lg leading-relaxed text-gray-900 font-pj">
                          "IPL has pushed the boundaries of what is possible in
                          cricket. It has raised the bar for athleticism, skill,
                          and strategy."
                        </p>
                      </blockquote>
                    </div>

                    <div class="flex items-center mt-8">
                      <img
                        class="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFpsHk_t2Xkit1v7vEHsY2Dj2G2gCrKp9Wbw&usqp=CAU"
                        alt=""
                      />
                      <div class="ml-4">
                        <p class="text-base font-bold text-gray-900 font-pj">
                          AB de Villiers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
