import Image from "next/image";
import style from "./index.module.scss";

export default function Logotype() {
  return (
    <section className={style.logotypeWebsite}>
      <div className={style.image}>
        <Image src="/iconWebsite.jpg" alt="логотип сайта Aeris" fill />
      </div>
    </section>
  );
}
