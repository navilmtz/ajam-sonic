'use client'
import useSWR from 'swr';
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';
import ApiDataNotFound from "../ApiDataNotFound";
import Image from 'next/image';

const fetcher = async (url) => await Api.getProducts(url);
const Products = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: productApi, error: productApiError } = useSWR(`/wp/v2/product/?page=${currentPage}&per_page=5`, fetcher);
    

    if (productApiError) return <ApiDataNotFound/>;
    if (!productApi) return <div><LoaderAnimation/></div>;

    const totalProducts = productApi.data;
    const totalPages = productApi.headers;

    const nextPagination = () => {
        if(currentPage != totalPages)
        {
            setCurrentPage(currentPage+1);
        }
    }
    const previousPagination = () => {
        if(currentPage != 1)
        {
            setCurrentPage(currentPage-1);
        }
    }
    return (
        <>
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: 'url("images/service-bg.jpg")'}}>
                <h2 className="ltext-105 p-t-50 cl0 txt-center">
                    All Products
                </h2>
            </section>
            <label
                className="mx-auto mt-10 mb-24 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                htmlFor="search-bar">
                <input id="search-bar" placeholder="Search by Product Name"
                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" onChange={(e)=>{setSearch(e.target.value)}}/>
                <button
                    className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                    
                    <div className="relative">
                        <div
                            className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                            <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>

                        <div className="flex items-center transition-all opacity-1 valid:"><span
                                className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                Search
                            </span>
                        </div>

                    </div>
                    
                </button>
            </label>

            <div className="bg0 m-t-23 p-b-50">
                <div className="container">
                    <div className="row isotope-grid">
                        {totalProducts
                        .filter((product) => {
                            return search.toLowerCase() === ''
                            ? product
                            : product.title.rendered.toLowerCase().includes(search);
                        }).map((product)=>(
                            <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" key={product.id}>
                                {/* Block2 */}
                                <div className="block2">
                                    <div className="block2-pic hov-img0">
                                        <Image width={1000} height={1000} src={product.acf.product_images[0]} alt="IMG-PRODUCT" />
                                    </div>
                                    <div className="block2-txt flex-w flex-t p-t-14">
                                        <div className="block2-txt-child1 flex-col-l ">
                                            <Link href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                {product.title.rendered}
                                            </Link>
                                            <span className="stext-105 cl3">
                                                {`$${product.acf.product_price}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-c-m flex-w w-full p-t-45 p-b-45">
                <div className="inline-flex mt-2 xs:mt-0">
                    <button className={`mr-2 flex items-center justify-center px-4 h-10 text-base font-medium text-white ${currentPage==1 ?'bg-gray-200' : 'bg-gray-800'} rounded-s dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={previousPagination} disabled={currentPage==1 ?true : false}>
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Prev
                    </button>

                    <button className={`ml-2 flex items-center justify-center px-4 h-10 text-base font-medium text-white ${currentPage==totalPages ?'bg-gray-200' : 'bg-gray-800'} border-0 border-s border-gray-700 rounded-e dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={nextPagination} disabled={currentPage==totalPages ?true : false}>
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path  stroke="currentColor"  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth={2}  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Products
