import { getCalendarByTagDB } from "../db/calendar.js";
import { format, isAfter, isBefore } from "date-fns";

export async function getCalendarByTag(req, res) {
  try {
    if (!req.body.tagName) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const results = await getCalendarByTagDB(req.user.id, req.body.tagName);

    let startDate = new Date(new Date(2199, 1, 1));
    let endDate = new Date(1900, 1, 1);
    const pivotByDate = results.reduce((acc, elem) => {
      const complete = format(new Date(elem.datetime_completed), "yyyy-MM-dd");

      if (complete in acc) {
        acc[complete] += 1;
      } else {
        acc[complete] = 1;
      }

      if (isBefore(complete, startDate)) {
        startDate = complete;
      }

      if (isAfter(complete, endDate)) {
        endDate = complete;
      }
      return acc;
    }, {});

    const formattedResults = Object.keys(pivotByDate).map((day) => {
      return {
        value: pivotByDate[day],
        day,
      };
    });

    res.status(200).send({
      results: formattedResults,
      start_date: startDate,
      end_date: endDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}
