'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Link from 'next/link';
import useSWR from 'swr';
import ApiDataNotFound from "../ApiDataNotFound";
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import Image from 'next/image';
import YouTubePlayer from '../YouTubePlayer';

const fetcher = async (url) => await Api.getApi(url);

const Styles = () => {

    const { data: stylesApi, error: stylesApiError } = useSWR('/wp/v2/pages/21/?_fields=acf', fetcher);

    if (stylesApiError) return <ApiDataNotFound/>;
    if (!stylesApi) return <div><LoaderAnimation/></div>;

    return (
        <>
            <div>
                {/* Title page */}
                <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: `url(${stylesApi.acf.first_section.banner_image})`}}>
                    <h2 className="ltext-105 p-t-50 cl0 txt-center">
                    {stylesApi.acf.first_section.page_title}
                    </h2>
                    <h5 className="ltext-106 cl0 txt-center">{stylesApi.acf.first_section.sub_title}</h5>
                </section>
                {/* Content page */}
                <section className="bg0 p-t-75 p-b-120">
                    <div className="container">
                        <div className="row p-b-50">
                            <div className="col-md-12 col-lg-12">
                                <div className="p-t-7 p-r-15-lg p-r-0-md">
                                    <h3 className="mtext-111 cl2 p-b-16 txt-center">
                                        {stylesApi.acf.heading_with_marquee.heading}
                                    </h3>
                                    <marquee direction="left" className="mx-auto">
                                        <div className="mx-auto container"><Image src={stylesApi.acf.heading_with_marquee.marquee_image} width={1000} height={1000} alt=''/></div>
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-sm-6 col-xs-12">
                                <div>
                                    <p>{stylesApi.acf.description_with_image.description}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div><Image className="img-fluid" src={stylesApi.acf.description_with_image.image} width={1000} height={1000} alt=''/></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row">
                        {stylesApi.acf.style_pack_products.map((product)=>(
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" key={product.product_title}>
                                <div className="packages">
                                    <div className="packages-heading">
                                        <h3>{product.product_title}</h3>
                                    </div>
                                    <span dangerouslySetInnerHTML={{__html:product.product_key_points}} />
                                    <div className="video-sec styles-nav">
                                        <Swiper
                                            slidesPerView={1}
                                            loop={true} 
                                            modules={[Navigation,Pagination]} 
                                            navigation
                                        >
                                        {product.youtube_video_links.map((video, index)=>(
                                            <SwiperSlide key={index}>
                                                <div>
                                                    <YouTubePlayer videoId={video.video_id} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        </Swiper>
                                    </div>
                                    <Link href={`/product/${product.product_data.post_name}?id=${product.product_data.ID}`} className="hover:no-underline flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer my-3">
                                        Buy Now
                                    </Link>
                                    <div className="pdf-sec">
                                        <Link href={product.pdf_link} target='_blank' className="d-flex">
                                            <Image width={50} height={50} src="/images/pdf.png" alt="pdf" />
                                            <div>
                                                <h4>{product.pdf_title}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))} 
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Styles
