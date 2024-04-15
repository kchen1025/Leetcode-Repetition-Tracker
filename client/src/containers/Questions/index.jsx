import DataTable from "@/components/DataTable";
import { getQuestions } from "@/api/questions";
import { useLoaderData } from "react-router-dom";
import { TABLE_FORMAT } from "@/constants";

export async function loader() {
  const { results: questions } = await getQuestions();
  return { questions };
}

const Questions = () => {
  const { questions } = useLoaderData();

  return (
    <>
      <DataTable
        headerText={"Questions"}
        subHeaderText={"List of all leetcode questions"}
        defaultSortKey={"most_recent_datetime_completed"}
        defaultSortDirection={"asc"}
        headerColumns={[
          {
            key: "name",
            label: "Name",
            rowSpan: 2,
            align: "left",
          },
          {
            key: "most_recent_datetime_completed",
            label: "Most Recently Completed",
            rowSpan: 2,
            align: "right",
            format: TABLE_FORMAT.datetime,
          },
          {
            key: "most_recent_time_taken",
            label: "Most Recent Time Taken",
            rowSpan: 2,
            align: "right",
          },
          {
            key: "tag",
            label: "Tag",
            rowSpan: 2,
            align: "right",
          },
          {
            key: "times_solved",
            label: "Times Solved",
            rowSpan: 2,
            align: "right",
          },
          {
            key: "avg_time_taken",
            label: "Avg Time Taken",
            rowSpan: 2,
            align: "right",
          },
        ]}
        expandable={true}
        subHeaderColumns={[
          {
            key: "redo",
            label: "Redo",
            rowSpan: 2,
            align: "left",
            format: TABLE_FORMAT.boolean,
          },
          {
            key: "datetime_completed",
            label: "Completed",
            rowSpan: 2,
            align: "right",
            format: TABLE_FORMAT.datetime,
          },
          {
            key: "time_taken",
            label: "Time Taken",
            rowSpan: 2,
            align: "right",
          },
        ]}
        data={questions}
        maxWidth={1000}
      />
    </>
  );
};

export default Questions;
