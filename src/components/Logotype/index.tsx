import Image from "next/image";
import ButtonSwitchLanguage from "../ButtonSwitchLanguage";
import style from "./index.module.scss";

export default function Logotype() {
    return (
        <section className={style.logotypeWebsite}>
            <article className={style.image}>
                <Image src="/favicon.jpg" alt="логотип сайта Aeris" fill priority sizes="100px" />
            </article>
            <ButtonSwitchLanguage />
        </section>
    );
}
