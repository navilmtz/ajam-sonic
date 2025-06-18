'use client'
import React from 'react'
import Link from "next/link";
import Api from "@/lib/api";
import LoaderAnimation from "@/components/LoaderAnimation";
import useSWR from 'swr';
import Image from 'next/image';
import ApiDataNotFound from '../ApiDataNotFound';
import ProductSection from '../HomePage/ProductSection';

const fetcher = async (url) => await Api.getApi(url);
const category = async (url) => await Api.getCategories(url) ;

const ProductCategories = () => {
    const { data: categoryApi, error: categoryApiError } = useSWR('/wp/v2/product-category', category);
    const { data: productApi, error: productApiError } = useSWR('/wp/v2/product/?per_page=100', fetcher);

    if (categoryApiError || productApiError) return <ApiDataNotFound/>;
    if (!categoryApi || !productApi) return <div><LoaderAnimation/></div>;
  return (
    <>
        <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: 'url("/images/download-bg.jpg")'}}>
            <h2 className="ltext-105 p-t-50 cl0 txt-center">
                Musical Instrument Categories
            </h2>
        </section>
        <div className="sec-banner bg0 p-t-80 p-b-50">
            <div className="container">
                <div className="row">
                    {categoryApi
                    .filter(category => category.id !== 30)
                    .map(category => (
                        <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto" key={category.id}>
                            {/* Block1 */}
                            <div className="block1 wrap-pic-w product-category">
                                <Image width={1000} height={1000} src={category.acf.category_image} alt="IMG-BANNER" />
                                <Link href={{ pathname: '/category/' + category.slug, query: { id: category.id } }} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-30 p-tb-30 trans-03 respon3">
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">
                                            <div dangerouslySetInnerHTML={{ __html: category.name }} />
                                        </span>
                                        <span className="block1-info stext-102 trans-04">
                                            {category.acf.category_subtitle}
                                        </span>
                                    </div>
                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">
                                            Shop Now
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <ProductSection productApi={productApi}/>
    </>
  )
}

export default ProductCategories
