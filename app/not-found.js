import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'

const NotFound = async () => {
  return (
  <>
    <Header/>
    <div className='notfound'>
        {/* <h1>404 Error Page Not Found</h1> */}
        <section className="error-container">
            <span className="four"><span className="screen-reader-text">4</span></span>
            <span className="zero"><span className="screen-reader-text">0</span></span>
            <span className="four"><span className="screen-reader-text">4</span></span>
            <div>
                <h1>Page Not Found</h1>
            </div>
        </section>
        <div className="link-container">
          <Link href="/" className="more-link">Home</Link>
        </div>
    </div>
    <Footer/>
  </>
  )
}

export default NotFound