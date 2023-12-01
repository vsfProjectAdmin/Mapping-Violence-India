import { Link } from 'react-router-dom';
import logo from '../images/LOGO.png';

function Nav() {
  return (
    <div className="bg-blue flex justify-between items-center bg-main">
      <div className="flex items-center">
        <img src={logo} alt="company logo" className="h-24 w-24" />
      </div>
      <div className="flex justify-between items-center space-x-4">
        <Link to="/" className="text-white px-4 py-4 rounded text-lg no-underline hover:text-yellow-500 transition duration-300">
          Home
        </Link>
        <Link to="/method" className="text-white px-4 py-4 rounded text-lg no-underline hover:text-yellow-500 transition duration-300">
          Method
        </Link>
        <Link to="/report-incident" className="text-white px-4 py-4 rounded text-lg no-underline hover:text-yellow-500 transition duration-300">
          Report An Incident
        </Link>
        <Link to="/contact-us" className="text-white px-4 py-4 rounded text-lg no-underline hover:text-yellow-500 transition duration-300">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default Nav;
