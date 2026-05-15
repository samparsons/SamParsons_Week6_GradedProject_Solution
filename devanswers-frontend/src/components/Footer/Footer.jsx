import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper" role="contentinfo">
      <p className="footer-text mb-0">&copy; {currentYear} DevAnswers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;