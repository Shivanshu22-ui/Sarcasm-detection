import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar/Navbar'
import Footer from './Components/Footer/Footer';
import UploadForm from './Components/UploadInput/uploadForm';
import Home from './Pages/home'
import Dashboard from './Pages/dashboard';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
