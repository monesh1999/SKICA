
import Menubar from "../components/Menubar";
import Footer from "../components/footer";
import VideoGalleryCards from "../components/Home/VideoGalleryCards";




const Home =()=>{
    return(
        <div className="flex flex-col items-center justify-content-center min-vh-100">

            <Menubar/>
            
            
            <VideoGalleryCards/>
            <Footer/>
        </div>
        
    )
}

export default Home;