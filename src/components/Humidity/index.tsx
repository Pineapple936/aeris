import { useAppSelector } from "@/store"

export default function Humidity() {
    const humidity = useAppSelector((state) => state.weather.now.humidity);

    return (
        <section className="weatherCell">
            <header className="title">
                <p><i className='bx bx-water' />ВЛАЖНОСТЬ</p>
            </header>
            <div className="content">
                <h2>{humidity.value}%</h2>
                <p className="description">Точка росы: {humidity.dew_point}°</p>
            </div>
        </section>
    )
}