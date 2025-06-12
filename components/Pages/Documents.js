'use client'
import useSWR from 'swr';
import LoaderAnimation from '../LoaderAnimation';
import Api from '@/lib/api';
import ApiDataNotFound from "../ApiDataNotFound";
import Image from 'next/image';
import Link from 'next/link';

const fetcher = async (url) => await Api.getApi(url);
const Documents = () => {

    const { data: documentsApi, error: documentsApiError } = useSWR('/wp/v2/pages/303/?_fields=acf', fetcher);

    if (documentsApiError) return <ApiDataNotFound/>;
    if (!documentsApi) return <div><LoaderAnimation/></div>;

    return (
        <>
            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: `url(${documentsApi.acf.first_section.banner_image})` }}>
                <h2 className="ltext-105 p-t-50 cl0 txt-center">{documentsApi.acf.first_section.page_title}</h2>
            </section>
            <div className="Pdf-category pb-5">
                <div className="container">
                    <div className="pt-5">
                        <span dangerouslySetInnerHTML={{__html:documentsApi.acf.second_section.heading_with_description}} />
                        <hr />
                        <div className="row">
                            {documentsApi.acf.third_section.map((item)=>(
                                <div className="col-md-3 Col-sm-4 col-6" key={item.index}>
                                    <div className="investor-box">
                                        <h2>{item.heading}</h2>
                                        <div className="pdf-icon">
                                            <Image src="/images/pdf.png" width={100} height={100} alt='pdf' />
                                        </div>
                                        <h6 className='my-3' style={{'fontSize': '1rem'}}>{item.short_desc}</h6>
                                        <div className="flip-view">
                                            <Link href={item.pdf_link} target='_blank'>
                                                Download <i className="fa fa-download" aria-hidden="true" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Documents
