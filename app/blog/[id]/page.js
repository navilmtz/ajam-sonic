'use client'
import React from 'react'
import LoaderAnimation from '@/components/LoaderAnimation';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Api from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import ApiDataNotFound from '@/components/ApiDataNotFound';

const fetcher = async (url) => await Api.getApi(url);

const SingleBlog = () => {
    const param = useSearchParams()
    const blogId = param.get('id');

    const { data: blogApi, error: blogApiError } = useSWR(`/wp/v2/posts/${blogId}`, fetcher);
    const { data: latestBlogsApi, error: latestBlogsApiError } = useSWR(`/wp/v2/posts`, fetcher);

    if (blogApiError || latestBlogsApiError) return <ApiDataNotFound/>;
    if (!blogApi || !latestBlogsApi) return <div><LoaderAnimation/></div>;

    let date = new Date(blogApi.date);
    let blogDate = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();


  return (
    <section className="bg0 p-t-52 p-b-20">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-9 p-b-80">
            <div className="p-r-45 p-r-0-lg">
              {/*  */}
              <div className="wrap-pic-w how-pos5-parent">
                <Image width={1000} height={1000} className='single-blog-img' src={blogApi.featured_media_src_url} alt="IMG-BLOG" />
                <div className="flex-col-c-m size-123 bg9 how-pos5">
                  <span className="ltext-107 cl2 txt-center">
                    {month}
                  </span>
                  <span className="stext-109 cl3 txt-center">
                    {year}
                  </span>
                </div>
              </div>
              <div className="p-t-32">
                <span className="flex-w flex-m stext-111 cl2 p-b-19">
                  <span>
                    <span className="cl4">By</span> Admin  
                    <span className="cl12 m-l-4 m-r-6">|</span>
                  </span>
                  <span>
                    {`Date: ${blogDate} | Month: ${month} | Year: ${year}`}
                  </span>
                </span>
                <h4 className="ltext-109 cl2 p-b-28">
                  {blogApi.title.rendered}
                </h4>
                <p className="stext-117 cl6 p-b-26">
                  <span dangerouslySetInnerHTML={{ __html: blogApi.content.rendered }}/>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 p-b-80">
            <div className="side-menu">
              <div className="p-t-0">
                <h4 className="mtext-112 cl2 p-b-33">
                  Latest Blogs
                </h4>
                <ul>
                  <li className="flex-w flex-t p-b-30">
                    <Link href={{ pathname: '/blog/'+latestBlogsApi[0] ? latestBlogsApi[0].slug : '', query: { id: latestBlogsApi[0] ? latestBlogsApi[0].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                      <Image className='latest-blogs' src={latestBlogsApi[0] ? latestBlogsApi[0].featured_media_src_url : ''} alt="PRODUCT" width={100} height={100} />
                    </Link>
                    <div className="size-215 flex-col-t p-t-8">
                      <Link href={{ pathname: '/blog/'+latestBlogsApi[0] ? latestBlogsApi[0].slug : '', query: { id: latestBlogsApi[0] ? latestBlogsApi[0].id : '' } }} className="stext-116 cl8 hov-cl1 trans-04">
                        {latestBlogsApi[0] ? latestBlogsApi[0].title.rendered : ''}
                      </Link>
                      <span className="stext-116 cl6 p-t-20">
                        {latestBlogsApi[0] ? latestBlogsApi[0].date : ''}
                      </span>
                    </div>
                  </li>
                  <li className="flex-w flex-t p-b-30">
                    <Link href={{ pathname: '/blog/'+latestBlogsApi[1] ? latestBlogsApi[1].slug : '', query: { id: latestBlogsApi[1] ? latestBlogsApi[1].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                      <Image className='latest-blogs' src={latestBlogsApi[1] ? latestBlogsApi[1].featured_media_src_url : ''} alt="PRODUCT" width={100} height={100} />
                    </Link>
                    <div className="size-215 flex-col-t p-t-8">
                      <Link href={{ pathname: '/blog/'+latestBlogsApi[1] ? latestBlogsApi[1].slug : '', query: { id: latestBlogsApi[1] ? latestBlogsApi[1].id : '' } }} className="stext-116 cl8 hov-cl1 trans-04">
                        {latestBlogsApi[1] ? latestBlogsApi[1].title.rendered : ''}
                      </Link>
                      <span className="stext-116 cl6 p-t-20">
                        {latestBlogsApi[1] ? latestBlogsApi[1].date : ''}
                      </span>
                    </div>
                  </li>
                  <li className="flex-w flex-t p-b-30">
                    <Link href={{ pathname: '/blog/'+latestBlogsApi[2] ? latestBlogsApi[2].slug : '', query: { id: latestBlogsApi[2] ? latestBlogsApi[2].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                      <Image className='latest-blogs' src={latestBlogsApi[2] ? latestBlogsApi[2].featured_media_src_url : ''} alt="PRODUCT" width={100} height={100}/>
                    </Link>
                    <div className="size-215 flex-col-t p-t-8">
                      <Link href={{ pathname: '/blog/'+latestBlogsApi[2] ? latestBlogsApi[2].slug : '', query: { id: latestBlogsApi[2] ? latestBlogsApi[2].id : '' } }} className="stext-116 cl8 hov-cl1 trans-04">
                        {latestBlogsApi[2] ? latestBlogsApi[2].title.rendered : ''}
                      </Link>
                      <span className="stext-116 cl6 p-t-20">
                        {latestBlogsApi[2] ? latestBlogsApi[2].date : ''}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleBlog
