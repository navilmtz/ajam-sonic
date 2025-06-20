import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function ApiDataNotFound() {
    return (
        <>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">500 Internal Server Error!</h1>
                        </div>
                        <div className="contant_box_404">
                            <h3 className="h2">Look like {`you're`} lost</h3>
                            <p>The page you are looking for is not available.. Please Try Again Later!</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}
