import styles from "@/components/Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.footerRight}>
          <ul>
            <li>The Pokémons &copy; 2026</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
