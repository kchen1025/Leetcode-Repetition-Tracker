import { API } from "@/utils";

export const getQuestions = async () => {
  return await API.get(`/api/questions`);
};
