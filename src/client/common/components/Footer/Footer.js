import { currentYear } from '../Date/Date';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer__container">
                <a href="https://www.linkedin.com/in/kylegallard/" target="_blank" rel='noreferrer'><i className="fab fa-linkedin-in fa-lg footer__logo"></i></a>
                <a href="https://github.com/KG1414" target="_blank" rel='noreferrer'><i className="fab fa-github fa-lg footer__logo"></i></a>
                <p className="copyright">Kyle Gallard - {currentYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;