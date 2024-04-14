import './Navbar.css';
import logo_dark from '../../StaticAssets/logo_dark.png'

function Navbar() {
  return (
    <div className="Navbar">
      <a className='Navbar_link navbar_logo' href='/'>
        <img src={logo_dark} alt="My Image" />
      </a>

      <a className='Navbar_link' href='#'>Home</a>
      <a className='Navbar_link' href='/dashboard'>Dashboard</a>
      <a className='Navbar_link' href='#'>Contact</a>
    </div>
  );
}

export default Navbar;