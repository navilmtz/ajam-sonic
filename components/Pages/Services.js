'use client'
import React from 'react'
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import ApiDataNotFound from "../ApiDataNotFound";
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

const fetcher = async (url) => await Api.getApi(url);

const Services = () => {
  const { data: servicesApi, error: servicesApiError } = useSWR('/wp/v2/pages/19/?_fields=acf', fetcher);

  if (servicesApiError) return <ApiDataNotFound/>;
  if (!servicesApi) return <div><LoaderAnimation/></div>;

  return (
    <div>
        <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: 'url("images/service-bg.jpg")'}}>
          <h2 className="ltext-105 p-t-50 cl0 txt-center">
            {servicesApi.acf.page_title}
          </h2>
        </section>
        <section className="bg0 p-t-75 p-b-120">
          {servicesApi.acf.services_sections.map((section)=>(
            <div className="container" key={section.heading}>
              <div className="row p-b-80">
                <div className="col-md-7 col-lg-8">
                  <div className="p-t-7 p-r-85 p-r-15-lg p-b-30 p-r-0-md">
                    <h3 className="mtext-111 cl2 p-b-16">
                      {section.heading}
                    </h3>
                    <span dangerouslySetInnerHTML={{__html:section.description}}/>
                    <Link href={section.formsite_link} className="w-3/5 flex-c-m stext-101 cl0 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer d-inline-block p-3">{section.formsite_heading}</Link>
                  </div>
                </div>
                <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                  <div className="how-bor1 ">
                    <div className="hov-img0">
                      <Image width={1000} height={1000} src={section.image} alt="IMG" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex place-content-center">
              <Link href="https://www.youtube.com/playlist?list=PL8Ya6B_eNDemSa4o2oX96ua9SyOn4Ebzj" target='_blank'>
                  <button className='px-5 py-3 rounded font-medium text-xl text-white bg1 hov-btn1'>
                      Watch Service Demo
                  </button>
              </Link>
          </div>
        </section>
    </div>
  )
}

export default Services
