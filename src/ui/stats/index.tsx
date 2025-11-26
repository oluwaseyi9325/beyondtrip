import StatsCard, { TStats } from "./stats-card";

interface Props {
  data: TStats[];
  grid?: number;
}

const Stats = ({ data, grid = 4 }: Props) => {
  const gridClassMap: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  return (
    <section
      className={`w-full grid  grid-cols-1 lg:grid-cols-2  ${
        gridClassMap[grid] || "xl:grid-cols-4"
      } gap-4`}
    >
        {data.map((item) => (
          <StatsCard key={item.title} data={item} />
        ))}
    </section>
  );
};

export default Stats;

