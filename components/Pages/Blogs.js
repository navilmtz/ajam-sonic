'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr';
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import ApiDataNotFound from "../ApiDataNotFound";

const fetcher = async (url) => await Api.getApi(url);

const Blogs = () => {

    const { data: blogsApi, error: blogsApiError } = useSWR('/wp/v2/posts', fetcher);

    if (blogsApiError) return <ApiDataNotFound/>;
    if (!blogsApi) return <div><LoaderAnimation/></div>;

  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
        <div className="container">
          <div className="p-b-66">
            <h3 className="ltext-105 p-t-50 cl5 txt-center respon1">
              News & Events
            </h3>
          </div>
          <div className="row">
            {blogsApi.map((blog)=>(
              <div className="col-sm-6 col-md-4 p-b-40" key={blog.id}>
                <div className="blog-item">
                  <div className="hov-img0">
                    <Link href={{ pathname: '/blog/'+blog.slug, query: { id: blog.id } }}>
                      <Image className='blog-image' src={blog.featured_media_src_url} alt="IMG-BLOG" width={1000} height={50} />
                    </Link>
                  </div>
                  <div className="p-t-15">
                    <div className="stext-107 flex-w p-b-14">
                      <span className="m-r-3">
                        <span className="cl4 m-r-3">
                          Date :
                        </span>
                        <span className="cl5 m-r-3">
                          {blog.date}
                        </span>
                      </span>
                    </div>
                    <h4 className="p-b-12">
                      <Link href={{ pathname: '/blog/'+blog.slug, query: { id: blog.id } }} className="mtext-101 cl2 hov-cl1 trans-04">
                        {blog.title.rendered}
                      </Link>
                    </h4>
                    <span className="stext-108 cl6">
                      <div dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}/>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default Blogs
