import { Bar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { Sheet } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { getAvgTimeTaken } from "@/api/charts";

const TimeTaken = () => {
  const [chartData, setChartData] = useState({ data: [] });
  const navigate = useNavigate();

  useEffect(() => {
    getAvgTimeTaken().then((data) => {
      const { results } = data;
      setChartData({
        ...chartData,
        data: results.map((e) => ({ ...e, avg: parseInt(e.avg) })),
      });
    });
  }, []);

  return (
    <Sheet sx={{ backgroundColor: "white" }}>
      <Bar
        onClick={(e) => {
          const { data } = e;
          const { topic_id } = data;
          navigate(`/chart-meta-data/${topic_id}`);
        }}
        width={800}
        height={800}
        margin={{ top: 60, right: 80, bottom: 60, left: 100 }}
        data={chartData?.data}
        indexBy={"topic_name"}
        keys={["avg_time_taken"]}
        padding={0.2}
        labelTextColor={"inherit:darker(1.4)"}
        labelSkipWidth={16}
        labelSkipHeight={16}
        groupMode="grouped"
        layout="horizontal"
      />
    </Sheet>
  );
};

export default TimeTaken;
