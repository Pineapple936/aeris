import { ReactNode } from "react";
import style from "./index.module.scss";

export default function WeatherCell({
    iconClass,
    title,
    mainInfo,
    description,
    flex,
    children,
}: {
    iconClass: string;
    title: string;
    mainInfo?: string;
    description?: string | boolean;
    flex?: "row";
    children?: ReactNode;
}) {
    return (
        <article className={style.cell}>
            <header className={style["cell__title"]}>
                <p>
                    <i className={iconClass} />
                    {title}
                </p>
            </header>
            <div className={`${style["cell__body"]} ${flex && style[`cell__body--${flex}`]}`}>
                {mainInfo && <h2>{mainInfo}</h2>}
                {children}
                {description && <p className={style["cell__description"]}>{description}</p>}
            </div>
        </article>
    );
}
