import { API } from "@/utils";

export const getAvgTimeTaken = async () => {
  return await API.get(`/api/avg-time-taken`);
};

export const getAvgTimeTakenByTopic = async () => {
  return await API.get(`/api/avg-time-taken/topic/1`);
};

export const getFailedProportions = async () => {
  return await API.get(`/api/failed-proportions`);
};
