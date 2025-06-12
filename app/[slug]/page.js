import ProductCategories from "@/components/Categories/ProductCategories";
import About from "@/components/Pages/About";
import Blogs from "@/components/Pages/Blogs";
import Contact from "@/components/Pages/Contact";
import Services from "@/components/Pages/Services";
import Styles from "@/components/Pages/Styles";
import WhyAjamsonic from "@/components/Pages/WhyAjamsonic";
import Documents from "@/components/Pages/Documents";

const page = ({ params }) => {
const pathname = params.slug;

  if (pathname == 'about') { 
    return (
      <>
        <About/>
      </>
    );
  }
  else if (pathname == 'services') { 
    return (
      <>
        <Services/>
      </>
    );
  }
  else if (pathname == 'blogs') { 
    return (
      <>
        <Blogs/>
      </>
    );
  }
  else if (pathname == 'why-ajamsonic') { 
    return (
      <>
        <WhyAjamsonic/>
      </>
    );
  }
  else if (pathname == 'contact') { 
    return (
      <>
        <Contact/>
      </>
    );
  }
  else if (pathname == 'products') { 
    return (
      <>
        <ProductCategories/>
      </>
    );
  }
  else if (pathname == 'styles') { 
    return (
      <>
        <Styles/>
      </>
    );
  }
  else if (pathname == 'documents') { 
    return (
      <>
        <Documents/>
      </>
    );
  }
}

export default page
