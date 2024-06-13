import { Calendar } from "@nivo/calendar";
import { useEffect, useState } from "react";

import { Sheet, Autocomplete } from "@mui/joy";
import { getCalendarByTag } from "@/api/calendar";
import { getTags } from "@/api/questions";
import { format } from "date-fns";

const CalendarByTopic = () => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [value, setValue] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then((data) => {
      const { results } = data;

      setTags(results.map((e) => e.tag));
    });
  }, []);

  const fetchCalendar = (value) => {
    getCalendarByTag(value).then((data) => {
      const { results, start_date, end_date } = data;

      // insert the current date into the results calendar for easy access
      const today = format(new Date(), "yyyy-MM-dd");

      setChartData([...results, { value: 999, day: today }]);
      setStartDate(start_date);
      setEndDate(end_date);
    });
  };

  console.log("tags", tags);
  console.log("newvalue", value);
  console.log("chart", chartData);

  return (
    <Sheet sx={{ backgroundColor: "white" }}>
      <Autocomplete
        value={value}
        placeholder="Combo box"
        onChange={(e, newValue) => {
          setValue(newValue);
          fetchCalendar(newValue);
        }}
        options={tags}
        sx={{ width: 300 }}
      />
      <Calendar
        monthSpacing={5}
        data={chartData}
        from={startDate}
        to={endDate}
        width={800}
        height={800}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </Sheet>
  );
};

export default CalendarByTopic;
