import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    day: "Monday",
    male: 0.4,
    female: 0.52,
  },
  {
    day: "Tuesday",
    male: 0.08,
    female: 0.1,
  },
  {
    day: "Wednesday",
    male: 0.8,
    female: 0.4,
  },
  {
    day: "Thursday",
    male: 0.2,
    female: 0.2,
  },
  {
    day: "Friday",
    male: 0.4,
    female: 0.6,
  },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-gray-700 font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-2xl">
      {/* Header */}
          <div className="flex items-center justify-between mb-5">
          <p className="header">PAYMENT HISTORY</p>
        <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
          <span className="text-gray-600 font-medium text-sm">Cohort 03</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          <span className="text-gray-600 font-medium">Male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-300"></div>
          <span className="text-gray-600 font-medium">Female</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: -10,
                bottom: 5,
              }}
              barCategoryGap="20%"
            >
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 14 }} />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
              <Bar dataKey="male" fill="#8b5cf6" radius={[2, 2, 0, 0]} maxBarSize={60} />
              <Bar dataKey="female" fill="#c4b5fd" radius={[2, 2, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
