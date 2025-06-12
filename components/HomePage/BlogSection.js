import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogSection = ({blogsApi}) => {
  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">
            News & Events
          </h3>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4 p-b-40">
            <div className="blog-item">
              <div className="hov-img0">
                <Link href={{ pathname: `/blog/${blogsApi[0] ? blogsApi[0].slug : ''}`, query: { id: blogsApi[0] ? blogsApi[0].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                  <Image className='blog-image' src={blogsApi[0] ? blogsApi[0].featured_media_src_url : ''} alt="PRODUCT" width={1000} height={1000}/>
                </Link>
              </div>
              <div className="p-t-15">
                <h4 className="p-b-12">
                  <Link href={{ pathname: `/blog/${blogsApi[0] ? blogsApi[0].slug : ''}`, query: { id: blogsApi[0] ? blogsApi[0].id : '' } }} className="mtext-101 cl2 hov-cl1 trans-04 hover:no-underline">
                    {blogsApi[0] ? blogsApi[0].title.rendered : ''}
                  </Link>
                </h4>
                <span className="stext-108 cl6">
                  <div dangerouslySetInnerHTML={{ __html:blogsApi[0] ? blogsApi[0].excerpt.rendered : ''}}/>
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 p-b-40">
            <div className="blog-item">
              <div className="hov-img0">
                <Link href={{ pathname: `/blog/${blogsApi[1] ? blogsApi[1].slug : ''}`, query: { id: blogsApi[1] ? blogsApi[1].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                  <Image className='blog-image' src={blogsApi[1] ? blogsApi[1].featured_media_src_url : ''} alt="PRODUCT" width={1000} height={1000}/>
                </Link>
              </div>
              <div className="p-t-15">
                <h4 className="p-b-12">
                  <Link href={{ pathname: `/blog/${blogsApi[1] ? blogsApi[1].slug : ''}`, query: { id: blogsApi[1] ? blogsApi[1].id : '' } }} className="mtext-101 cl2 hov-cl1 trans-04 hover:no-underline">
                    {blogsApi[1] ? blogsApi[1].title.rendered : ''}
                  </Link>
                </h4>
                <span className="stext-108 cl6">
                  <div dangerouslySetInnerHTML={{ __html:blogsApi[1] ? blogsApi[1].excerpt.rendered : ''}}/>
                </span>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 p-b-40">
            <div className="blog-item">
              <div className="hov-img0">
                <Link href={{ pathname: `/blog/${blogsApi[2] ? blogsApi[2].slug : ''}`, query: { id: blogsApi[2] ? blogsApi[2].id : '' } }} className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                  <Image className='blog-image' src={blogsApi[2] ? blogsApi[2].featured_media_src_url : ''} alt="PRODUCT" width={1000} height={1000}/>
                </Link>
              </div>
              <div className="p-t-15">
                <h4 className="p-b-12">
                  <Link href={{ pathname: `/blog/${blogsApi[2] ? blogsApi[2].slug : ''}`, query: { id: blogsApi[2] ? blogsApi[2].id : '' } }} className="mtext-101 cl2 hov-cl1 trans-04 hover:no-underline">
                    {blogsApi[2] ? blogsApi[2].title.rendered : ''}
                  </Link>
                </h4>
                <span className="stext-108 cl6">
                  <div dangerouslySetInnerHTML={{ __html:blogsApi[2] ? blogsApi[2].excerpt.rendered : ''}}/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
