import { Bar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { API } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { Sheet } from "@mui/joy";

const TimeTakenByTopic = () => {
  const { isAuthenticated, user } = useAuth();
  const [chartData, setChartData] = useState({ data: [], keys: [] });

  useEffect(() => {
    if (isAuthenticated) {
      API.get(`/api/failed-proportions/${user.id}`).then((data) => {
        const { results } = data;
        console.log(results);
        setChartData({
          ...chartData,
          data: results.map((e) => ({ ...e, avg: parseInt(e.avg) })),
          keys: results.map((e) => "avg"),
        });
      });
    }
  }, []);

  return (
    <Sheet sx={{ backgroundColor: "white" }}>
      <Bar
        width={800}
        onClick={(e) => {
          console.log(e);
        }}
        height={800}
        margin={{ top: 60, right: 80, bottom: 60, left: 100 }}
        data={chartData?.data}
        indexBy={"topic_name"}
        keys={["total_questions", "redo_questions", "questions_over_30_sec"]}
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

export default TimeTakenByTopic;
