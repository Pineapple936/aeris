import style from "./index.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/Pineapple936"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pineapple936
        </a>
      </p>
    </footer>
  );
}
