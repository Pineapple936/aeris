import { useAppSelector } from "@/store";

export default function Clouds() {
  const clouds = useAppSelector((state) => state.weather.now.clouds);
  const description = useAppSelector((state) => state.weather.now.description);

  return (
    <article className="weatherCell">
      <div className="title">
        <p>
          <i className="bx bxs-cloud" />
          ОБЛАКА
        </p>
      </div>
      <div className="content">
        <h2>{clouds}%</h2>
        <p className="description">{description}</p>
      </div>
    </article>
  );
}
