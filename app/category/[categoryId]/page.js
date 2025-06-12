'use client'
import useSWR from 'swr';
import Api from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';
import LoaderAnimation from '@/components/LoaderAnimation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ApiDataNotFound from '@/components/ApiDataNotFound';

const fetcher = async (url) => await Api.getProducts(url);

const fetcherCategoryData = async (url) => await Api.getApi(url);

const Products = ({params}) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const param = useSearchParams();
    const categoryId = param.get('id');
    const pageTitle = (params.categoryId).toUpperCase();

    const { data: productApi, error: productApiError } = useSWR(`/wp/v2/product/?product-category=${categoryId}&page=${currentPage}&per_page=6`, fetcher);

    const { data: productCategoryApi, error: productCategoryApiError } = useSWR(`/wp/v2/product-category/${categoryId}`, fetcherCategoryData);

    if (productApiError || productCategoryApiError) return <ApiDataNotFound/>;
    if (!productApi || !productCategoryApi) return <div><LoaderAnimation/></div>;

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

    const dew = 0;
    return (
        <>
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: 'url("/images/service-bg.jpg")'}}>
                <h2 className="ltext-105 p-t-50 cl0 txt-center">
                    {pageTitle}
                </h2>
            </section>

            <div className="flex m-t-20 place-content-center">
                <Link href="/documents">
                    <button className='mr-2 px-4 h-10 text-base font-medium text-white rounded-full bg1 hov-btn1'>
                        Documents
                    </button>
                </Link>

                <Link href={productCategoryApi.acf.youtube_vieo_link} target='_blank'>
                    <button className='ml-2 px-4 h-10 text-base font-medium text-white rounded-full bg1 hov-btn1'>
                        Tutorials
                    </button>
                </Link>
                <Link href="/category/used-gear?id=30">
                    <button className='ml-2 px-4 h-10 text-base font-medium text-white rounded-full bg1 hov-btn1'>
                        Used Gear
                    </button>
                </Link>
            </div>

            <label
                className="mx-auto mt-10 m-b-45 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-md focus-within:border-gray-300"
                htmlFor="search-bar">
                <input id="search-bar" placeholder="Search by Product Name" className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" onChange={(e)=>{setSearch(e.target.value)}}/>
            </label>

            <div className='flex place-content-center text-center '>
                <p><b>{productCategoryApi.acf.category_inner_text}</b></p>
            </div>

            <div className="bg0 m-t-23 p-b-50">
                <div className="container">
                    <div className="row isotope-grid justify-center">
                        {totalProducts
                        .filter((product) => {
                            return search.toLowerCase() === ''
                            ? product
                            : product.title.rendered.toLowerCase().includes(search);
                        }).map((product)=>(
                            <div className="col-sm-6 col-md-4 col-lg-3 p-b-15 isotope-item women shadow-md" key={product.id}>
                                {product.acf.coming_soon == true && 
                                    <div className="ribbon-categories"><span>Coming Soon</span></div>
                                }
                                <Link href={{ pathname: '/product/'+product.slug, query: { id: product.id } }} className='hover:no-underline'>
                                    <div className="block2">
                                        <div className="block2-pic hov-img0">
                                            <Image width={1000} height={1000} src={product.acf.product_images[0]} alt="IMG-PRODUCT" />
                                        </div>
                                        <div className="block2-txt flex-w flex-t p-t-14">
                                            <div className="block2-txt-child1 flex-col-l ">
                                                <span className="text-xl hover:no-underline font-semibold text-slate-900 hov-cl1 trans-04 js-name-b2 p-b-6">
                                                    {product.title.rendered}
                                                </span>
                                                <span className="stext-105 cl3">
                                                   <strong>Starting at</strong> {`$${product.acf.product_price}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-c-m flex-w w-full p-b-45">
                <div className="inline-flex mt-2 xs:mt-0">
                    <button className={`mr-2 flex items-center justify-center px-4 h-10 text-base font-medium text-white ${(currentPage == 1 || productApi.data.length==0) ?'bg-gray-200' : 'bg-gray-800'} rounded-s dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={previousPagination} disabled={(currentPage==1 ||productApi.data.length==0) ? true : false}>
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Prev
                    </button>

                    <button className={`ml-2 flex items-center justify-center px-4 h-10 text-base font-medium text-white ${(currentPage==totalPages || productApi.data.length==0) ?'bg-gray-200' : 'bg-gray-800'} border-0 border-s border-gray-700 rounded-e dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} onClick={nextPagination} disabled={(currentPage==totalPages || productApi.data.length==0) ?true : false}>
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path  stroke="currentColor"  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth={2}  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Category Description */}
            <div className="container">
                <div className="row p-b-45">
                    <div className="col-md-12 mt-2 xs:mt-0">
                        <h3 className='mb-3'><b>Description</b></h3>
                        <span dangerouslySetInnerHTML={{ __html:productCategoryApi.acf.category_description}}/> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
