import { useAppSelector } from "@/store";

export default function Visibility() {
  const visibility = useAppSelector((state) => state.weather.now.visibility);

  return (
    <article className="weatherCell">
      <header className="title">
        <p>
          <i
            className={`bx bx-${visibility.value < 2 ? "hide" : visibility.value < 4 ? "low-vision" : "show-alt"}`}
          />{" "}
          ВИДИМОСТЬ
        </p>
      </header>
      <div className="content">
        <h1>
          {visibility.value == 10 ? visibility.value + "+" : visibility.value}{" "}
          км
        </h1>
        <p className="description">{visibility.category} видимость</p>
      </div>
    </article>
  );
}
