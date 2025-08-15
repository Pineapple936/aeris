import { useAppSelector } from "@/store"
import style from "./index.module.scss"

export default function Wind() {
    const wind = useAppSelector(state => state.weather.now.wind);

    return (
        <article className="weatherCell">
            <header className="title">
                <p><i className='bx bx-wind' />ВЕТЕР</p>
            </header>
            <div className="content">
                <div style={{"display": "flex", "gap": "20px"}}>
                    <div className={style.infoWrapper}>
                        <p className="description"><span>Ветер</span><span className="opacityText">{wind.speed} м/с</span></p>
                        <hr />
                        <p className="description"><span>Порывы ветра</span><span className="opacityText">{wind.gust} м/с</span></p>
                        <hr />
                        <p className="description"><span>Направление</span><span className="opacityText">{wind.deg}°</span></p>
                    </div>
                    <div className={style.wrapperCompass}>
                        <div className={style.compass}>
                            {[...Array(36)].map((_, i) => <div className={style.dash} style={{"transform": `rotate(${i * 10}deg)`}} />)}
                            <span className={style.duration} style={{"top": "0", "left": "50%", "transform": "translate(-50%, -100%)"}}>с</span>
                            <span className={style.duration} style={{"top": "50%", "right": "0", "transform": "translate(200%, -50%)"}}>в</span>
                            <span className={style.duration} style={{"bottom": "0", "left": "50%", "transform": "translate(-50%, 100%)"}}>ю</span>
                            <span className={style.duration} style={{"top": "50%", "left": "0", "transform": "translate(-200%, -50%)"}}>з</span>
                            <div className={style.arrow} style={{"transform": `rotate(${wind.deg}deg)`}} />
                            <div className={`${style.blockInfo} colorCell`}>
                                <p style={{"fontSize": "1.1rem", "fontWeight": "600"}}>{wind.speed}<br />м/с</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}