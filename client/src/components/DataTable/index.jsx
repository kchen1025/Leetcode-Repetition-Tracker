import { Table, Box, Typography, Link, Sheet } from "@mui/joy";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { getComparator } from "@/utils/sortUtils";
import IconButton from "@mui/joy/IconButton";
import { TABLE_FORMAT } from "@/constants";

const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headerColumns,
  expandable,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {expandable ? <th style={{ width: 40 }} aria-label="empty" /> : null}
        {headerColumns.map((col) => {
          const active = orderBy === col.key;
          return (
            <th key={col.key}>
              <Link
                underline="none"
                color="neutral"
                textColor={active ? "primary.plainColor" : undefined}
                component="button"
                onClick={createSortHandler(col.key)}
                fontWeight="lg"
                startDecorator={<ArrowDownIcon opacity={active ? 1 : 0} />}
                sx={{
                  "& svg": {
                    transition: "0.2s",
                    transform:
                      active && order === "desc"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  },
                  "&:hover": { "& svg": { opacity: 1 } },
                }}
              >
                {col.label}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const Row = ({
  row,
  headerColumns,
  initialOpen,
  expandable,
  subHeaderColumns,
}) => {
  const [open, setOpen] = useState(initialOpen || false);

  const headerLength = expandable
    ? headerColumns.length + 1
    : headerColumns.length;

  // if format is provided, use it. Else just output the table column as a string
  const formatKey = (key, format = null) => {
    if (format === TABLE_FORMAT.datetime) {
      return new Date(row[key]).toLocaleString();
    }

    if (format === TABLE_FORMAT.boolean) {
      return !!row[key] ? "True" : "False";
    }

    return row[key];
  };

  return (
    <>
      <tr key={`row-${row.id}`}>
        {expandable ? (
          <td>
            <IconButton
              aria-label="expand row"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
          </td>
        ) : null}
        {headerColumns.map((col) => (
          <td key={col.key} align={col.align}>
            {formatKey(col.key, col.format)}
          </td>
        ))}
      </tr>

      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={headerLength}>
          {open && (
            <Sheet
              variant="soft"
              sx={{
                boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
              }}
            >
              <DataTable
                defaultSortKey={"datetime_completed"}
                defaultSortDirection={"asc"}
                headerColumns={subHeaderColumns}
                data={row?.history ? row.history : []}
              />
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
};

const DataTable = ({
  headerText,
  subHeaderText,
  headerColumns,
  data,
  defaultSortKey,
  defaultSortDirection,
  maxWidth = null,
  expandable = false,
  subHeaderColumns = [],
}) => {
  const [order, setOrder] = useState(defaultSortDirection || "desc");
  const [orderBy, setOrderBy] = useState(defaultSortKey || "id");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      margin={3}
    >
      {headerText ? (
        <Typography level="h2" mt={2}>
          {headerText}
        </Typography>
      ) : null}
      {subHeaderText ? (
        <Typography level="body-xs" mb={2}>
          {subHeaderText}
        </Typography>
      ) : null}

      <Table
        borderAxis="bothBetween"
        aria-label="basic table"
        stickyHeader
        hoverRow
        sx={maxWidth ? { maxWidth } : {}}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerColumns={headerColumns}
          expandable={expandable}
        />
        <tbody>
          {data.sort(getComparator(order, orderBy)).map((row, i) => (
            <Row
              key={`row-${i}`}
              row={row}
              headerColumns={headerColumns}
              expandable={expandable}
              subHeaderColumns={subHeaderColumns}
            />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
