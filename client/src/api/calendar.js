import { API } from "@/utils";

export const getCalendarByTag = async (tagName) => {
  return await API.get(`/api/calendar/tag`, { tagName });
};
