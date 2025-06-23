import React from 'react'
import Link from "next/link";
import Image from 'next/image';

const ModuleSection = ({categoryApi}) => {
  return (
    <div className="sec-banner bg0 p-t-80 p-b-30">
        <div className="container">
            <div className="p-b-32">
              <h3 className="ltext-105 cl5 txt-center respon1">
                Musical Instrument Categories
              </h3>
            </div>
            <div className="row">
                {categoryApi
                .filter(category => category.id !== 30)
                .map(category => (
                    <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto" key={category.id}>
                    {/* Block1 */}
                    <div className="block1 wrap-pic-w">
                        <Image
                        width={1000}
                        height={1000}
                        src={category.acf.category_image}
                        alt="IMG-BANNER"
                        />
                        <Link
                        href={{
                            pathname: "/category/" + category.slug,
                            query: { id: category.id },
                        }}
                        className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-30 p-tb-30 trans-03 respon3"
                        >
                        <div className="block1-txt-child1 flex-col-l">
                            <span className="block1-name ltext-102 trans-04 p-b-8">
                                <div style={{fontFamily:'Poppins-Bold'}}  dangerouslySetInnerHTML={{ __html: category.name }} />
                            </span>
                            <span className="block1-info stext-102 trans-04">
                            {category.acf.category_subtitle}
                            </span>
                        </div>
                        <div className="block1-txt-child2 p-b-4 trans-05">
                            <div className="block1-link stext-101 cl0 trans-09">Shop Now</div>
                        </div>
                        </Link>
                    </div>
                    </div>
                ))}


                {/* <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
                    <div className="block1 wrap-pic-w">
                    <Image width={1000} height={1000} src="/images/c6.jpg" alt="IMG-BANNER" />
                    <Link href="https://ajamsonic.com/eclass" target='_blank' className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-30 p-tb-30 trans-03 respon3">
                        <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                            Classes
                        </span>
                        <span className="block1-info stext-102 trans-04">
                            Piano & Guitar Lessons
                        </span>
                        </div>
                        <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                            Shop Now
                        </div>
                        </div>
                    </Link>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default ModuleSection
