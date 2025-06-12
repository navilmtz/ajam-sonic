'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Link from 'next/link';
import Image from 'next/image';

const BannerSlider =  ({bannerApi}) => {

  return (
    <>
        <section className="section-slide relative z-5">
            <div className="wrap-slick1 rs1-slick1">
                <div className="slick1">
                    <Swiper
                        slidesPerView={1}
                        // autoplay={{delay:6000}}
                        loop={true} 
                        modules={[Navigation,Pagination, Autoplay]} 
                        navigation 
                    >
                        {/* {bannerApi.map((banner)=>( */}
                            <SwiperSlide>
                                <div className="item-slick1" style={{ backgroundImage:`url(${bannerApi[0].banner_background_image})`}} >
                                    <div className="container-fluid h-full">
                                        <div className='row justify-content-end'>
                                            {/* pt-200 by deepak */}
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 flex-col-l-m h-full  p-t-200 p-b-30">
                                                <div className="layer-slick1 animated ">
                                                    <span className="text-6xl  cl2 respon2">
                                                        <div dangerouslySetInnerHTML={{__html:bannerApi[0].banner_title}}/>
                                                    </span>
                                                </div>
                                                <div className="layer-slick1 animated slideDown">
                                                    <h2 className="ltext-202 cl2 p-t-19 p-b-43 respon1 font-weight-bold">
                                                        <div dangerouslySetInnerHTML={{__html:bannerApi[0].banner_subtitle}}/>
                                                    </h2>
                                                </div>
                                                <div className="layer-slick1 animated slideUp">
                                                    <Link href={bannerApi[0].banner_button_link} className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                                                        Shop Now
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                <div className="banner-img">
                                                    <Image width={1000} height={1000} src={bannerApi[0].banner_images} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        {/* ))} */}
                    </Swiper>
                </div>
            </div>
        </section>
    </>
  )
}

export default BannerSlider
