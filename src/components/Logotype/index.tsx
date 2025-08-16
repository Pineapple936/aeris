import Image from "next/image";
import style from "./index.module.scss";

export default function Logotype() {
  return (
    <section className={style.logotypeWebsite}>
      <article className={style.image}>
        <Image src="/iconWebsite.jpg" alt="логотип сайта Aeris" fill />
      </article>
    </section>
  );
}
