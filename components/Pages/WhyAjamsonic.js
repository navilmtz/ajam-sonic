'use client'
import useSWR from 'swr';
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import ApiDataNotFound from "../ApiDataNotFound";
import Image from 'next/image';

const fetcher = async (url) => await Api.getApi(url);

const WhyAjamsonic = () => {

  const { data: whyApi, error: whyApiError } = useSWR('/wp/v2/pages/23/?_fields=acf', fetcher);

  if (whyApiError) return <ApiDataNotFound/>;
  if (!whyApi) return <div><LoaderAnimation/></div>;

  return (
    <div>
        <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: `url(${whyApi.acf.first_section.banner_image})`}}>
          <h2 className="ltext-105 p-t-50 cl0 txt-center">
            {whyApi.acf.first_section.page_title}
          </h2>
        </section>
        <div className="mt-4">
          <Image className='mx-auto' src="/images/marquee.webp" width={1000} height={1000} alt=''/>
        </div>
        <section className="bg0 p-t-75 p-b-120">
          <div className="container">
            <div className="row p-b-100">
              <div className="col-md-12 col-lg-12">
                <div className="p-t-7 p-r-15-lg p-r-0-md">
                  <span dangerouslySetInnerHTML={{__html:whyApi.acf.second_section.heading_with_description}} />
                </div>
              </div>
            </div>
            <div className="row p-b-100">
              <div className="col-md-7 col-lg-8">
                <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                  <span dangerouslySetInnerHTML={{__html:whyApi.acf.third_section.left_content}} />
                </div>
              </div>
              <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                <div className="how-bor1">
                  <div className="hov-img0">
                    <Image src={whyApi.acf.third_section.image_1} width={1000} height={1000} alt="IMG" />
                  </div>
                </div>
                <div className="how-bor1 m-t-200">
                  <div className="hov-img0">
                    <Image src={whyApi.acf.third_section.image_2} width={1000} height={1000} alt="IMG" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default WhyAjamsonic
