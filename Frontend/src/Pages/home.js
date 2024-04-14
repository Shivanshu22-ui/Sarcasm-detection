import '../App.css';
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer';
import UploadForm from '../Components/UploadInput/uploadForm';
import './home.css'

function Home() {
  return (
    <div className="Home">
      <Navbar/>
        <div className='uploaadForm' >
        <UploadForm/>
        </div>
      <Footer/>
    </div>
  );
}

export default Home;