'use client'
import ModuleSection from "@/components/HomePage/ModuleSection";
import BannerSlider from '@/components/HomePage/BannerSlider';
import ProductSection from "@/components/HomePage/ProductSection";
import BlogSection from "@/components/HomePage/BlogSection";
import Api from "@/lib/api";
import LoaderAnimation from "@/components/LoaderAnimation";
import useSWR from 'swr';
import ApiDataNotFound from "../ApiDataNotFound";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination , Autoplay} from 'swiper/modules';
import Image from "next/image";

const fetcher = async (url) => await Api.getApi(url);
const category = async (url) => await Api.getCategories(url) ;

const Home = () => {
    const { data: bannerApi, error: bannerApiError } = useSWR('wp/v2/pages/13/?_fields=acf', fetcher);
    const { data: categoryApi, error: categoryApiError } = useSWR('/wp/v2/product-category', category);
    const { data: blogsApi, error: blogsApiError } = useSWR('/wp/v2/posts?per_page=100', fetcher);
    // const { data: productApi, error: productApiError } = useSWR('/wp/v2/product/?per_page=100', fetcher);

    if (bannerApiError || categoryApiError || blogsApiError) return <ApiDataNotFound/>;
    if (!bannerApi || !categoryApi || !blogsApi) return <div><LoaderAnimation/></div>;

    console.log('bannerApi', bannerApi);
    
  
    return (
        <>
            <BannerSlider bannerApi={bannerApi.acf.banner_slider} />
            <div className="container mx-auto m-t-50 px-4">
                <div className="row justify-content-center align-items-center">
                    <div className="text-center mb-8 col-sm-7 col-xs-12">
                        <h2 className="text-3xl txt-left  font-bold mb-4">{bannerApi.acf.home_section_1_title}</h2>
                        <p className="txt-left " style={{fontSize:'17px',fontFamily:'Poppins-Regular', fontWeight:'normal'}}>{bannerApi.acf.home_section_1_desc}</p>
                    </div>
                    <div className="text-center mb-8 col-sm-4 col-xs-12">
                        <Swiper
                            slidesPerView={1}
                            autoplay={{delay:6000}}
                            loop={true} 
                            modules={[Navigation,Pagination, Autoplay]} 
                            navigation 
                        >
                            {bannerApi.acf.home_section_1_images.map((img)=>(
                                <SwiperSlide key={img.image}>
                                    <Image width={400} height={100} src={img.image} alt="Ketron America Logo" className="mx-auto" /> 
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="sec2 p-t-1 p-b-1">  
                <div className="container mx-auto m-t-50 px-4">
                    <div className="row justify-content-center align-items-center">
                        <div className="text-left mb-8 col-sm-4 col-xs-12">
                            <Swiper
                                slidesPerView={1}
                                autoplay={{delay:6000}}
                                loop={true} 
                                modules={[Navigation,Pagination, Autoplay]} 
                                navigation 
                            >
                                {bannerApi.acf.home_section_2_images.map((img)=>(
                                    <SwiperSlide key={img.image}>
                                        <Image width={400} height={100} src={img.image} alt="Ketron America Logo" className="mx-auto" /> 
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="text-center mb-8 col-sm-7 col-xs-12 ">
                            <h2 className="text-3xl txt-left  font-bold mb-4">{bannerApi.acf.home_section_2_title}</h2>
                            <p className="txt-left " style={{fontSize:'17px',fontFamily:'Poppins-Regular', fontWeight:'normal'}}>{bannerApi.acf.home_section_2_desc}</p>
                        </div>
                    </div>
               </div>
            </div>

            <ModuleSection categoryApi={categoryApi} />
    
            <div className="container mx-auto m-t-10 m-b-30 px-4">
                <div className="row justify-content-center">
                    <div className="text-center mb-8 col-sm-4 col-xs-12">
                        <a href={bannerApi.acf.button_1_link}>
                            <button className="btn ">
                                <h4 className=" txt-center bg-btn  bg1 fs-18 mb-4 homebutton">{bannerApi.acf.button_1_text}</h4>
                            </button>
                        </a>
                    </div>
                    <div className="text-center mb-8 col-sm-4 col-xs-12 ">
                        <a href={bannerApi.acf.button_2_link}>
                            <button className="btn ">
                                <h4 className=" txt-center bg-btn  bg1 fs-18 mb-4 homebutton">{bannerApi.acf.button_2_text}</h4>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* <ProductSection productApi={productApi}/> */}
            {/* <BlogSection blogsApi={blogsApi} /> */}
        </>
    );
}

export default Home
