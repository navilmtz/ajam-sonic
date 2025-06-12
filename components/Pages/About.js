'use client'
import useSWR from 'swr';
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import ApiDataNotFound from "../ApiDataNotFound";
import Image from 'next/image';

const fetcher = async (url) => await Api.getApi(url);
const About = () => {

    const { data: aboutApi, error: aboutApiError } = useSWR('/wp/v2/pages/15/?_fields=acf', fetcher);

    if (aboutApiError) return <ApiDataNotFound/>;
    if (!aboutApi) return <div><LoaderAnimation/></div>;

    return (
        <>
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: 'url("images/about-bg-01.jpg")' }}>
                <h2 className="ltext-105 p-t-50 cl0 txt-center">{aboutApi.acf.page_title}</h2>
            </section>
            {/* Content page */}
            <section className="bg0 p-t-75 p-b-120">
                <div className="container">
                    <div className="row p-b-100">
                        <div className="col-md-12 col-lg-12">
                            <div className="p-t-7 p-r-15-lg p-r-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">{aboutApi.acf.first_heading}</h3>
                                <p className="stext-113 cl6 p-b-26">
                                    {aboutApi.acf.first_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                    {aboutApi.acf.about_sections.map((aboutSection)=>(
                        <div className="row p-b-100" key={aboutSection.section_title}>
                            <div className="col-md-7 col-lg-8">
                                <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                                    <h3 className="mtext-111 cl2 p-b-16">{aboutSection.section_title}</h3>
                                    <p className="stext-113 cl6 p-b-26">
                                        <span dangerouslySetInnerHTML={{__html:aboutSection.section_description}} /> 
                                    </p>
                                </div>
                            </div>
                            <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                                <div className="how-bor1 ">
                                    <div className="hov-img0">
                                        <Image width={1000} height={1000} src={aboutSection.section_image} alt="IMG" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default About
