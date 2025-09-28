import { Link, useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/homepage");
  };

  return (
    <nav className={headerStyles.navbar}>
      <ul className={headerStyles.navLinks}>
        <li><Link className={headerStyles.link} id={headerStyles.logo} to="/">CodeMate</Link></li>
        <li><Link className={headerStyles.link} to="/search">Learn</Link></li>
        <li><Link className={headerStyles.link} to="/practice">Practice</Link></li>
        <li><Link className={headerStyles.link} to="/quiz">Quiz</Link></li>
      </ul>

      {user ? (
        <div className={headerStyles.navButtons}>
          <Link className={headerStyles.buttonLink} to="/dashboard">
            <button className={headerStyles.button}>Dashboard</button>
          </Link>
          <button onClick={handleLogout} className={headerStyles.button}>Logout</button>
        </div>
      ) : (
        <div className={headerStyles.navButtons}>
          <Link className={headerStyles.buttonLink} to="/signup">
            <button className={headerStyles.button}>Signup</button>
          </Link>
          <Link className={headerStyles.buttonLink} to="/login">
            <button className={headerStyles.button}>Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
