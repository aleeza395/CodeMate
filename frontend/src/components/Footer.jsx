import footerStyles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.section}>
          <h3>CodeToLearn</h3>
          <p>Empowering your coding journey one step at a time.</p>
        </div>

        <div className={footerStyles.section}>
          <h4>Explore</h4>
          <ul>
            <li><Link className={footerStyles.link} to="/search">Learn</Link></li>
            <li><Link className={footerStyles.link} to="/practice">Practice</Link></li>
            <li><Link className={footerStyles.link} to="/quiz">Quiz</Link></li>
            <li><Link className={footerStyles.link} to="/projecthelper">Projects</Link></li>
          </ul>
        </div>
        </div>


      <div className={footerStyles.bottom}>
        <p>&copy; {new Date().getFullYear()} CodeToLearn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
