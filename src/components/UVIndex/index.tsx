import { useAppSelector } from "@/store";
import style from "./index.module.scss";

export default function UVIndex() {
  const uvi = useAppSelector((state) => state.weather.now.uvi);
  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i className="bx bxs-sun" /> УФ-ИНДЕКС
        </p>
      </header>
      <div className="content">
        <h3>{uvi.indicator}</h3>
        <h3>{uvi.category}</h3>
        <div
          className={style.progressBar}
          style={
            { "--progress": uvi.indicator } as React.CSSProperties & {
              "--progress": number;
            }
          }
        />
        <p className="description">{getFooterText(uvi.category)}</p>
      </div>
    </article>
  );
}

function getFooterText(category: string): string {
  const hour = new Date().getHours();
  if (hour < 9) return "Защищайтесь от солнца с 09:00 до 16:00";
  else if (hour < 16 && category != "Низкий")
    return "Защищайтесь от солнца до 16:00";
  else return "Останется низким до конца дня";
}
