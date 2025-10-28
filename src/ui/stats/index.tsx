// import StatsCard, { TStats } from "./stats-card";

// interface Props {
//   data: TStats[];
//   grid?: any;
// }
// const Stats = ({ data, grid=4 }: Props) => {
//   return (
//     <section className={`w-full grid grid-cols-1 lg:grid-cols-${grid} gap-4`}>
//       {data.map((item) => (
//         <StatsCard key={item.title} data={item} />
//       ))}
//     </section>
//   );
// };

// export default Stats;


import StatsCard, { TStats } from "./stats-card";

interface Props {
  data: TStats[];
}

const Stats = ({ data }: Props) => {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <StatsCard key={item.title} data={item} />
      ))}
    </section>
  );
};

export default Stats;
