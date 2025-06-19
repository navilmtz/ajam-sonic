'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';



const Header = () => {
    const pathname = usePathname();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showSubMobileMenu, setSubShowMobileMenu] = useState(false);
    const [isMobile, setIsMobile] = useState();
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if(mobileMenuRef){
            if (showMobileMenu) {
                mobileMenuRef.current.style.display = 'block';
            } else {
                mobileMenuRef.current.style.display = 'none';
            }
            if (window.innerWidth > 480) {
                setShowMobileMenu(false);
            }
        }
    }, [showMobileMenu]);

    const handleResize = () => {
        if (window.innerWidth > 480) {
            const menu = mobileMenuRef.current;
            menu.style.display = 'none'; // Hide menu on larger screens
            setIsMobile(false); // Update mobile state to false for large screens
        } else {
            setIsMobile(true); // Show button for mobile view
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50);
      });
    }, []);

    function handleMobile(){
        setTimeout(() => {
            setShowMobileMenu(false);
        }, 100);
        
    }

    return (
        
        <header className="header-v3">
     
            {/* Header desktop */}
            <div className="container-menu-desktop ">
            {/* Topbar  add-top-bar by Deepak*/}
			<div className="top-bar">
				<div className="content-topbar flex-sb-m h-full container-fluid">
					<div className="right-top-bar flex-w h-full">
						 {/* Icon header */}
                         <div className="wrap-icon-header flex-w flex-r-m h-full">
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.facebook.com/KetronUSA/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 " >
                                        {/* <i className="fa fa-facebook"></i> */}
                                        <Image src="/images/icons/fb.png" alt="fb" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.tiktok.com/@ketronusa" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/tiktok.png" alt="tiktok" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5 ">
                                <Link href="https://www.youtube.com/@AjamSonic" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/youtube.png" alt="youtube" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.instagram.com/ajamsonic/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/insta.png" alt="insta" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                        </div>
					</div>
                    <div className="left-top-bar">
                        <img src="https://flagcdn.com/us.svg" alt="US Flag" className="flag"/>
                        <span className="white-text">
                            10 Willow Grove Mill Dr, Suite 101 Middletown, DE 19709
                        </span>
					</div>
				</div>
			</div>
             {/* Topbar  add-top-bar by Deepak*/}
                <div className={`wrap-menu-desktop ${scroll ? "fix-menu-desktop m-t-0" : "m-t-40"}`}>
                    <nav className="limiter-menu-desktop p-l-10">
                        {/* Logo desktop */}
                        <Link href="/" className="logo m-l-30">
                            <Image src="/images/KAMLogo.png" alt="IMG-LOGO" width={180} height={65} priority/>
                        </Link>
                        {/* Menu desktop */}
                        <ul className="main-menu m-auto">
                            <li className={'/' == pathname ? 'active-menu' : ''}>
                                <Link href="/">Home</Link>
                            </li>
                            <li className={'/why-ajamsonic' == pathname ? 'active-menu' : ''}>
                                <Link href="/why-ajamsonic">Why AjamSonic</Link>
                            </li>
                            <li className={'/products' == pathname ? 'active-menu' : ''}>
                                <Link href="/products">Musical Instruments </Link>
                            </li>
                            <li className={'/documents' == pathname ? 'active-menu' : ''}>
                                <Link href="/documents">Documents</Link>
                            </li>
                            <li className={'/services' == pathname ? 'active-menu' : ''}>
                                <Link href="/services">Services</Link>
                            </li>
                            <li className={'/styles' == pathname ? 'active-menu' : ''}>
                                <Link href="/styles">Styles</Link>
                            </li>
                            <li className={'/blogs' == pathname ? 'active-menu' : ''}>
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li className={'/about' == pathname ? 'active-menu' : ''}>
                                <Link href="/about">About</Link>
                            </li>
                            <li className={'/contact' == pathname ? 'active-menu' : ''}>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                        <div className="left-top-bar m-r-30">
                            <i className="fa fa-phone icon-phone"/>
                            <span className="phone-number">
                               <a href="tel:(267) 323-5005" style={{ color: '#000', textDecoration: 'none' }}> (267) 323-5005</a>
                            </span>
					    </div>
                    </nav>
                    <div>
                        
                    </div>
                </div>
            </div>
            {/* Header Mobile */}
          

            <div className="wrap-header-mobile">
                <div className="logo-mobile">
                    <Link href="/">
                        <Image src="/images/logo.png" alt="IMG-LOGO"  width={150} height={55} priority/>
                    </Link>
                </div>
                <div className="wrap-icon-header flex-w flex-r-m h-full m-r-15">
                    <div className="flex-c-m h-full p-lr-10 bor5">
                        <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* Menu Mobile */}
            
            <div className="menu-mobile" ref={mobileMenuRef}>

                <ul className="main-menu-m">
                    <li className={'/' == pathname ? 'active-menu' : ''}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={'/why-ajamsonic' == pathname ? 'active-menu' : ''}>
                        <Link href="/why-ajamsonic" onClick={() => handleMobile() }>Why AjamSonic</Link>
                    </li>
                    <li className={'/products' == pathname ? 'active-menu' : ''}>
                        <Link href="/products" onClick={() => handleMobile()}>Products</Link>
                    </li>
                    <li className={'/documents' == pathname ? 'active-menu' : ''}>
                        <Link href="/documents" onClick={() => handleMobile()}>Documents</Link>
                    </li>
                    <li className={'/services' == pathname ? 'active-menu' : ''}>
                        <Link href="/services" onClick={() => handleMobile()}>Services</Link>
                    </li>
                    <li className={'/styles' == pathname ? 'active-menu' : ''}>
                        <Link href="/styles" onClick={() => handleMobile()}>Styles</Link>
                    </li>
                    <li className={'/blogs' == pathname ? 'active-menu' : ''}>
                        <Link href="/blogs" onClick={() => handleMobile()}>Blogs</Link>
                    </li>
                    <li className={'/about' == pathname ? 'active-menu' : ''}>
                        <Link href="/about" onClick={() => handleMobile()}>About</Link>
                    </li>
                    <li className={'/contact' == pathname ? 'active-menu' : ''}>
                        <Link href="/contact" onClick={() => handleMobile()}>Contact</Link>
                    </li>
                    <ul className="topbar-mobile m-b-0">
                    
                    <li>
                        <div className="right-top-bar flex-w h-full">
                        {/* Icon header */}
                        <div className="wrap-icon-header flex-w flex-l-m h-full">
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.facebook.com/KetronUSA/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                        {/* <i className="fa fa-facebook"></i> */}
                                        <Image src="/images/icons/fb.png" alt="fb" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.tiktok.com/@ketronusa" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/tiktok.png" alt="tiktok" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5 ">
                                <Link href="https://www.youtube.com/@AjamSonic" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/youtube.png" alt="youtube" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-c-m h-full  p-t-5">
                                <Link href="https://www.instagram.com/ajamsonic/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/insta.png" alt="insta" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </li>
                </ul>
                </ul>
            </div>
        </header>
    );
}

export default Header
