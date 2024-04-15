import DataTable from "@/components/DataTable";
import { getMetadata } from "@/api/metadata";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { results: metadata } = await getMetadata(params.topicId);
  return { metadata };
}
const ChartMetaData = () => {
  const { metadata } = useLoaderData();

  return (
    <div>
      <DataTable
        headerText={"Metadata"}
        subHeaderText={"Metadata by question topic"}
        defaultSortKey={"actual_name"}
        defaultSortDirection={"asc"}
        headerColumns={[
          { key: "actual_name", label: "Name", rowSpan: 2, align: "left" },
          {
            key: "computed_name",
            label: "Computed Name",
            rowSpan: 2,
            align: "right",
          },
          {
            key: "datetime_completed",
            label: "Completed",
            rowSpan: 2,
            align: "right",
          },
          {
            key: "topic_name",
            label: "Topic Name",
            rowSpan: 2,
            align: "right",
          },
        ]}
        data={metadata}
        maxWidth={800}
      />
    </div>
  );
};

export default ChartMetaData;
