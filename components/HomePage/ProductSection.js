'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductSection = ({productApi}) => {
  return (
    <>
      <section className="sec-product bg0 p-t-10 p-b-50">
          <div className="container">
            <div className="p-b-32">
              <h3 className="ltext-105 cl5 txt-center respon1">
                Store Overview
              </h3>
            </div>
            <div className="tab01">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item p-b-10">
                  <Link className="nav-link active" data-toggle="tab" href="#featured" role="tab" aria-controls="featured" aria-selected="true">Featured Products</Link>
                </li>
                <li className="nav-item p-b-10">
                  <Link className="nav-link" data-toggle="tab" href="#best_seller" role="tab" aria-controls="best_seller" aria-selected="true">Best Seller</Link>
                </li>
                <li className="nav-item p-b-10">
                  <Link className="nav-link" data-toggle="tab" href="#used_gear" role="tab" aria-controls="used_gear" aria-selected="true">Used Gear</Link>
                </li>
                <li className="nav-item p-b-10">
                  <Link className="nav-link" href="https://www.youtube.com/playlist?list=PL8Ya6B_eNDemnJZmvvV6RMgxlaDQBko-1" target='_blank'>Tutorials</Link>
                </li>
              </ul>
              <div className="tab-content p-t-50">

                <div className="tab-pane fade show active" id="featured" role="tabpanel" aria-labelledby="featured-tab">
                  <div className="wrap-slick2">
                    
                      <div className="slick2">
                        
                          <Swiper
                              slidesPerView={1}
                              loop={true} 
                              modules={[Navigation,Pagination]} 
                              navigation
                              breakpoints={{
                                  501: {
                                    slidesPerView: 2,
                                  },
                                  768: {
                                    slidesPerView: 3,
                                  },
                                  1025: {
                                    slidesPerView: 4,
                                  }
                              }}
                              >
                            {productApi.map((product) =>
                              product.acf.featured && (
                                <SwiperSlide key={product.id}>
                                  <Link href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className='hover:no-underline'>
                                    <div className="item-slick2 p-l-10 p-r-10 p-t-10 p-b-15 shadow-md isotope-item">
                                      {product.acf.coming_soon == true && 
                                        <div className="ribbon"><span>Coming Soon</span></div>
                                      }
                                      <div className="block2">
                                        <div className="block2-pic hov-img0">
                                          <Image width={1000} height={1000} src={product.acf.product_images[0]} alt="IMG-PRODUCT" />
                                        </div>
                                        <div className="block2-txt flex-w flex-t p-t-15">
                                          <div className="block2-txt-child1 flex-col-l ">
                                            <span href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className="text-xl hover:no-underline font-semibold text-slate-900 hov-cl1 trans-04 js-name-b2 p-b-6">
                                              {product.title.rendered}
                                            </span>
                                            <span className="stext-105 cl3">
                                              <strong>Starting at</strong> ${product.acf.product_price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>
                      </div>
                  </div>
                </div>

                <div className="tab-pane fade show" id="best_seller" role="tabpanel" aria-labelledby="best_seller-tab">
                  <div className="wrap-slick2">
                      <div className="slick2">
                            <Swiper
                              slidesPerView={1}
                              loop={true} 
                              modules={[Navigation,Pagination]} 
                              navigation
                              breakpoints={{
                                  501: {
                                    slidesPerView: 2,
                                  },
                                  768: {
                                    slidesPerView: 3,
                                  },
                                  1025: {
                                    slidesPerView: 4,
                                  }
                              }}
                              >
                            {productApi.map((product) =>
                              product.acf.best_seller && (
                                <SwiperSlide key={product.id}>
                                  <Link href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className='hover:no-underline'>
                                    <div className="item-slick2 p-l-10 p-r-10 p-t-10 p-b-15 shadow-md isotope-item">
                                      {product.acf.coming_soon == true && 
                                        <div className="ribbon"><span>Coming Soon</span></div>
                                      }
                                      <div className="block2">
                                        <div className="block2-pic hov-img0">
                                          <Image width={1000} height={1000} src={product.acf.product_images[0]} alt="IMG-PRODUCT" />
                                        </div>
                                        <div className="block2-txt flex-w flex-t p-t-15">
                                          <div className="block2-txt-child1 flex-col-l ">
                                            <span href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className="text-xl hover:no-underline font-semibold text-slate-900 hov-cl1 trans-04 js-name-b2 p-b-6">
                                              {product.title.rendered}
                                            </span>
                                            <span className="stext-105 cl3">
                                              ${product.acf.product_price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>
                      </div>
                  </div>
                </div>
                <div className="tab-pane fade show" id="used_gear" role="tabpanel" aria-labelledby="used_gear-tab">
                  <div className="wrap-slick2">
                      <div className="slick2">
                            <Swiper
                              slidesPerView={1}
                              loop={true} 
                              modules={[Navigation,Pagination]} 
                              navigation
                              breakpoints={{
                                  501: {
                                    slidesPerView: 2,
                                  },
                                  768: {
                                    slidesPerView: 3,
                                  },
                                  1025: {
                                    slidesPerView: 4,
                                  }
                              }}
                              >
                            {productApi.map((product) =>
                              product.acf.used_gear && (
                                <SwiperSlide key={product.id}>
                                  <Link href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className='hover:no-underline'>
                                    <div className="item-slick2 p-l-10 p-r-10 p-t-10 p-b-15 shadow-md isotope-item">
                                      {product.acf.coming_soon == true && 
                                        <div className="ribbon"><span>Coming Soon</span></div>
                                      }
                                      <div className="block2">
                                        <div className="block2-pic hov-img0">
                                          <Image width={1000} height={1000} src={product.acf.product_images[0]} alt="IMG-PRODUCT" />
                                        </div>
                                        <div className="block2-txt flex-w flex-t p-t-15">
                                          <div className="block2-txt-child1 flex-col-l ">
                                            <span href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className="text-xl hover:no-underline font-semibold text-slate-900 hov-cl1 trans-04 js-name-b2 p-b-6">
                                              {product.title.rendered}
                                            </span>
                                            <span className="stext-105 cl3">
                                              ${product.acf.product_price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>
                      </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default ProductSection