'use client'
import { useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import useSWR from 'swr';
import LoaderAnimation from '../../../components/LoaderAnimation';
import Api from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ProductPayPalPayment from '@/components/ProductPayPalPayment';
import ApiDataNotFound from '@/components/ApiDataNotFound';

const fetcher = async (url) => await Api.getApi(url);
const Page = () => {
	const param = useSearchParams();
	const productId = param.get('id');
	
	const { data: productApi, error: productApiError } = useSWR(`/wp/v2/product/${productId}`, fetcher);

	if (productApiError) return <ApiDataNotFound/>;
	if (!productApi) return <div><LoaderAnimation/></div>;

	return (
		<section className="sec-product-detail p-t-115 bg0 p-t-65 p-b-60">
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-lg-7 p-b-30">
						<div className="p-l-25 p-r-20 p-lr-0-lg">
							<div className="wrap-slick3 flex-sb flex-w ">
								<div className="slick3 gallery-lb mx-auto">
									<Swiper
										slidesPerView={1}
										loop={true} 
										modules={[Navigation,Pagination]} 
										navigation 
									>
									{productApi.acf.product_images.map((product)=>(
										<SwiperSlide key={product}>
											<div className="item-slick3" data-thumb={product}>
												<div className="wrap-pic-w pos-relative">
													<Image src={product} alt="IMG-PRODUCT" width={1000} height={1000} />
													<Link className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href={product}>
														<i className="fa fa-expand" />
													</Link>
												</div>
											</div>
										</SwiperSlide>
									))}
									</Swiper>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-lg-5 p-b-30">
						<div className="p-r-50 p-t-5 p-lr-0-lg">
							<h4 className="mtext-105 cl2 js-name-detail p-b-14">
								{productApi.title.rendered}
							</h4>
							<span className="mtext-106 cl2">
								Starting at ${productApi.acf.product_price}
							</span>
							<p className="stext-102 cl3 p-t-23">
								{/* {productApi.acf.product_short_description} */}
								<div dangerouslySetInnerHTML={{ __html:productApi.acf.product_short_description}}/>
							</p>
							{/*  */}
								<div className="p-t-33">
									<PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
										<ProductPayPalPayment productData={productApi.acf} singleProductData={productApi} />
									</PayPalScriptProvider>
								</div>
						</div>
					</div>
				</div>
				<div className="bor10 m-t-50 p-t-40 p-b-40">
					{/* Tab01 */}
					<div className="tab01">
						{/* Nav tabs */}
						<ul className="nav nav-tabs" role="tablist">
							<li className="nav-item p-b-10">
								<Link className="nav-link active" data-toggle="tab" href="#description" role="tab">Description</Link>
							</li>
						</ul>
						{/* Tab panes */}
						<div className="tab-content p-t-43">
							{/* - */}
							<div className="tab-pane fade show active" id="description" role="tabpanel">
								<div className="how-pos2 p-lr-15-md">
									<div dangerouslySetInnerHTML={{ __html:productApi.content.rendered}}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Page
