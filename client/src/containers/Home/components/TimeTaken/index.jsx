import { Bar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { API } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { Sheet } from "@mui/joy";

const TimeTaken = () => {
  const { isAuthenticated, user } = useAuth();
  const [chartData, setChartData] = useState({ data: [] });

  useEffect(() => {
    if (isAuthenticated) {
      API.get(`/api/avg-time-taken/${user.id}`).then((data) => {
        const { results } = data;
        setChartData({
          ...chartData,
          data: results.map((e) => ({ ...e, avg: parseInt(e.avg) })),
        });
      });
    }
  }, []);

  return (
    <Sheet sx={{ backgroundColor: "white" }}>
      <Bar
        width={800}
        height={800}
        margin={{ top: 60, right: 80, bottom: 60, left: 100 }}
        data={chartData?.data}
        indexBy={"name"}
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
