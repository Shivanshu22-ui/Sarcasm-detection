import './Footer.css';
import logo from '../../StaticAssets/logo.png'

function Footer() {
  return (
    // <div className="footer">
    //     <div className="footer-column">
    //     <img src={logo} alt="Logo" className="logo" width="30%" />
    //     </div>

    //     {/*  */}
    //     <div className="footer-column">
    //     <ul>
    //         <li><a href="/">Home</a></li>
    //         <li><a href="/about">About</a></li>
    //         <li><a href="/contact">Contact</a></li>
    //     </ul>
    //     </div>

    //     {/*  */}
    //     <div className="footer-column">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ac nisl quis varius. Nam hendrerit dui sed ante rutrum aliquet.</p>
    //         <div className="social-media-icons">
    //             <a href="#"><i className="fab fa-facebook-f"></i></a>
    //             <a href="#"><i className="fab fa-twitter"></i></a>
    //             <a href="#"><i className="fab fa-instagram"></i></a>
    //         </div>
    //     </div>
    // </div>

    <div className='footer'>
      <div className='logo'>
      <img src={logo} alt="Logo" className="logoImg" width="10%" />
      <div className=''>

      </div>
      </div>
      <div className='linkContainer'>
        <div className='linkSubContainer'>
          <p className='linkHeader'>Product</p>
          <a className='link'>Updates</a>
          <a className='link'>Security</a>
          <a className='link'>Twitter Intergration</a>
        </div>
        <div className='linkSubContainer'>
        <p className='linkHeader'>Company</p>
          <a className='link'>About</a>
          <a className='link'>Blog</a>
          <a className='link'>Read More</a>
        </div>
        <div className='linkSubContainer'>
        <p className='linkHeader'>Industries</p>
          <a className='link'>Startups</a>
          <a className='link'>Commerical Use</a>
          <a className='link'>Academic Research</a>
        </div>
        <div className='linkSubContainer'>
        <p className='linkHeader'>Help</p>
          <a className='link'>Talk to support</a>
          <a className='link'>Support Docs</a>
          <a className='link'>API Docs</a>
          <a className='link'>System Status</a>
        </div>

        <div className='signupContainer'>
        <p className='linkHeader'>Try DataCleaner for Free</p>
          <div className='signupFieldMain'>
            <input type={"text"} placeholder={"Enter Your Email"}/>
            <button>Get Started</button>
          </div>
        </div>

      </div>
      <hr className='divider' width={"100%"}/>
      <div className='policyMain'>
        <p className='headerMini copyright'>Data Cleaner | Copyright 2023</p>
        <p className='headerMini policy'>Terms & Conditions</p>
        <p className='headerMini '>Privacy Policy</p>
      </div>

    </div>

  );
}

export default Footer;