import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Savranin Denis</p>
          <p>
            Contact us:
            <a href="mailto:savranindenisv@gmail.com">
              &nbsp;savranindenisv@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
