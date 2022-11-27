import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Navya's Version</h1>
      <div className="links">
        <Link to="/">New</Link>
        <Link to="/search" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Search</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;